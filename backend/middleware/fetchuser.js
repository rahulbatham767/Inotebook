const JWT = require('jsonwebtoken');
const JWT_SECRET = 'Rahul';
const fetchuser = (req, res, next) => {

    // Get the user from the jwt token and add id to req object
    try {
        const token = req.header('auth-token');

        if (!token) {
            res.status(401).send({ error: "please authenticate using a valid token" }) 
        }

        const data = JWT.verify(token, JWT_SECRET);
 
        req.user = data.user;
        next();
    }
    catch (error) {
        res.status(401).send({ error: "please authenticate using a valid token" })
    }
}  
module.exports=fetchuser; 