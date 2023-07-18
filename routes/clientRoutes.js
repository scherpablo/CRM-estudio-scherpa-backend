import express from 'express';
import { addClient, getClients, getClient, updateClient, deleteClient } from '../controllers/clientController.js'; 
import checkAuth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route("/")
    .post(checkAuth, addClient)
    .get(checkAuth, getClients)

router.route("/:id")
    .get(checkAuth, getClient)
    .put(checkAuth, updateClient)
    .delete(checkAuth, deleteClient)

export default router;