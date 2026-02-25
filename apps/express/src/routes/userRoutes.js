import e from "express";
import { getUserInfo } from "../controllers/userController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";
const router = e.Router();
router.get("/me", requireAuth, getUserInfo);
export default router;
