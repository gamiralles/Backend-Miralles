const authMiddleware = (role) => {
    return (req, res, next) => {
        if (req.user && req.user.role === role) {
            next();
        } else {
            res.status(401).json({ error: "No Autorizado" });
        }
    };
};

export default authMiddleware;