import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { ICreateUserDTO } from './DTOs/ICreateUserDTO';
import { IUpdateUserDTO } from './DTOs/IUpdateUserDTO';
import { IGetUsersDTO } from './DTOs/IGetUsersDTO';
import { UsersService } from './users.service';
import { hashSync } from "bcryptjs";
import { AuthGuard } from '@nestjs/passport';
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}
    
    @UseGuards(AuthGuard("jwt"))
    @Post()
    async getUsers(@Body() where: IGetUsersDTO) {
        const users = this.usersService.findUsers(where);
        return users;
    }

    @UseGuards(AuthGuard("jwt"))
    @Get("all")
    async getAllUsers() {
        return this.usersService.findAll();
    }
    
    @UseGuards(AuthGuard("jwt"))
    @Post("create")
    async createUser(@Body() data: ICreateUserDTO) {
        const { anSenha, ...userData } = data;
        const hash = hashSync(anSenha, 8);
        const user = await this.usersService.createUser({
            ...userData,
            anSenha: hash
        }); 
        return user;
    }

    @UseGuards(AuthGuard("jwt"))
    @Put(":id")
    async updateUser(@Param("id", ParseUUIDPipe) id: string, @Body() data: IUpdateUserDTO) {
        await this.usersService.updateUser(id, data);
    }

    @UseGuards(AuthGuard("jwt"))
    @Patch(":id")
    async inactivateUser(@Param("id", ParseUUIDPipe) id: string) {
        await this.usersService.inactivateUser(id);
    }

    @UseGuards(AuthGuard("jwt"))
    @Delete(":id")
    async deleteUser(@Param("id", ParseUUIDPipe) id: string) {
        await this.usersService.deleteUser(id);
    }
}
