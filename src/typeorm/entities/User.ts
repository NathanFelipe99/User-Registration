import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity({ name: "users" })
class User {

    @Column({ generated: "uuid" })
    id: string;

    @PrimaryGeneratedColumn("increment", { type: "bigint" })
    cnUsuario: number;

    @Column({ length: 40, unique: true })
    nmUsuario: string;

    @Column({ length: 60, unique: true })
    anEmail: string;

    @Column()
    anSenha: string;

    @Column({ nullable: true })
    caEstrategiaAutenticacao: string;

    @Column({ default: 0 })
    boInativo?: number;

    @CreateDateColumn()
    dtIncSys?: Date;

    @UpdateDateColumn({ nullable: true })
    dtAltSys?: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
            this.dtIncSys = new Date();
            this.dtAltSys = null;
        }
    }
}

export default User;