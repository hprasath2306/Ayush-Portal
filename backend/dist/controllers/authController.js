import prisma from "../prisma/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";
export const register = async (req, res) => {
    try {
        const { fullName, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { fullName, email, password: hashedPassword, role },
        });
        res.json({ message: "User registered successfully", user });
    }
    catch (error) {
        res.status(500).json({ message: "Error registering user" });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, {
            expiresIn: "7d",
        });
        res.json({ token, user });
    }
    catch (error) {
        res.status(500).json({ message: "Error logging in" });
    }
};
