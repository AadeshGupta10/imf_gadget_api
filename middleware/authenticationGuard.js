const { verifyToken } = require("../services/token");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const authenticationGuard = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];

        const token_data = verifyToken(token);

        if (token_data) {

            const { email } = token_data

            const data = await prisma.users.findUnique({
                where: {
                    email
                }
            });

            if (data) {
                next()
            }
            else {
                return res.status(401).json({ message: 'Fake token' });
            }
        }
        else {
            return res.status(401).json({ message: 'Invalid token' });
        }
    } else {
        return res.status(401).json({ message: 'No token provided' });
    }
}

module.exports = authenticationGuard;