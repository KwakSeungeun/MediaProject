exports.serverUri = 'http://127.0.0.1:8080';
exports.keystonUri = "http://15.164.100.240:5000";
exports.swiftUri = "http://15.164.100.240:8080";
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