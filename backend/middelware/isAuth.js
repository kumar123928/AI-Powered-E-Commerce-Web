


import jwt, { decode } from 'jsonwebtoken';

const isAuth = (req, res, next) => {
    try {
        console.log("Cookies received:", req.cookies);

        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ message: "User does not have token" });
        }

        // FIX: Verify the token
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!verifyToken) {
            return res.status(401).json({ message: "User does not have a valid token" });
        }

        // FIX: Correct key (id or userId)
        req.userId = verifyToken.userId;  // ⬅️ IMPORTANT FIX

        next();

    } catch (error) {
        console.log("isAuth error", error);
        return res.status(500).json({ message: `isAuth error ${error.message}` });
    }
};

export default isAuth;
