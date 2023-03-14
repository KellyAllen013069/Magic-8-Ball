var jwt = require('jsonwebtoken');

function generateToken(user) {
    if (!user) return null;

    var u = {
        userId: user.userID,
        email: user.email,
    }

    return jwt.sign(u.process.env.JWT_SECRET, {
        expiresIn: 90d
    });
}

function getCleanUser(user) {
    if(!user) return null;
}