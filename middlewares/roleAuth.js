// be/middlewares/roleAuth.js
const roleAuthorization = (allowedRoles) => (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: "Forbidden: Access is not allowed." });
    }
    next();
};

module.exports = roleAuthorization;
