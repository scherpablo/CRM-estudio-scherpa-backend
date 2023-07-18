import express from "express";
import { register, profile, confirm, authenticate, passwordChange, checkToken, newPassword, updateProfile, updateAdminPassword } from "../controllers/adminController.js";
import checkAuth from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", register)
router.get("/confirm/:token", confirm)
router.post("/login", authenticate)
router.post("/password-change", passwordChange)
router.route("/password-change/:token")
    .get(checkToken)
    .post(newPassword)

router.get("/profile", checkAuth, profile)
router.put("/profile/:id", checkAuth, updateProfile)
router.put("/update-password", checkAuth, updateAdminPassword)


export default router;