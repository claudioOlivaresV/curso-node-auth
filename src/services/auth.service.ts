import { bcryptAdapter } from "../config/bcrypt.adapter";
import { UserModel } from "../data/mongooo/models/user.model";
import { RegisterUserDto } from "../domain/dtos/auth/register-user.dto";
import { UserEntity } from "../domain/entities/user-entity";
import { CustomError } from "../domain/erros/custom-error";

export class AuthService {
  constructor() {}
  public async loginUser(email: string, password: string) {
    // Lógica de inicio de sesión
  }

  public registerUser = async (registerUserDto: RegisterUserDto) => {
    // Lógica de registro

    const existUser = await UserModel.findOne({ email: registerUserDto.email });
    if (existUser) {
      throw CustomError.badRequest("El correo ya está registrado");
    }
    try {
      const user = new UserModel(registerUserDto);

      // Encriptar Contraseña
      user.password = await bcryptAdapter.hash(user.password);

      await user.save();
      // generar token

      // Email confirmacion

      const { password, ...rest } = UserEntity.fromObject(user);
      return { user: rest, token: "ABc" };
    } catch (error) {
      console.log(error);
      throw CustomError.internalServerError(`${error}`);
    }
  };

  public validateEmail = (email: string) => {
    // Lógica de validación de correo electrónico
  };
}
