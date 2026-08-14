import e from "express";
import { CustomError } from "../erros/custom-error";

export class UserEntity {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly emailValidated: boolean,
    public readonly password: string,
    public readonly name: string,
    public readonly role: string[],
    public readonly img?: string,
  ) {}

  static fromObject(object: { [key: string]: any }): UserEntity {
    const { id, _id, email, emailValidated, password, name, role, img } =
      object;
    if (!_id && !id) {
      throw CustomError.badRequest("El objeto debe tener un id o _id");
    }
    if (!name) throw CustomError.badRequest("El objeto debe tener un nombre");
    if (!email) throw CustomError.badRequest("El objeto debe tener un correo");
    if (emailValidated === undefined) {
      throw CustomError.badRequest("El objeto debe tener un emailValidated");
    }
    if (!password)
      throw CustomError.badRequest("El objeto debe tener una contraseña");
    if (!role) throw CustomError.badRequest("El objeto debe tener un rol");
    return new UserEntity(
      _id || id,
      email,
      emailValidated,
      password,
      name,
      role,
      img,
    );
  }
}
