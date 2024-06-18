import Busqueda from '../search/busqueda.model';

export const createBusqueda = async (req, res) => {
    try {
        const newBusqueda = new Busqueda(req.body);
        await newBusqueda.save();
        res.status(201).json(newBusqueda);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getBusquedas = async (req, res) => {
    try {
        const busquedas = await Busqueda.find();
        res.status(200).json(busquedas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getBusquedaById = async (req, res) => {
    try {
        const busqueda = await Busqueda.findById(req.params.id);
        if (!busqueda) return res.status(404).json({ message: 'Busqueda not found' });
        res.status(200).json(busqueda);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteBusqueda = async (req, res) => {
    try {
        const deletedBusqueda = await Busqueda.findByIdAndDelete(req.params.id);
        if (!deletedBusqueda) return res.status(404).json({ message: 'Busqueda not found' });
        res.status(200).json({ message: 'Busqueda deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
