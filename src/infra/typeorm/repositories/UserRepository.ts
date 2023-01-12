import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { hashSync } from "bcryptjs";
import { returnedUserProps } from "src/modules/users/DTOs/IReturnedUserPropsDTO";
import { FindUsersParams, CreateUserParams, UpdateUserParams } from "src/shared/utils/types";
import { Repository } from "typeorm";
import User from "../entities/User";
import { IUserRepository } from "../../../base/IUserRepository";

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async findUsers(_where: FindUsersParams): Promise<User[]> {
        return await this.userRepository.find({
            select: returnedUserProps,
            where: _where
        });
    }

    async findOne(param: FindUsersParams): Promise<User> {
        return await this.userRepository.findOne({
            where: param
        });
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find({
            select: returnedUserProps
        });
    }

    async createUser(data: CreateUserParams): Promise<User> {
        const { anSenha } = data;

        const hash = hashSync(anSenha, 8);

        const user = this.userRepository.create({ anSenha: hash, ...data });
        await this.userRepository.save(user);

        return this.userRepository.findOne({
            select: returnedUserProps,
            where: { id: user.id }
        });
    }

    async updateUser(id: string, data: UpdateUserParams) {
        await this.userRepository.update({ id }, { ...data });

        return this.userRepository.findOne({
            select: returnedUserProps,
            where: { id }
        });
    }

    async inactivateUser(id: string): Promise<void> {
        await this.userRepository.update({ id }, { boInativo: 1 });
    }

    async deleteUser(id: string): Promise<void> {
        await this.userRepository.delete({ id });
    }

}