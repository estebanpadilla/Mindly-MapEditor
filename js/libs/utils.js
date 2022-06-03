export const getRandonBetween = (min, max) => {
    return Math.floor((Math.random() * (max - min + 1)) + min);
};

/**
 * Finds the distance from one point to another point.
 * @param {Point} from - The point to calculate magnitud from.
 * * @param {Point} to - The point to calculate magnitud to.
 * @return {number} value - Returns the distance value.
 */
export const distanceBetweenTwoPoints = (from, to) => {
    let a = from.x - to.x;
    let o = from.y - to.y;
    return Math.sqrt((a * a) + (o * o));
};


/** 
 * Converts randians to degrees.
 * @param {number} radians - The radians angle to convert to degrees.
 * @return {number} angle - Return the angle in degrees.
 */
export const toDegrees = (radians) => {
    return radians * 180 / Math.PI;
}


/** 
 * Converts randians to degrees.
 * @param {number} radians - The radians angle to convert to degrees.
 * @return {number} angle - Return the angle in degrees.
 */
export const toDegreesWhole = (radians) => {
    let a = toDegrees(radians);
    if (a < 0) {
        a = 360 + a;
    }
    return a;
}

/** 
 * Converts degrees to radians.
 * @param {number} degrees - The degrees angle to convert to radians.
 * @return {number} angle - Return the angle in radians.
 */
export const toRadians = (degrees) => {
    return degrees * Math.PI / 180;
}


/**
* Find the angle of a segment from (x1, y1) -> (x2, y2).
* 
* @method angleBetween
* @param {number} x1 - The x coordinate of the first value.
* @param {number} y1 - The y coordinate of the first value.
* @param {number} x2 - The x coordinate of the second value.
* @param {number} y2 - The y coordinate of the second value.
* @return {number} The angle, in radians.
*/
export const angleBetween = (x1, y1, x2, y2) => {
    return Math.atan2(y2 - y1, x2 - x1);
}

/**
* Find the angle of a segment from (point1.x, point1.y) -> (point2.x, point2.y).
* 
* @method angleBetweenPoints
* @param {Point} point1 - The first point.
* @param {Point} point2 - The second point.
* @return {number} The angle between the two points, in radians.
*/
export const angleBetweenPoints = (point1, point2) => {
    return Math.atan2(point2.y - point1.y, point2.x - point1.x);
}

/**
* Returns true if the number given is odd.
*
* @method isOdd
* @param {integer} n - The number to check.
* @return {boolean} True if the given number is odd. False if the given number is even.
*/
export const isOdd = (n) => {
    // Does not work with extremely large values
    return !!(n & 1);
}


/**
* Generate a random bool result based on the chance value.
*
* Returns true or false based on the chance value (default 50%). For example if you wanted a player to have a 30% chance
* of getting a bonus, call chanceRoll(30) - true means the chance passed, false means it failed.
*
* @method chanceRoll
* @param {number} chance - The chance of receiving the value. A number between 0 and 100 (effectively 0% to 100%).
* @return {boolean} True if the roll passed, or false otherwise.
*/
export const chanceRoll = (chance) => {
    if (chance === undefined) { chance = 50; }
    return chance > 0 && (Math.random() * 100 <= chance);
}


export const randomBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}