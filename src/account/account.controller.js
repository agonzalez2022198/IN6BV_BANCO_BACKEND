import Account from './account.model.js';

export const createAccount = async (req, res) => {
    try {
        const { accountNumber, user, typeAccount, favoriteAccount, money } = req.body;

        const newAccount = new Account({
            accountNumber,
            user,
            typeAccount,
            favoriteAccount,
            money
        });

        await newAccount.save();
        res.status(201).json(newAccount);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const userAccount = async (req, res) => {
    try {
        const userId = req.user.id;
        const accounts = await Account.find({ userId }).populate('user', 'name'); 

        if (!accounts || accounts.length === 0) {
            return res.status(404).json({ msg: 'No se encontraron cuentas de banco para este usuario' });
        }

        res.status(200).json(accounts);
    } catch (error) {
        console.error('Error retrieving bank accounts:', error);
        res.status(500).send('Error retrieving bank accounts');
    }
};
