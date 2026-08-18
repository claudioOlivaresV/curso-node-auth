import { bcryptAdapter } from "../config/bcrypt.adapter";
import { JwtAdapter } from "../config/jwt.adapter";
import { UserModel } from "../data/mongooo/models/user.model";
import { LoginUserDto } from "../domain/dtos/auth/login-user.dto";
import { RegisterUserDto } from "../domain/dtos/auth/register-user.dto";
import { UserEntity } from "../domain/entities/user-entity";
import { CustomError } from "../domain/erros/custom-error";

export class AuthService {
  constructor() {}
  public loginUser = async (loginUserDto: LoginUserDto) => {
    //hacer el findOne

    const existUser = await UserModel.findOne({ email: loginUserDto.email });
    if (!existUser) {
      throw CustomError.badRequest("El correo no está registrado");
    }

    const isMatch = await bcryptAdapter.compare(
      loginUserDto.password,
      existUser.password,
    );
    if (!isMatch) {
      throw CustomError.badRequest("Contraseña incorrecta");
    }
    const { password, ...rest } = UserEntity.fromObject(existUser);

    const token = await JwtAdapter.generateToken({ id: existUser.id });
    if (!token) {
      throw CustomError.internalServerError("Error al generar el token");
    }
    return { user: rest, token };
  };

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
      const token = await JwtAdapter.generateToken({ id: user.id });
      if (!token) {
        throw CustomError.internalServerError("Error al generar el token");
      }
      // Email confirmacion

      const { password, ...rest } = UserEntity.fromObject(user);
      return { user: rest, token };
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  };

  public validateEmail = (email: string) => {
    // Lógica de validación de correo electrónico
  };
}
