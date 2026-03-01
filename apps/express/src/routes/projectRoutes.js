import e from "express";
import * as controller from "../controllers/projectController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const router = e.Router();

router.get("/projects", requireAuth, controller.readProjects);
router.get("/project/:id", requireAuth, controller.readProject);
router.post("/project", requireAuth, controller.createProject);
router.put("/project/:id", requireAuth, controller.updateProject);
router.delete("/project/:id", requireAuth, controller.deleteProject);

export default router;
