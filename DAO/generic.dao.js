class GenericDAO {

    constructor(tabla) {
        this.tabla = tabla;
    }

    async getAll() {
        const [results] = await global.connection.promise().query("SELECT * FROM ??", [this.tabla])
        return results;
    }

    async getId(id) {
        const [results] = await global.connection.promise().query("SELECT * FROM ?? WHERE id = ?", [this.tabla, id])
        return results;
    }


    async validateToken(req, res, next) {
    
        if (!req.headers.authorization) return 0
    
        const token = req.headers.authorization.split(" ")[1];
    
        if (!token) return 0
    
        const jwt = require('jsonwebtoken');
        try {
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            return decoded
        } catch (error) {
            return 0
        }
    
    }
}

module.exports = GenericDAO