import express from "express";
import { addExpedient, getExpedients, getExpedient, updateExpedient, deleteExpedient } from "../controllers/expedientController.js";
import checkAuth from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/")
    .post(checkAuth, addExpedient)
    .get(checkAuth, getExpedients)

router.route("/:id")
    .get(checkAuth, getExpedient)
    .put(checkAuth, updateExpedient)
    .delete(checkAuth, deleteExpedient)

export default router;