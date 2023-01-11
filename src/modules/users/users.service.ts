import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/infra/typeorm/entities/User';
import { CreateUserParams, FindUsersParams, UpdateUserParams } from 'src/shared/utils/types';
import { Repository } from 'typeorm';
import { returnedUserProps } from './DTOs/IReturnedUserPropsDTO';
import { hashSync } from "bcryptjs";
@Injectable()
export class UsersService {

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
        const { anEmail, nmUsuario, anSenha } = data;

        await this.createVerifyExistence(nmUsuario, anEmail);

        const hash = hashSync(anSenha, 8);

        const user = this.userRepository.create({ anSenha: hash, ...data });
        await this.userRepository.save(user);

        return this.userRepository.findOne({
            select: returnedUserProps,
            where: { id: user.id }
        });
    }

    async updateUser(id: string, data: UpdateUserParams) {
        const { nmUsuario, anEmail } = data;
        
        await this.updateVerifyExistence(id, nmUsuario, anEmail);

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

    private async createVerifyExistence(nmUsuario: string, anEmail: string) {
        const userExists = await this.userRepository.findOne({
            where: [
                { nmUsuario },
                { anEmail }
            ]
        });

        if (userExists) throw new BadRequestException("Já existe um usuário com este Email ou CPF");
    }

    private async updateVerifyExistence(id: string, nmUsuario: string, anEmail: string) {
        const userExists = await this.userRepository.findOneBy({ id });
        if (!userExists) throw new BadRequestException("Usuário não encontrado!");

        const nmUsuarioExists = await this.userRepository.findOneBy({ nmUsuario });
        if (nmUsuarioExists && (nmUsuarioExists.nmUsuario !== userExists.nmUsuario))
            throw new BadRequestException("Já existe outro usuário com este Nome de Usuário!");
        
        const anEmailExists = await this.userRepository.findOneBy({ anEmail });
        if (anEmailExists && (anEmailExists.id !== userExists.id))
            throw new BadRequestException("Já existe outro usuário com este Email!");
    }

}
