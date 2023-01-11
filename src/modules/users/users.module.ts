import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/infra/typeorm/entities/User';
import { UserRepository } from 'src/infra/typeorm/repositories/UserRepository';
import { IUserRepositorySymbol } from 'src/base/IUserRepository';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [
        UsersService,
        {
            provide: IUserRepositorySymbol,
            useClass: UserRepository
        }
    ],
    exports: [UsersService]
})
export class UsersModule { }
