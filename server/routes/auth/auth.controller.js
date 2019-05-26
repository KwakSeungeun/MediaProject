const User = require('../../models').User;
const Directory = require('../../models').Directory;
const jwt = require('jsonwebtoken');
const axios = require('axios');
const cloud = require('../../config/cloud.config');

exports.getKeystoneAuth = async(req, res)=>{
    await axios.post(`${cloud.keystoneUri}/v3/auth/tokens`, cloud.admin_info)
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
            axios.post(`${cloud.keystoneUri}/v3/auth/tokens`, cloud.admin_info)
            .then(adminToken =>{
                axios.put(`${cloud.swiftUri}/v1/${cloud.adminProjectId}/${email}`,null,{
                    headers:{
                        'X-Auth-Token' : `${adminToken.headers['x-subject-token']}`,
                        'X-Container-Meta-Temp-URL-Key' : `key`,
                        //container 접근 secret key 설정
                        'X-Container-Read' : `r:*`,
                        //container에 public access로 만듦(PUT, HEAD).
                        // 'X-Container-Write' : `*:${cloud.amdinId}`
                        // //container에 admin이 Write access 권한 가짐(PUT, POST, DELETE).
                    }
                }).then((x) => {
                    res.json({
                        message: 'success sign up'
                    });
                }).catch(err=>{
                    res.status(500).json({
                        err : err.message
                    });
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
                axios.post(`${cloud.keystoneUri}/v3/auth/tokens`, cloud.admin_info)
                .then(result =>{
                    res.json({
                        message : "success login",
                        token : token,
                        os_token : result.headers['x-subject-token'],
                        user_name : user.name,
                        dir : user.Directories,
                        success : true
                    })
                }).catch(err=>{
                    res.status(500).json({
                        message : "Fail get keystone admin auth"+err.message,
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
}

exports.check = (req, res, next) => {
    res.json({
        message: 'vaild token',
        info: req.token,
        success: true
    });
}