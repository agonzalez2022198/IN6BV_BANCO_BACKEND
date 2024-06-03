import Account from './account.model.js';

export const createAccount = async (req, res) => {
    try {
        const { user, typeAccount, favoriteAccount } = req.body;

        const newAccount = new Account({
            user,
            typeAccount,
            favoriteAccount
        });

        await newAccount.save();
        res.status(201).json(newAccount);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};