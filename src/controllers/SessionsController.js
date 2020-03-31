import jwt from "jsonwebtoken";

import Cliente from "../models/Cliente";
import authConfig from "../config/auth";

class SessionController {
    async store(req, res) {

        const { email, password } = req.body;

        const user = await Cliente.findOne({
            where: { email }
        });
        
        
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }
        if (!(await user.checkPassword(password))) {
            return res.status(401).json({ error: "Password does not mach" });
        }

        const { id, name } = user;

        return res.json({
            user: {
                id,
                name,
                email
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn
            })
        });
    }
}

export default new SessionController();