import jwt from 'jsonwebtoken';

export const validarJWT = (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['authorization'];

    if (!token) {
        return res.status(401).send('A token is required for authentication');
    }

    try {
        // Remover "Bearer " del inicio del token si existe
        token = token.replace(/^Bearer\s+/, '');
        
        // Verificar y decodificar el token
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        
        // Almacenar la información del usuario en req.user
        req.user = decoded;
    } catch (e) {
        console.error('Invalid Token:', e);
        return res.status(401).send('Invalid Token');
    }

    return next();
};