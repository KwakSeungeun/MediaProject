exports.keystoneUri = 'http://15.164.100.240:5000'
exports.swiftUri = "http://15.164.100.240:8080";
exports.adminProjectId = 'AUTH_c0b8a4b703d94f0db5e9446472dd8432'
exports.adminId = '4d6f52e86f7e4aa8bb1584972c695b39'
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
}

exports.default_project_id = 'c0b8a4b703d94f0db5e9446472dd8432'
exports.user_project_id = '779abc54850d4eb4b3366138d4cd9265'
exports.user_role = 'f5cf72bf1cb04dcdb12aad066936a770'