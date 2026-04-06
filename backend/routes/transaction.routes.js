import { Router } from "express";
import { 
    createTransaction, 
    getAllTransactions, 
    getTransactionSummary, 
    deleteTransaction 
} from "../controllers/transaction.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { checkRole } from "../middlewares/role.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/")
    .get(getAllTransactions)
    .post(checkRole(["Admin", "Analyst"]), createTransaction);

router.route("/summary").get(getTransactionSummary);

router.route("/:id")
    .delete(checkRole(["Admin"]), deleteTransaction);

export default router;