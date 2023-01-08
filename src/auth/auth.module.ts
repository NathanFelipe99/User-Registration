import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport/dist';
import User from 'src/typeorm/entities/User';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LocalStrategy } from './local.auth';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        PassportModule,
        JwtModule
    ],
    providers: [AuthService, UsersService, LocalStrategy],
    controllers: [AuthController]
})
export class AuthModule { }
