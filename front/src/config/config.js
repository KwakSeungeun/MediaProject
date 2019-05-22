exports.serverUri = 'http://127.0.0.1:8080';
exports.keystonUri = "http://15.164.100.240:5000";
exports.swiftUri = "http://15.164.100.240:8080";
exports.adminProjectId = 'AUTH_c0b8a4b703d94f0db5e9446472dd8432'
exports.adminSig = '9bb1466e914974d1183dfd5012e043c603078714'
exports.adminExp = '1561112155'

exports.admin_info = { 
    "auth": {
        "identity": {
        "methods": ["password"],
        "password": {
            "user": {
            "name": "admin",
            "domain": { "name": "Default" },
            "password": "adminpass"
            }
        }
        },
        "scope": {
        "project": {
            "name": "admin",
            "domain": { "name": "Default" }
        }
    }
  }
};