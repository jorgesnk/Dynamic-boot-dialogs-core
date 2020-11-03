import Ajv from 'ajv';
import { IJsonSchema } from './interfaces/IJsonSchema';
export class ValidatorModule {
    private ajv = new Ajv();
    public async validateSchema<T>(schema: IJsonSchema, data: T): Promise<{ isValid: boolean, error?: string }> {
        const validate = this.ajv.compile(schema);
        const valid = await validate(data);
        if (!valid) {
            return { isValid: valid, error: JSON.stringify(validate.errors) }
        }
        return { isValid: true }
    }
}