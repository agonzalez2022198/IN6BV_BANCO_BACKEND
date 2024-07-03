import Deposito from '../deposito/deposito.model.js';
import Account from '../account/account.model.js';

export const createDeposito = async (req, res) => {
    const { account, accountRecibe, monto } = req.body;

    try {
        if (monto > 3000) {
            return res.status(400).json({ error: 'La cantidad a transferir no puede ser mayor a 3000.' });
        }

        const accounts = await Account.findOne(account);
        if(!accounts){
            return res.status(400).json({ error: 'Esa cuenta no existe' });
        }
        const accountRecibs = await Account.findOne(accountRecibe);

        if (!accountRecibs) {
            return res.status(404).json({ error: 'Cuenta no encontrada.' });
        }



        if (account.money < monto) {
            return res.status(400).json({ error: 'Saldo insuficiente para realizar la transferencia.' });
        }

        account.money -= monto;
        accountRecibe.money += monto;

        await account.save();
        await accountRecibe.save();

        const deposito = new Deposito({
            account: user.account,
            monto,
            revertido: false,
            idUser,
            idUserReceive
        });

        const savedDeposito = await deposito.save();

        // Enviar respuesta con el depósito creado
        res.status(200).json(savedDeposito);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getDepositos = async (req, res) => {
    try {
        const depositos = await Deposito.find();
        res.status(200).json(depositos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getDepositoById = async (req, res) => {
    try {
        const deposito = await Deposito.findById(req.params.id);
        if (!deposito) return res.status(404).json({ message: 'Deposito not found' });
        res.status(200).json(deposito);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateDeposito = async (req, res) => {
    try {
        const updatedDeposito = await Deposito.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDeposito) return res.status(404).json({ message: 'Deposito not found' });
        res.status(200).json(updatedDeposito);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteDeposito = async (req, res) => {
    try {
        const deletedDeposito = await Deposito.findByIdAndDelete(req.params.id);
        if (!deletedDeposito) return res.status(404).json({ message: 'Deposito not found' });
        res.status(200).json({ message: 'Deposito deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};