import { userController } from './user.controller';
import { E_Role, I_User } from './user.types';

export const userResolvers = {
  Query: {
    getAllUsers: async (): Promise<I_User[]> => {
      return await userController.getAllUsers();
    },
    getUser: async (
      _: any,
      { email, password }: { email: string; password: string }
    ): Promise<I_User | null> => {
      return await userController.getUser(email, password);
    },
    getInfoUser: async (
      _: any,
      __: any,
      context: { req: { userId: string } }
    ): Promise<I_User | null> => {
      const { userId } = context.req;
      return await userController.getInfoUser(userId);
    },
  },
  Mutation: {
    createUser: async (
      _: any,
      {
        fullName,
        email,
        password,
        role,
      }: {
        fullName?: string;
        email: string;
        password: string;
        role: E_Role;
      }
    ): Promise<{ message: string; data: I_User | null }> => {
      return await userController.createUser({
        fullName,
        email,
        password,
        role,
      });
    },
    updateUser: async (
      _: any,
      {
        id,
        fullName,
        email,
        password,
        role,
      }: {
        id: string;
        fullName?: string;
        email?: string;
        password?: string;
        role?: E_Role;
      }
    ): Promise<I_User | null> => {
      return await userController.updateUser(id, {
        fullName,
        email,
        password,
        role,
      });
    },
    deleteUser: async (
      _: any,
      { id }: { id: string }
    ): Promise<I_User | null> => {
      return await userController.deleteUser(id);
    },
  },
};
