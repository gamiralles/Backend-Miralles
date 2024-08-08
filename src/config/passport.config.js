import passport from "passport";
import jwt from "passport-jwt";
import localStrategy from "passport-local";
import { userModel } from "../models/user.model.js";
import { JWT_SECRET } from "../utils/jwtFunction.js";
import { comparePassword } from "../utils/hashFunction.js";

const LocalStrategy = localStrategy.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

function passportFunction() {
  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (email, password, done) => {
        try {
          const user = await userModel.findOne({ email });

          if (!user) {
            return done(null, false, { message: "No existe ese usuario" });
          }

          const passwordMatch = await comparePassword(password, user.password);

          if (!passwordMatch) {
            return done(null, false, { message: "Contraseña incorrecta" });
          }

          return done(null, user);
        } catch (error) {
          console.log(error);
          return done(error);
        }
      }
    )
  );

  passport.use(
    "register",
    new LocalStrategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          const { firstName, lastName, age } = req.body;

          if (!firstName || !lastName || !age || !email || !password)
            return done(null, false, {
              message: "Todos los datos son requeridos",
            });

          const userExisting = await userModel.findOne({ email });

          if (userExisting) {
            return done(null, false, { message: "El usuario ya existe" });
          }

          const user = await userModel.create({
            firstName,
            lastName,
            email,
            age,
            password,
          });

          return done(null, user);
        } catch (error) {
          console.log(error);
          return done("error: ${error.message}");
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userModel.findById(id);

      return done(null, user);
    } catch (error) {
      return done("error: ${error.message}");
    }
  });

  passport.use(
    "current",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookiesExtractor]),
        secretOrKey: JWT_SECRET,
      },
      async (payload, done) => {
        try {
          done(null, payload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
}

function cookiesExtractor(req) {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies.token;
  }
  console.log("cookieExtractor", token);

  return token;
}

export { passportFunction };
