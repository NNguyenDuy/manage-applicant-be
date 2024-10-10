import jwt from 'jsonwebtoken';
import { userController } from './../user';
import { IUserDocument } from '../user/user.model';

export const authResolvers = {
  Mutation: {
    login: async (
      _: any,
      { email, password }: { email: string; password: string }
    ): Promise<{ token: string } | null> => {
      const user: IUserDocument | null = await userController.getUser(email, password); // Đảm bảo kiểu trả về là IUserDocument
      if (!user) return null;

      const token = jwt.sign(
        { userId: user._id },
        process.env.SECRET_KEY || '',
        {
          expiresIn: '3d',
        }
      );
      return { token };
    },
  },
};
