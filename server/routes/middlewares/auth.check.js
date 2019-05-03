const jwt = require('jsonwebtoken');
const axios = require('axios');

const authMiddleware = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.query.token;
    console.log("**MIDDLEWARE**\n\n", token);

    if(!token){
        res.status(401).json({
            message: 'Unauthorized',
            success: false
        })
    }

    new Promise((resolve, reject)=>{
        jwt.verify(token, req.app.get('jwt-secret'), (err, decoded)=>{
            if(err) reject(err);
            else resolve(decoded);
        });
    }).then(token => {
        req.token = token;
        next();
    }).catch(err=>{
        res.status(500).json({
            message: err,
            success: false
        });
    });
};

const keystoneAuth = (req, res, next) => {
}
module.exports = authMiddleware;