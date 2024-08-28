# app/routes/auth.py

#Manages routes related to user information, such as fetching user details by ID.


from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required
from app.models.user import User

user_blueprint = Blueprint('user', __name__)


@user_blueprint.route('/<int:id>', methods=['GET'])
@jwt_required(locations=["headers"])

# Fetches the details of a user by their ID.
# Requires a valid JWT token to access.
def get_current_user(id):     
    user = User.query.get(id)

    if not user:
        return jsonify({"message": "User not found"}), 404
  
    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "created_at": user.created_at
    }), 200
