import { Controller } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators';
import { AuthService } from './auth.service';
import { IAuthDTO } from './DTOs/IAuthDTO';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    
    @Post("login")
    async login(@Body() data: IAuthDTO) {
        return this.authService.validateUser(data.nmUsuario, data.anSenha);
    }
}
