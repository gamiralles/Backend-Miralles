import passport from "passport";
import { generateToken } from "../utils/jwtFunction.js";
import mailService from "../services/mail.service.js";

class AuthController {
  async login(req, res) {
    console.log(req.user);

    const payload = {
      id: req.user.id,
      email: req.user.email,
      role: req.user.role,
    };

    const token = generateToken(payload);

    res.cookie("token", token, { 
      maxAge: 1000 * 60 * 60,
      httpOnly: true });

      res.status(200).json({
        message: "Logged in successfully",
      });
  }

  async loginError(req, res) {
    res.status(401).json({
      message: "Email o contraseña incorrecta",
    });
  }

 async register(req, res, next) {
    passport.authenticate(
      "register",
      { session: false },
      async (err, user, info) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(400).json({ message: info.message });
        }
        
        try {
          await mailService.sendMail(user.email, "Bienvenido a nuestro sitio", user.firstName);
        } catch (error) {
          console.log(error);
        }

        const payload = {
          email: user.email,
          role: user.role,
        };
        const token = generateToken(payload);
        res.cookie("token", token, {
          maxAge: 1000 * 60 * 60,
          httpOnly: true,
        });
        return res.status(201).json({
          message: "Registered successfully",
          user,
        });
      }
    )(req, res, next);
  }

  async current(req, res) {
    console.log(req.user);
    res.status(200).json({ message: "Current user", user: req.user });
  }

  async logout(req, res) {
    req.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  }
}

export default new AuthController();
