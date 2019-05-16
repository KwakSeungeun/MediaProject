const User = require('../../models').User;
const Directory = require('../../models').Directory;
const jwt = require('jsonwebtoken');
const axios = require('axios');
const cloud = require('../../config/cloud.config');

exports.getKeystoneAuth = async(req, res)=>{
    await axios.post(`${cloud.uri}/v3/auth/tokens`, cloud.admin_info)
    .then(result =>{
        let token = result.headers['x-subject-token'];
        res.json({
            message : "Success",
            keystoneToken : token
        });
    }).catch(err=>{
        res.status(500).json({
            message : "Fail get keystone admin auth"+err.message,
        });
    })
}

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
            //admin 토큰 발행
            axios.post(`${cloud.uri}/v3/auth/tokens`, cloud.admin_info)
            .then(result =>{

                let admin_token = result.headers['x-subject-token'];
                let new_user = {
                    "user": {
                        "default_project_id": `${cloud.user_project_id}`,
                        "domain_id": "default",
                        "enabled": true,
                        "name": email, // 웹의 id를 openstack에서 name으로 
                        "password": pw,
                        "email": email,
                        "options": {
                            "ignore_password_expiry": true
                        }
                    }
                }
                // 유저 생성
                axios.post(`${cloud.uri}/v3/users`, new_user, {
                    headers : {
                        'Content-Type': 'application/json',
                        'X-Auth-Token' : `${admin_token}`
                    }
                }).then(response =>{

                    let user_code = response.data.user.id;
                    //role 할당
                    axios.put(`${cloud.uri}/v3/projects/${cloud.user_project_id}/users/${user_code}/roles/${cloud.user_role}`,null, {
                        headers : {
                            'Content-Type': 'application/json',
                            'X-Auth-Token' : `${admin_token}`
                        }
                    }).then(()=>{ //role 할당까지 성공, 회원가입 성공
                        res.json({
                            message:"success to assign role to user, success register user",
                            success: true
                        })
                    }).catch(err=>{ //role 할당 실패
                        console.log("ERR : ", err);
                        res.status(500).json({
                            message : 'assign role error, fail register user',
                            success: false
                        })
                    })
                }).catch(err=>{ //유저 생성 실패
                    console.log("ERR : ", err);
                    res.status(500).json({
                        message : 'create user in openstack error, fail register user',
                        success : false
                    })
                })
            }).catch(err=>{ //토큰 발급 실패
                console.log('Unable get tokens : ', err);
                res.status(500).json({
                    message: 'Unable get tokens',
                    success : false
                    });
                })
        }).catch(err=>{ //sequelize directory 생성 에러
            res.status(500).json({
                message: err.message,
                success : false
            });
        });
    }).catch(err=>{ //sequelize user 생성 에러
        res.status(500).json({
            message: err.message,
            success : false
        })
    })
}

exports.login  = (req, res, next) => {
    
    const { email, pw } = req.body
    const secret = req.app.get('jwt-secret');

    User.findOne({
        where : { email : email },
        include: { model : Directory } //left join
    }).then(user=>{
        // check user
        // console.log("user : ", user.Directories);
        if(!user || user.pw!=pw){
            res.status(500).json({
                message : "invalid id or pw",
                success : false
            });
        } else{ //유저 정보 확인됐을 때
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
                axios.post(`${cloud.uri}/v3/auth/tokens`, {
                    "auth": {
                                "identity": {
                                "methods": ["password"],
                                "password": {
                                    "user": {
                                    "name": email,
                                    "domain": { "name": "Default" },
                                    "password": pw
                                    }
                                }
                                },
                                "scope": {
                                "project": {
                                    "name": "user_proj",
                                    "domain": { "name": "Default" }
                                    }   
                                }
                            }
                }).then(result => {
                    // 유저 정보와 토큰 넘김
                    // let ostoken = result.headers['x-subject-token'];
                    console.log('end keystone')
                    console.log(result.headers['x-subject-token']);
                    res.json({
                        message : "success login",
                        token : token,
                        os_token : result.headers['x-subject-token'],
                        user_name : user.name,
                        dir : user.Directories,
                        success : true
                    })
                }).catch(err=>{
                    console.log(err);
                    res.status(500).json({
                        message : "fail getting openstack token",
                        success : false
                    });
                })
            }).catch(err=>{
                console.log(err);
                res.status(500).json({
                    message : "fail create token",
                    success : false
                });
            });
        }
    }).catch(err=>{
        res.status(500).json({
            message : err.message
        })
    })
    console.log('server login end')
}

exports.check = (req, res, next) => {
    res.json({
        message: 'vaild token',
        info: req.token,
        success: true
    });
}