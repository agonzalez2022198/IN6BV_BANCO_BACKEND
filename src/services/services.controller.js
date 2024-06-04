import Services from './services.model.js';

export const createService = async (req, res) => {
  try {
    const { name, description, userId } = req.body;
    const service = new Services({ name, description, userId });
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los servicios
export const getServices = async (req, res) => {
  try {
    const services = await Services.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un servicio por ID
export const getServiceById = async (req, res) => {
  try {
    const service = await Services.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un servicio por ID
export const updateService = async (req, res) => {
  try {
    const { name, description, userId } = req.body;
    const service = await Services.findByIdAndUpdate(
      req.params.id,
      { name, description, userId },
      { new: true, runValidators: true }
    );
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un servicio por ID
export const deleteService = async (req, res) => {
  try {
    const service = await Services.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
