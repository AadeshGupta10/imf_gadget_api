const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { randomBytes } = require("crypto");
const { hashPassword, verifyPassword } = require("../services/hashing_and_verification");
const { setToken } = require("../services/token");

const handleRegisteration = async (req, res) => {
    const { email, password } = req.body;

    const duplicate = await prisma.users.findUnique({
        where: {
            email
        }
    });

    if (duplicate) {
        return res.status(200).json({ message: "Email Id already exists" });
    }

    const salt = randomBytes(16).toString();

    try {
        const registeration = await prisma.users.create({
            data: {
                email,
                password: hashPassword(password, salt),
                salt
            }
        })

        return res.status(201).json({
            message: "Account Created Successfully",
            token: setToken(email)
        });
    } catch {
        return res.status(500).json({ message: "Error in Creating Account. Try again later" });
    }
}

const handleLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const credentials = await prisma.users.findUnique({
            where: { email }
        })

        if (!credentials) {
            return res.status(400).json({ message: "Email Id not found" });
        }

        const { password: hash, salt } = credentials;

        if (verifyPassword(hash, password, salt)) {
            return res.status(200).json({
                message: "Login Successful",
                token: setToken(email)
            });
        }
        else {
            return res.status(400).json({
                message: "Invalid Credentials",
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error in Login. Try again later" });
    }
}

module.exports = {
    handleRegisteration,
    handleLogin
}