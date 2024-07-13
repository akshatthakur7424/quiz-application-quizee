import crypto from "crypto";

function generateRandomId() {
    const charset = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';

    for (let i = 0; i < 10; i++) {
        const randomIndex = crypto.randomInt(0, charset.length);
        randomId += charset[randomIndex];
    }

    return randomId;
}

export default generateRandomId;

