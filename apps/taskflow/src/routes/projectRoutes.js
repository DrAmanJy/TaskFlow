import { Router } from "express";
import * as controller from "../controllers/projectController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const router = Router();
router.use(requireAuth);

router.get("/search", controller.searchProjects);
// router.get("/:id/stats", controller.readProjectStats);

router.get("/", controller.readProjects);
router.get("/:id", controller.readProject);
router.post("/", controller.createProject);
router.put("/:id", controller.updateProject);
router.delete("/:id", controller.deleteProject);

router.post("/:id/members/invite", controller.inviteMember);
router.patch("/:id/members/remove", controller.removeTeamMember);
router.patch("/:id/members/leave", controller.leaveProject);

export default router;
