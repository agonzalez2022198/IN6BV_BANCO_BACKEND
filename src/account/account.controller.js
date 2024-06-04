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

export const getAccount = async (req, res) =>{
    try {
        const account = await Account.find();
        res.status(200).json(account);
      } catch (error) {
        console.error('Error al obtener las cuentas:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
      }
}

export const getAccountById = async (req, res) =>{
    const accountId = req.params.id;

  try {
    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(404).json({ mensaje: 'Cuenta no encontrada.' });
    }
    res.status(200).json(account);
  } catch (error) {
    console.error('Error al obtener la cuenta:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}

export const updateAccount = async (req, res) =>{
    const accountId = req.params.id;
  const { accountNumber, user, typeAccount, favoriteAccount } = req.body;

  try {
    let account = await Account.findById(accountId);

    if (!account){
        return res.status(404).json({ 
            mensaje: 'Cuenta no encontrada.' 
        });
    }

    account.accountNumber = accountNumber;
    account.user = user;
    account.typeAccount = typeAccount;
    account.favoriteAccount = favoriteAccount;
    await account.save();

    res.status(200).json({ 
        mensaje: 'Cuenta actualizada correctamente.' 
    });
  } catch (error) {
    console.error('Error al actualizar la cuenta:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}

export const deleteAccount = async (req, res) =>{
    const accountId = req.params.id;

  try {
    const cuentaEliminada = await Account.findByIdAndDelete(accountId);

    if (!cuentaEliminada) {
        return res.status(404).json({ 
            mensaje: 'Cuenta no encontrada.' 
        });
    }

    res.status(200).json({ 
        mensaje: 'Cuenta eliminada correctamente.'
    });
  } catch (error) {
    console.error('Error al eliminar la cuenta:', error);
    res.status(500).json({ 
        mensaje: 'Error interno del servidor.' 
    });
  }
}