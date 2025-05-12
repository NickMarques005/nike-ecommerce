import { z } from 'zod';

export const initAuthFormValidationSchema = z.object({
    email: z.string().email('E-mail inválido')
});

export const signUpFormValidationSchema = z.object({
    email: z.string().email('E-mail inválido'),
    name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
    birth: z.string().refine(
        (val) => /^\d{4}-\d{2}-\d{2}/.test(val),
        { message: 'Data de nascimento inválida' }
    ),
    password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
    otp_code: z.string().min(1, 'Código OTP é obrigatório'),
});

export const signInFormValidationSchema = z.object({
    password: z.string().min(1, 'Digite uma senha válida'),
    otp_code: z.string().min(1, 'Código OTP é obrigatório'),
});