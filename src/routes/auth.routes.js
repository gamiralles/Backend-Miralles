import { Router } from "express";
import authController from "../controller/authController.js";
import passport from "passport";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/login",
  passport.authenticate("login", {
    session: false,
    failureRedirect: "/api/auth/login-error",
  }),
  authController.login
);

router.get("/login-error", authController.loginError);

router.post("/register", authController.register);

router.get(
  "/current",
  passport.authenticate("current", { session: false }),
  authMiddleware("admin"),
  authController.current
);

router.get("/logout", authController.logout);

export default router;
