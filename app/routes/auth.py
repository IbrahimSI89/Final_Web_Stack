# app/routes/auth.py
#This file handles authentication-related routes, 
# such as user registration, login, fetching the current user's details, and logout.

from flask import Blueprint, request, jsonify, make_response
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.models.user import User
from app.extensions import db


#Interactions:

# This file interacts with the User model to manage user data and authentication.
# It uses JWT for authentication, relying on the Flask-JWT-Extended extension.



auth_blueprint = Blueprint('auth', __name__)

@auth_blueprint.route('/register', methods=['POST'])
#Registers a new user by creating a User object and saving it to the database.
def register():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    #Checks if the email already exists and returns an error if it does.
    if User.query.filter_by(email=email).first():
        return jsonify({"message": "Email already exists"}), 400

    new_user = User(
        name,
        email,
        password,
    )

    db.session.add(new_user)
    db.session.commit()

    #On successful registration, a JWT token is created and returned.
    return jsonify({
        "message": "User created successfully",
        "token": create_access_token(identity=new_user.id),
    }), 201


@auth_blueprint.route('/login', methods=['POST'])
#Authenticates a user by checking the provided email and password against stored data.
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    print(f"Login attempt: {email}")
    user = User.query.filter_by(email=email).first()

    if not user :
        print("User not found")
        return jsonify({"message": "User not found"}), 404
    
    if not user.check_password(password):
        print("Incorrect password")
        return jsonify({"message": "Incorrect password"}), 401

    access_token = create_access_token(
        identity=user.id,
        # expires_delta=False,
        )
    print(f"Login successful for user: {user.name}")

    # Set the JWT in a secure cookie
    #If authentication is successful, a JWT token is created and returned.
    response = make_response(jsonify({
            "message": "Login successful",
            "token": access_token,
            }))

    return response


#defined to retrieve the current user's details
@auth_blueprint.route('/me', methods=['GET'])

#It uses the jwt_required decorator from Flask-JWT-Extended 
#   to verify that the request includes a valid JWT token in the headers
@jwt_required(locations=["headers"])
def get_current_user():     
    #extract the user ID from the JWT token using the get_jwt_identity function.
    user_id = get_jwt_identity()

    #It queries the database to find the user with the matching ID.
    user = User.query.get(user_id)

    #If no user is found, it returns a 404 error.
    if not user:
        return jsonify(), 404
  
    #If a user is found
    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "created_at": user.created_at,
        "chats" : [chat.id for chat in user.chats],
        "groups" : [group.id for group in user.groups],
        "created_groups" : [group.id for group in user.created_groups]
    }), 200

@auth_blueprint.route('/logout', methods=['POST'])
@jwt_required(locations=["headers"])
def logout():
    
    #returns a success message indicating that the logout was successful
    response = make_response(jsonify({"message": "Logout successful"}))
    return response
