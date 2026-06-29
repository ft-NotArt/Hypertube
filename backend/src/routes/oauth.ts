import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import passport from "../config/passport";
import { IUser } from "../models/User";

const router = Router();

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

const redirectWithToken = (res: Response, user: IUser): void => {
  const token = jwt.sign(
    { userId: String(user._id) },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );
  res.redirect(`${FRONTEND_URL}/oauth/callback?token=${token}`);
};

// 42
router.get(
  "/42",
  passport.authenticate("42", { session: false, scope: ["public"] })
);

router.get(
  "/42/callback",
  passport.authenticate("42", { session: false, failureRedirect: `${FRONTEND_URL}/login?error=oauth` }),
  (req: Request, res: Response) => {
    redirectWithToken(res, req.user as IUser);
  }
);

//  Google
router.get(
  "/google",
  passport.authenticate("google", { session: false, scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: `${FRONTEND_URL}/login?error=oauth` }),
  (req: Request, res: Response) => {
    redirectWithToken(res, req.user as IUser);
  }
);

export default router;