import { Router } from "express";
import * as controller from "../controllers/authController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const router = Router();

// Public Routes
router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/refresh-token", controller.refreshAccessToken);
// router.post("/forgot-password", controller.forgotPassword);
// router.post("/reset-password/:token", controller.resetPassword);

// Protected Routes (Require Login)
// router.get("/me", requireAuth, controller.getMe);
// router.post("/logout", requireAuth, controller.logout);
// router.patch("/update-password", requireAuth, controller.updatePassword);
// router.delete("/delete-me", requireAuth, controller.deleteMe);

export default router;
