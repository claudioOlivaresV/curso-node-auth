import bcrypt from "bcryptjs";

export const bcryptAdapter = {
  hash: async (password: string) => {
    const salt = await bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  },
  compare: async (password: string, hashed: string) => {
    return bcrypt.compareSync(password, hashed);
  },
};
