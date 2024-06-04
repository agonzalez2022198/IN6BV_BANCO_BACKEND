import typeAccount from './typeAccount.model.js';

export const createTypeAccount = async (req, res) =>{
    try {
        const {name, description} = req.body;

        const newTypeAccount = new typeAccount({
            name,
            description
        });

        await newTypeAccount.save();
        res.status(201).json(newTypeAccount);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}