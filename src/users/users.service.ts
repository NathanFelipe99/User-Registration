import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/typeorm/entities/User';
import { CreateUserParams, FindUsersParams, UpdateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async findUsers(_where: FindUsersParams) {
        return await this.userRepository.find({
            where: _where
        });
    }

    async findAll() {
        return await this.userRepository.find();
    }

    async createUser(data: CreateUserParams) {
        const user = this.userRepository.create({ ...data });
        await this.userRepository.save(user);
        return user;
    }

    async updateUser(id: string, data: UpdateUserParams) {
        return await this.userRepository.update({ id }, { ...data });
    }

    async inactivateUser(id: string) {
        await this.userRepository.update({ id }, { boInativo: 1 });
    }

    async deleteUser(id: string) {
        await this.userRepository.delete({ id });
    }

}
