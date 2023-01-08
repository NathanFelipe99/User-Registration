import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ICreateUserDTO } from './DTOs/ICreateUserDTO';
import { IUpdateUserDTO } from './DTOs/IUpdateUserDTO';
import { UsersService } from './users.service';

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
        const user = await this.usersService.createUser(data); 
        return user;
    }

    @Put(":id")
    async updateUser(@Param("id", ParseUUIDPipe) id: string, @Body() data: IUpdateUserDTO) {
        await this.usersService.updateUser(id, data);
    }
    
}
