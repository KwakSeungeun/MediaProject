exports.uri = 'http://13.125.245.16:5000'

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