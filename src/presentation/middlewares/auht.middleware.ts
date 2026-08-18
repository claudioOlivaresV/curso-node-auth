import { error } from "console";
import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config/jwt.adapter";
import { UserModel } from "../../data/mongooo/models/user.model";
import { UserEntity } from "../../domain/entities/user-entity";

export class AuthMiddleware {
  static validateJWR = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const authorization = req.header("Authorization");
    if (!authorization) {
      return res.status(401).json({ error: "No token provided" });
    }
    if (!authorization.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Ivalid Bearer token" });
    }

    const token = authorization.split(" ").at(1) || "";

    try {
      const payload = await JwtAdapter.validateToken<{ id: string }>(token);
      if (!payload) return res.status(401).json({ error: "Invalid Token" });
      const user = await UserModel.findById(payload.id);
      if (!user) return res.status(400).json({ error: "Invalid token -user" });

      req.body.user = UserEntity.fromObject(user);

      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Interal server Error" });
    }
  };
}
