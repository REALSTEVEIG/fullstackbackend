import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                status: "fail",
                message: "You are not authorized!"
            })
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                status: "fail",
                message: "You are not authorized!"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        if (!decoded) {
            return res.status(401).json({
                status: "fail",
                message: "You are not authorized!"
            })
        }

        next ()
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            error
        })
    }
}