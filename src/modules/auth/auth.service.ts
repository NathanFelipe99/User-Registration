import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService
    ) { }
    
    async validateUserCredentials(nmUsuario: string, anSenha: string): Promise<any> {
        const user = await this.usersService.findOne({ nmUsuario });
        
        if (!user) {
            throw new UnauthorizedException("Usuário ou senha inválidos");
        } else {
            const isPasswordValid = await compare(anSenha, user.anSenha);
            if (!isPasswordValid) {
                throw new UnauthorizedException("Usuário ou senha inválidos");
            } else {
                delete user.anSenha;
                return this.loginWithCredentials(user);
            }
        }
    }

    async loginWithCredentials(user: any) {
        const payload = { nmUsuario: user.nmUsuario };

        return {
            user_data: user,
            access_token: this.jwtService.sign(payload) 
        }
    }
}
