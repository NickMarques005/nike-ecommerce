import { ZodObject, ZodRawShape, ZodTypeAny, ZodEffects, z } from 'zod';

// Validação de um campo individual
export const validateField = (
    schema: z.ZodObject<any>,
    field: string,
    formData: any
) => {
    try {
        const fieldSchema = schema.pick({ [field]: true });
        fieldSchema.parse({ [field]: formData[field] });
        return '';
    } catch (err) {
        if (err instanceof z.ZodError) {
            return err.errors[0]?.message || 'Erro desconhecido';
        }
        return 'Erro na validação';
    }
};

// Validação do formulário completo
export const validateForm = <T extends ZodRawShape>(
    schema: ZodObject<T, any, ZodTypeAny> | ZodEffects<ZodObject<T, any, ZodTypeAny>>,
    values: { [K in keyof T]: any }
) => {
    const result = schema.safeParse(values);
    if (!result.success) {
        return result.error.flatten().fieldErrors;
    }
    return {};
};