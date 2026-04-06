import { Router } from "express";
import { loginUser, logoutUser, registerUser,getAllUsers,updateUserRole,getCurrentUser} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { checkRole } from "../middlewares/role.middleware.js";

const router =Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/all-users").get(verifyJWT, checkRole(["Admin"]), getAllUsers);
router.route("/update-role").patch(verifyJWT, checkRole(["Admin"]), updateUserRole);
router.route("/me").get(verifyJWT, getCurrentUser);

export default router