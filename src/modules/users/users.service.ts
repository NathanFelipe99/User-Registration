import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import User from 'src/infra/typeorm/entities/User';
import { CreateUserParams, FindUsersParams, UpdateUserParams } from 'src/shared/utils/types';
import { IUserRepository, IUserRepositorySymbol } from 'src/base/IUserRepository';
@Injectable()
export class UsersService {

    constructor(
        @Inject(IUserRepositorySymbol)
        private readonly _userRepository: IUserRepository
    ) { }

    async findUsers(_where: FindUsersParams): Promise<User[]> {
        return await this._userRepository.findUsers(_where);
    }

    async findOne(param: FindUsersParams): Promise<User> {
        return await this._userRepository.findOne(param);
    }

    async findAll(): Promise<User[]> {
        return await this._userRepository.findAll();
    }

    async createUser(data: CreateUserParams): Promise<User> {
        const { anEmail, nmUsuario } = data;

        const userExists = await this._userRepository.findOne([{ nmUsuario }, { anEmail }]);
        if (userExists) throw new BadRequestException("Já existe um usuário com este Email ou Nome de Usuário!");

        return this._userRepository.createUser(data);
    }

    async updateUser(id: string, data: UpdateUserParams) {
        const { anEmail } = data;

        await this.updateVerifyExistence(id, anEmail);

        return await this._userRepository.updateUser(id, data);
    }

    async inactivateUser(id: string): Promise<void> {
        await this._userRepository.inactivateUser(id);
    }

    async deleteUser(id: string): Promise<void> {
        await this._userRepository.deleteUser(id);
    }

    private async updateVerifyExistence(id: string, anEmail: string) {
        const userExists = await this.verifyUserExistence(id);

        await this.verifyUserNameExistence(userExists.nmUsuario);

        await this.verifyUserEmailExistence(anEmail, userExists.id);
    }

    private async verifyUserExistence(id: string): Promise<User> {
        const userExists = await this._userRepository.findOne({ id });
        if (!userExists) throw new BadRequestException("Usuário não encontrado!");
        return userExists;
    }

    private async verifyUserNameExistence(nmUsuario: string): Promise<boolean> {
        const nmUsuarioExists = await this._userRepository.findOne({ nmUsuario });
        if (nmUsuarioExists && (nmUsuarioExists.nmUsuario !== nmUsuario))
            throw new BadRequestException("Já existe outro usuário com este Nome de Usuário!");
        return false;
    }

    private async verifyUserEmailExistence(email: string, id: string): Promise<boolean> {
        const anEmailExists = await this._userRepository.findOne({ anEmail: email });
        if (anEmailExists && (anEmailExists.id !== id))
            throw new BadRequestException("Já existe outro usuário com este Email!");

        return false;
    }

}
