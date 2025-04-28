const jwt = require("jsonwebtoken");

const setToken = (email) => {
    const payload = {
        email
    }

    return jwt.sign(payload, process.env.SECRET_CODE);
}

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.SECRET_CODE)
    } catch {
        return false;
    }
}

module.exports = {
    setToken,
    verifyToken
}