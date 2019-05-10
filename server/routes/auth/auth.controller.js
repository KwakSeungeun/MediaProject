const User = require('../../models').User;
const Directory = require('../../models').Directory;
const jwt = require('jsonwebtoken');
const axios = require('axios');
const cloud = require('../../config/cloud.config');

exports.checkValidation = (req, res) => {
    const email = req.body.email;
    User.count({
        where : {email : email}
    }).then(result => {
        res.json({
            count : result
        })
    }).catch(err => {
        res.status(500).json({
            message : err.message,
            success: false
        });
    });
}

exports.register = (req, res)=>{
    const { email, pw, name } = req.body;
    User.create({
        email: email,
        pw : pw,
        name : name
    }).then((user)=>{
        Directory.create({
            pid : 0,
            level : 0,
            name : 'root',
            user_id : user._id
        }).then(()=>{
            res.json({
                message : "success sign up!",
                success : true
            });
        }).catch(err=>{
            res.status(500).json({
                message : "fail create directory\n"+err.message,
                success : false
            });
        });
    }).catch(err=>{
        res.status(500).json({
            message: err.message,
            success : false
        });
    });
}

// keystone token 받아오는 코드!!!
// axios.post(`${cloud.uri}/v3/auth/tokens`, cloud.admin_info)
// .then(result =>{
//     let token = result.headers['x-subject-token'];
//     let new_user = {
//         "user": {
//             "default_project_id": `${cloud.default_project_id}`,
//             "domain_id": "default",
//             "enabled": true,
//             "name": name,
//             "password": pw,
//             "email": email,
//             "options": {
//                 "ignore_password_expiry": true
//             }
//         }
//     }

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
                        user_name : user.name,
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