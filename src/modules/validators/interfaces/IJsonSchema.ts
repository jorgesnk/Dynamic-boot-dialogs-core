import { EJsonSchemaTypes, EJsonSchemaFormat } from '../enums/EJsonSchema'
export interface IJsonSchema {
    type: EJsonSchemaTypes,
    minLength?: number,
    maxLength?: number,
    format?: EJsonSchemaFormat,
    minimum?: number,
    maximum?: number,
    enum?: string[],
    required?: string[],
    items?: IJsonSchema,
    minItems?: number,
    maxItems?: number,
    uniqueItems?: boolean,
    additionalProperties?: boolean,
    properties?: { [key: string]: IJsonSchema }
}