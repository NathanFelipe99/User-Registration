import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put } from '@nestjs/common';
import { ICreateUserDTO } from './DTOs/ICreateUserDTO';
import { IUpdateUserDTO } from './DTOs/IUpdateUserDTO';
import { UsersService } from './users.service';
import { hashSync } from "bcryptjs";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}
    
    @Get()
    async getUsers() {
        const users = this.usersService.findUsers();
        return users;
    }
    
    @Post()
    async createUser(@Body() data: ICreateUserDTO) {
        const { anSenha, ...userData } = data;
        const hash = hashSync(anSenha, 8);
        const user = await this.usersService.createUser({
            ...userData,
            anSenha: hash
        }); 
        return user;
    }

    @Put(":id")
    async updateUser(@Param("id", ParseUUIDPipe) id: string, @Body() data: IUpdateUserDTO) {
        await this.usersService.updateUser(id, data);
    }

    @Patch(":id")
    async inactivateUser(@Param("id", ParseUUIDPipe) id: string) {
        await this.usersService.inactivateUser(id);
    }

    @Delete(":id")
    async deleteUser(@Param("id", ParseUUIDPipe) id: string) {
        await this.usersService.deleteUser(id);
    }
}
