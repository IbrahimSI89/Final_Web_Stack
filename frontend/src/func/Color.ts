// Purpose:

// Provides utility functions for generating a unique color from a string, 
//  typically used for generating avatar colors based on user names.



// How It Works:

// The functions in this file are used to generate consistent, 
// unique colors for user avatars based on their names.


/**
 * Hash a string to a numeric value.
 * @param str - The input string to be hashed.
 * @returns A numeric hash value.
 */

//Converts a string into a numeric hash.
function hashStringToInt(str: string): number {
let hash = 0;
    for (let i = 0; i < str.length; i++) {
    // Returns the Unicode value of the character at the specified location.
hash = str.charCodeAt(i) + ((hash << 5) - hash);
}
return hash;
}

/**
 * Convert a numeric hash to a hexadecimal color code.
 * @param hash - The numeric hash value.
 * @returns A hexadecimal color code.
 */

// Converts a numeric hash into a hexadecimal color code.
function intToHexColor(hash: number): string {
// Take the last 6 digits of the hash as a hexadecimal value
const color = ((hash & 0xFFFFFF) >>> 0).toString(16).padStart(6, '0');
return `${color}`;
}

/**
 * Get a unique color from a string.
 * @param str - The input string to generate the color from.
 * @returns A unique hexadecimal color code.
 */

// Combines the previous two functions to generate a color code from a string.
function getColorFromString(str: string): string {
if (!str) return '000000';
const hash = hashStringToInt(str);
return intToHexColor(hash);
}

export default getColorFromString;
