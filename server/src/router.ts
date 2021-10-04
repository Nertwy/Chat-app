import { Router } from "express";
import authController from "./authController";
import { check } from "express-validator";
import { authMiddleware } from "./middleware/Auth";
import {roleMiddleWare} from "./middleware/roleMiddleWare";
import socketController from './controller/socketController'
const router = Router();

router.post(
  "/registration",
  [
    check("username", "UserName Cant be empty").notEmpty(),
    check("password", "Password must be from 4 to 10 symbols").isLength({
      min: 4,
      max: 10,
    }),
  ],
  authController.registration
);
router.post("/login", authController.login);
router.get("/users", roleMiddleWare(["ADMIN"]), authController.getUsers);
router.get('/rooms',socketController.socketConnect)
export default router;
