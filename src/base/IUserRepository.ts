import { CreateUserParams, FindUsersParams, UpdateUserParams } from "src/shared/utils/types";
import User from "../infra/typeorm/entities/User";

export interface IUserRepository {
    findUsers(_where: FindUsersParams): Promise<User[]>;
    findOne(param: FindUsersParams): Promise<User>;
    findAll(): Promise<User[]>;
    createUser(data: CreateUserParams): Promise<User>;
    updateUser(id: string, data: UpdateUserParams): Promise<User>;
    inactivateUser(id: string): Promise<void>;
    deleteUser(id: string): Promise<void>;
}

export const IUserRepositorySymbol = Symbol("IUserRepository");