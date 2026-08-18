import jwt from "jsonwebtoken";

const JWT_SEED = process.env.JWT_SEED;

export class JwtAdapter {
  static async generateToken(payload: any, duration: any = "2h") {
    return new Promise((resolve) => {
      jwt.sign(payload, JWT_SEED!, { expiresIn: duration }, (error, token) => {
        if (error) return resolve(null);

        resolve(token);
      });
    });
  }

  static validateToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, JWT_SEED!, (err, decoded) => {
        if (err) {
          return resolve(null);
        }

        resolve(decoded as T);
      });
    });
  }
}
