import bcryptjs from 'bcryptjs';
import User from '../user/user.model.js';
import { generarJWT } from '../helpers/generate-jwt.js';

export const login = async (req, res) =>{
    console.log("entro a login");
    const {correo, password} = req.body;

    console.log(correo, password, 'data recibida en backend')

    try {
        const user = await User.findOne({correo: correo.toLowerCase()});

        if(user && (await bcryptjs.compare(password, user.password))){
            const token = await generarJWT(user.id, user.correo)

            res.status(200).json({
                msg: 'Login Ok!!',
                userDetails: {
                    username: user.name,
                    token: token
                }
            })
        }

        if(!user){
            return res.status(400).send(`Wrong credentials, ${correo} doesn't exists in database`);
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        if(!validPassword){
            return res.status(400).send("wrong password");
        }
    } catch (error) {
        res.status(500).send('Comunicate with admin')
    }
}