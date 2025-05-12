export interface UserData {
    uid: string;
    name: string;
    email: string;
    birth?: string;
    cpf?: string;
    cep?: string;
    isEmailVerified?: boolean;
    avatar?: string;
    createdAt?: Date;
    updatedAt?: Date;
}