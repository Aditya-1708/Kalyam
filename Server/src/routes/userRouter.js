import express from "express";
import {
    createUser,
    deleteUser,
    getUserById,
    getUsers,
    loginUser,
    logoutUser,
    verifyAuth,
} from "../controllers/userController.js";
import authenticate from "../middlewares/authenticate.js";
import authorize from "../middlewares/authorize.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/logout", authenticate, logoutUser);
router.get("/verify", authenticate, verifyAuth);
router.post("/", authenticate, authorize("ADMIN"), createUser);
router.get("/", authenticate, authorize("ADMIN"), getUsers);
router.get("/:id", authenticate, authorize("ADMIN"), getUserById);
router.delete("/:id", authenticate, authorize("ADMIN"), deleteUser);

export default router;