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
        console.log("userId:", userId); 

        const account = await Account.find({ user: userId }).populate('user', 'name');
        if (!account) {
            return res.status(404).json({ msg: 'No se encontró cuenta de banco para este usuario' });
        }
        res.status(200).json(account);
    } catch (error) {
        console.error('Error al recuperar la cuenta bancaria:', error);
        res.status(500).send('Error al recuperar la cuenta bancaria');
    }
};

export const getAccount = async (req, res) =>{
    try {
        const accounts = await Account.find({}).populate('user', 'name'); 
    
        res.json(accounts);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}



