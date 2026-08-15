import { regularExps } from "../../../config/regualr-exp";

export class LoginUserDto {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
  static create(object: { [key: string]: any }): [string?, LoginUserDto?] {
    const { email, password } = object;
    if (!email) return ["El objeto debe tener un correo"];
    if (!regularExps.email.test(email)) return ["El correo no es válido"];
    if (!password) return ["El objeto debe tener una contraseña"];
    return [undefined, new LoginUserDto(email, password)];
  }
}
