import { Router } from "express";
import { body } from "express-validator";
import { register, login, logout, me } from "../controllers/authController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("username")
      .isLength({ min: 3, max: 20 })
      .withMessage("Username must be 3-20 characters")
      .matches(/^[a-zA-Z0-9_]+$/)
      .withMessage("Username can only contain letters, numbers and underscores"),
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[0-9]/)
      .withMessage("Password must contain at least one number"),
  ],
  register
);

router.post(
  "/login",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  login
);

router.post("/logout", protect, logout);

router.get("/me", protect, me);

export default router;
