import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/typeorm/entities/User';
import { CreateUserParams, UpdateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async findUsers() {
        return await this.userRepository.find({
            where: {
            boInativo: 0
        }});
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
