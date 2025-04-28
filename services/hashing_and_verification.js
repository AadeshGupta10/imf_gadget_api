const { createHmac } = require("crypto");

const hashPassword = (password, salt) => {
    const hash = createHmac("sha256", salt).update(password).digest("hex");
    return hash;
}

const verifyPassword = (hash, password, salt) => {
    return hash === hashPassword(password, salt);
}

module.exports = {
    hashPassword,
    verifyPassword
}