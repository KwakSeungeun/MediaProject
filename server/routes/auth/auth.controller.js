const User = require('../../models/user');
const jwt = require('jsonwebtoken');

exports.register = (req, res, next) => {
    const { email, pw } = req.body;

    let msg = '';
    // 조회 후에 없는 값이면 생성하고, 있는 값이면 그 값을 가져오는 operation
    User.findOrCreate({
        where: { email : email },
        defaults:{
            email: email,
            pw : pw
        }
    }).spread((user, created)=>{
        if(created) {
            msg = 'CREATE user';
            res.json({
                message : msg,
                success : true
            });
        }
        else {
            msg = email + ' is alrady exist';
            res.status(500).json({
                message : msg,
                success : false
            });
        }
    }).catch(err =>{
        res.status(500).json({
            message : err.message,
            success : false
        });
    });
}

exports.login  = (req, res, next) => {
    const { email, pw } = req.body
    const secret = req.app.get('jwt-secret');
    
    User.findOne({
        where : { email : email }
    }).then(user=>{
        // check user
        if(!user){
            res.status(500).json({
                message : "not found user",
                success : false
            });
        } else {
            // check password
            if(user.pw != pw){
                res.status(500).json({
                    message : "incorrect pw",
                    success : false
                });
            } else {
                new Promise((resolve, reject) =>{
                    jwt.sign({
                        _id : user._id,
                        email : user.email,
                    },
                    secret,
                    {
                        expiresIn : '7d',
                    }, (err, token) => {
                        if(err) reject(err);
                        else resolve(token);
                    });
                }).then(token=>{
                    res.json({
                        message : "success login",
                        token : token,
                        success : true
                    });
                }).catch(err=>{
                    console.log(err);
                    res.status(500).json({
                        message : "fail create token",
                        success : false
                    });
                });
            }
        }
    }).catch(err=>{
        res.status(500).json({
            message : err.message
        })
    });
}

exports.check = (req, res, next) => {
    res.json({
        message: 'vaild token',
        info: req.token,
        success: true
    });
}