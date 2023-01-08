import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import User from 'src/typeorm/entities/User';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService
    ) { }
    
    async validateUser(nmUsuario: string, anSenha: string): Promise<any> {
        const user = await this.usersService.findOne({ nmUsuario });
        if (!user || user.anSenha !== anSenha) throw new UnauthorizedException("Usuário ou senha inválidos");

        return await this.generateToken(user);
    }

    async generateToken(payload: User) {
        return {
            access_token: this.jwtService.sign(
                { cnUsuario: payload.cnUsuario },
                {
                    secret: "topSecret512",
                    expiresIn: "1h"
                }
            )
        }
    }
}
