const jwt = require('jsonwebtoken');

//Verificar Token
let verifyToken = (req, res, next) => {

    let token = req.get('Authorization');

    jwt.verify(token, process.env.SEED, (err, decodedMessage) => {
        if (err) {
            return res.status(400).json({
                status: 'Error',
                err: 'Invalid Token'
            });
        }

        req.user = decodedMessage.user; //setea la info del usuario autenticado
    })

    next(); //Sino se especifica, no continua la ejecucion
}

let verifyRole = (req, res, next) => {

    if (req.user.role != 'ADMIN_ROLE') {
        return res.status(400).json({
            status: 'Error',
            err: 'Insufficient Permits'
        });
    }

    next();
}

module.exports = {
    verifyToken,
    verifyRole
}