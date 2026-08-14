import { regularExps } from "../../../config/regualr-exp";

export class RegisterUserDto {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly name: string,
  ) {}
  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { email, password, name } = object;
    if (!email) return ["El objeto debe tener un correo"];
    if (!regularExps.email.test(email)) return ["El correo no es válido"];
    if (!password) return ["El objeto debe tener una contraseña"];
    if (!name) return ["El objeto debe tener un nombre"];
    return [undefined, new RegisterUserDto(email, password, name)];
  }
}
