import { Controller } from '@nestjs/common';
import { Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IAuthDTO } from './DTOs/IAuthDTO';

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post("login")
    async login(@Body() data: IAuthDTO) {
        return this.authService.validateUserCredentials(data.nmUsuario, data.anSenha);
    }
}
