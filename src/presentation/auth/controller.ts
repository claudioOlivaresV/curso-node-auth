import { Request, Response } from "express";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { AuthService } from "../../services/auth.service";
import { CustomError } from "../../domain/erros/custom-error";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { log } from "node:console";

export class AuthController {
  constructor(public readonly authService: AuthService) {}

  private handleError(res: Response, error: unknown) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    res.status(500).json({
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }

  loginUser = async (req: Request, res: Response) => {
    const [error, loginDto] = LoginUserDto.create(req.body);
    // Lógica de inicio de sesión
    if (error) {
      return res.status(400).json({ error });
    }

    try {
      const result = await this.authService.loginUser(loginDto!);

      return res.json(result);
    } catch (error) {
      console.log(error);
      this.handleError(res, error);
    }
  };

  registerUser = async (req: Request, res: Response) => {
    const [error, registerDto] = RegisterUserDto.create(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    try {
      const result = await this.authService.registerUser(registerDto!);

      return res.json(result);
    } catch (error) {
      this.handleError(res, error);
    }
  };

  async validateEmail(req: Request, res: Response) {
    // Lógica de validación de correo electrónico
    res.json({ message: "Validación de correo electrónico exitosa" });
  }
}
