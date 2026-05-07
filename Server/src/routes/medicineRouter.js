import express from "express";
import {
    createMedicine,
    deleteMedicine,
    getMedicineById,
    getMedicines,
    updateMedicine,
} from "../controllers/medicineController.js";
import authenticate from "../middlewares/authenticate.js";
import authorize from "../middlewares/authorize.js";

const router = express.Router();

router.get("/", getMedicines);
router.get("/:id", getMedicineById);
router.post("/", authenticate, authorize("ADMIN"), createMedicine);
router.put("/:id", authenticate, authorize("ADMIN"), updateMedicine);
router.delete("/:id", authenticate, authorize("ADMIN"), deleteMedicine);

export default router;
