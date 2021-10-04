import { Request, Response } from "express";
const rooms = new Map();
class socketController {
  socketConnect(req: Request, res: Response) {
    res.status(200).json(rooms);
  }
}

export default new socketController();
