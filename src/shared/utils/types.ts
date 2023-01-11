export type CreateUserParams = {
    nmUsuario: string;
    anEmail: string;
    anSenha: string;
}

export type UpdateUserParams = {
    nmUsuario?: string;
    anEmail?: string;
    boInativo?: number;
    caEstrategiaAutenticacao?: string;
}

export type FindUsersParams = {
    id?: string;
    cnUsuario?: number; 
    nmUsuario?: string;
    anEmail?: string;
    boInativo?: number;
}