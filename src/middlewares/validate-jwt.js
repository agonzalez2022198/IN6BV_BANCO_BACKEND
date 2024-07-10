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
        
        // Almacenar el ID del usuario en req.user
        req.user = { id: decoded.uid }; // Almacena el ID del usuario desde el token decodificado

        // Puedes almacenar más información del usuario si es necesario, dependiendo de lo que contenga el token
        
    } catch (e) {
        console.error('Invalid Token:', e);
        return res.status(401).send('Invalid Token');
    }

    return next();
};