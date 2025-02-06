const jwt = require("jsonwebtoken");
const secret = "Zarva$123@$";

function setUser(user) {
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
        },
        secret, 
        {
            expiresIn: '1h',
        }
    );
}

module.exports = {
    setUser,
}