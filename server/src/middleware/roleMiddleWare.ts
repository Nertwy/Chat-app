import Jwt, { JwtPayload } from "jsonwebtoken";
import { secret } from "../config";
export function roleMiddleWare(roles: string | Jwt.JwtPayload) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(403).json({ message: "Пользователь не авторизован" });
      }
      //   const { roles: userRoles };
      const userRoles: any = Jwt.verify(token, secret.secret);
      let hasRole = false;
      userRoles.role.forEach((role) => {
        if (roles.includes(role)) {
          hasRole = true;
        }
      });
      if (!hasRole) {
        return res.status(403).json({ message: "У вас нет доступа" });
      }
      next();
    } catch (e) {
      console.log(e);
      return res.status(403).json({ message: "Пользователь не авторизован" });
    }
  };
}
