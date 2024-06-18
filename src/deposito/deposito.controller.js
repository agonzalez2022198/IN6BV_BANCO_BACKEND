import Deposito from '../deposito/deposito.model';

export const createDeposito = async (req, res) => {
    try {
        const newDeposito = new Deposito(req.body);
        await newDeposito.save();
        res.status(201).json(newDeposito);
    } catch (error) {
        res.status(500).json({ message: error.message });
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
