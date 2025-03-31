import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";
export const authMiddleware = (roles) => {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            req.user = { id: decoded.id, role: decoded.role };
            if (!roles.includes(req.user.role)) {
                res.status(403).json({ message: "Forbidden" });
                return;
            }
            next();
        }
        catch (error) {
            res.status(401).json({ message: "Invalid token" });
        }
    };
};
