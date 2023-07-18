import Expedient from "../models/Expedient.js";

const addExpedient = async (req, res) => {
    const expedient = new Expedient(req.body);
    expedient.admin = req.admin._id;
    try {
        const savedExpedient = await expedient.save();
        return res.json(savedExpedient);
    } catch (error) {
        return res.status(500).json({ error: 'Hubo un error al guardar el expediente' });
    }
}

const getExpedients = async (req, res) => {
    const expedients = await Expedient.find({ admin: req.admin._id });
    return res.json(expedients);
}

const getExpedient = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    const expedient = await Expedient.findById(id);

    if (!expedient) {
        return res.status(404).json({ error: 'Expediente no encontrado' });
    }

    if (expedient.admin._id.toString() !== req.admin._id.toString()) {
        return res.json({ error: 'No tienes permiso para ver este expediente' });
    }

    return res.json(expedient);
}

const updateExpedient = async (req, res) => {
    const { id } = req.params;
    const expedient = await Expedient.findById(id);

    if (!expedient) {
        return res.status(404).json({ error: 'Expediente no encontrado' });
    }

    if (expedient.admin._id.toString() !== req.admin._id.toString()) {
        return res.json({ error: 'No tienes permiso para editar este expediente' });
    }

    expedient.number = req.body.number || expedient.number;
    expedient.type = req.body.type || expedient.type;
    expedient.law = req.body.law || expedient.law;
    expedient.state = req.body.state || expedient.state;
    expedient.startDate = req.body.startDate || expedient.startDate;
    expedient.clientRelation = req.body.clientRelation || expedient.clientRelation;
    try {
        const updatedExpedient = await expedient.save();
        return res.json(updatedExpedient);
    } catch (error) {
        return res.status(500).json({ error: 'Hubo un error al actualizar el cliente' });
    }
}

const deleteExpedient = async (req, res) => {
    const { id } = req.params;
    const expedient = await Expedient.findById(id);

    if (!expedient) {
        return res.status(404).json({ error: 'Expediente no encontrado' });
    }

    if (expedient.admin._id.toString() !== req.admin._id.toString()) {
        return res.json({ error: 'No tienes permiso para eliminar este expediente' });
    }

    try {
        await expedient.deleteOne();
        return res.json({ message: 'Expediente eliminado correctamente' });
    } catch (error) {
        return res.status(500).json({ error: 'Hubo un error al eliminar el Expediente' });
    }
}

export {
    addExpedient,
    getExpedient,
    getExpedients,
    updateExpedient,
    deleteExpedient,
}