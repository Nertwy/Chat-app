import { Request, Response } from "express";
import User from "./models/User";
import Role from "./models/Role";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import { validationResult } from "express-validator";
import { secret } from "./config";

class authController {
  async registration(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Error in registration", errors });
      }
      let { username, password } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res.status(400).json({ message: "Username already exists" });
      }
      let hashPassword = bcrypt.hashSync(password, 6);
      const userRole: any = await Role.findOne({ value: "USER" });
      const user = new User({
        username,
        password: hashPassword,
        roles: [userRole.value],
      });
      user.save();
      return res.json({ message: "USER REGISTERED SUCCESSFULY" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Registration Error" });
    }
  }
  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const user: any = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ message: `User with name ${username} doesnt found` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: `Password isn't match` });
      }
      const token = generatedAccessToken(user._id, user.roles);
      return res.json({ token });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Login Error" });
    }
  }
  async getUsers(req: Request, res: Response) {
    try {
      const users: any = await User.find();
      res.json(users);
    } catch (e) {
      console.log(e);
    }
  }
}

export default module.exports = new authController();

const generatedAccessToken = (id, role) => {
  const payload = {
    id,
    role,
  };
  return JWT.sign(payload, secret.secret);
};
