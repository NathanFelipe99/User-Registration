import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/typeorm/entities/User';
import { CreateUserParams, FindUsersParams, UpdateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import { wReturnedUserProps } from './DTOs/IReturnedUserPropsDTO';
@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async findUsers(_where: FindUsersParams): Promise<User[]> {
        return await this.userRepository.find({
            select: wReturnedUserProps,
            where: _where
        });
    }

    async findOne(param: FindUsersParams): Promise<User> {
        return await this.userRepository.findOne({
            select: wReturnedUserProps,
            where: param
        });
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find({
            select: wReturnedUserProps
        });
    }

    async createUser(data: CreateUserParams): Promise<User> {
        const user = this.userRepository.create({ ...data });
        await this.userRepository.save(user);

        return this.userRepository.findOne({
            select: wReturnedUserProps,
            where: { id: user.id }
        });
    }

    async updateUser(id: string, data: UpdateUserParams) {
        const { nmUsuario, anEmail } = data;
        if (anEmail) {
            const anEmailExists = await this.userRepository.findOneBy({ anEmail });
            if (anEmailExists && anEmailExists.id !== id) throw new BadRequestException("Este email já está cadastrado!");
        }

        if (nmUsuario) {
            const nmUsuarioExists = await this.userRepository.findOneBy({ nmUsuario });
            if (nmUsuarioExists && nmUsuarioExists.id !== id) throw new BadRequestException("Este nome de usuário já está cadastrado");
        }

        await this.userRepository.update({ id }, { ...data });

        return this.userRepository.findOne({
            select: wReturnedUserProps,
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
