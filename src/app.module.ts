import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import User from './infra/typeorm/entities/User';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
    imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot({
        type: "mysql",
        host: "localhost",
        port: Number(process.env.DB_PORT) || 3306,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: "nestjs",
        entities: [User],
        synchronize: true
    }), UsersModule, AuthModule],
    controllers: [],
    providers: [],
})
export class AppModule { }
