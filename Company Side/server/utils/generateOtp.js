const generateRandomCode = () => {
    const min = 1000; // Minimum 4-digit code (inclusive)
    const max = 9999; // Maximum 4-digit code (inclusive)
    const result = Math.floor(Math.random() * (max - min + 1)) + min
    return result;
}
var otpNumber = generateRandomCode();

export {otpNumber,generateRandomCode};