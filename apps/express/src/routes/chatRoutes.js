import { Router } from "express";
import { requireAuth } from "../middlewares/authMiddleware.js";
import * as controller from "../controllers/messageController.js";

const router = Router();

router.use(requireAuth);

router.get("/:taskId", controller.syncMessages);
router.post("/:taskId", controller.sendMessage);
router.patch("/:id", controller.editMessage);
router.delete("/:id", controller.deleteMessage);

export default router;
