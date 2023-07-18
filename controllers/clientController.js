import Client from "../models/Client.js";

const addClient = async (req, res) => {
    const client = new Client(req.body);
    client.admin = req.admin._id;
    try {
        const savedClient = await client.save();
        return res.json(savedClient);
    } catch (error) {
        return res.status(500).json({ error: 'Hubo un error al guardar el cliente' });
    }
}

const getClients = async (req, res) => {
    const clients = await Client.find({ admin: req.admin._id });
    return res.json(clients);
}

const getClient = async (req, res) => {
    const { id } = req.params;
    const client = await Client.findById(id);

    if(!client) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    if (client.admin._id.toString() !== req.admin._id.toString()) {
        return res.json({ error: 'No tienes permiso para ver este cliente' });
    }

    return res.json(client);
}

const updateClient = async (req, res) => {
    const { id } = req.params;
    const client = await Client.findById(id);

    if (!client) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    if (client.admin._id.toString() !== req.admin._id.toString()) {
        return res.json({ error: 'No tienes permiso para editar este cliente' });
    }

    client.name = req.body.name || client.name;
    client.lastName = req.body.lastName || client.lastName;
    client.cuit = req.body.cuit || client.cuit;
    client.birthdate = req.body.birthdate || client.birthdate;
    client.email = req.body.email || client.email;
    client.phone = req.body.phone || client.phone;
    client.address = req.body.address || client.address;
    client.location = req.body.location || client.location;
    client.postalCode = req.body.postalCode || client.postalCode;
    client.anses = req.body.anses || client.anses;
    client.afip = req.body.afip || client.afip;
    try {
        const updatedClient = await client.save();
        return res.json(updatedClient);    
    } catch (error) {
        return res.status(500).json({ error: 'Hubo un error al actualizar el cliente' });
    }
}

const deleteClient = async (req, res) => {
    const { id } = req.params;
    const client = await Client.findById(id);

    if (!client) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    if (client.admin._id.toString() !== req.admin._id.toString()) {
        return res.json({ error: 'No tienes permiso para eliminar este cliente' });
    }

    try {
        await client.deleteOne();
        return res.json({ message: 'Cliente eliminado correctamente' });
    } catch (error) {
        return res.status(500).json({ error: 'Hubo un error al eliminar el cliente' });
    }
}

export {
    addClient,
    getClients,
    getClient,
    updateClient,
    deleteClient
}