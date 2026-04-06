import { Router } from "express";
import { getAuditLogs } from "../controllers/audit.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { checkRole } from "../middlewares/role.middleware.js";

const router = Router();

router.use(verifyJWT);
router.use(checkRole(["Admin"]));

router.route("/").get(getAuditLogs);

export default router;