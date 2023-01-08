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