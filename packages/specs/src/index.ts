import { IsOptional, IsInt, Length, IsEmail, Matches, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
/*
 * This file is auto-generated. Do NOT modify this file manually.
*/
type OperationWithoutBody = (path: string, query: {
    [key: string]: any;
}) => Promise<any>;
type OperationWithBody = (path: string, body: any, query: {
    [key: string]: any;
}) => Promise<any>;
export interface HTTPClient {
    get: OperationWithoutBody;
    post: OperationWithBody;
    put: OperationWithBody;
    delete: OperationWithoutBody;
    patch: OperationWithBody;
    setHeaders: (headers: {
        [key: string]: string;
    }) => void;
}
export type GetMyHealthResponseBody = string;
export type ListMachinesQuery = {
    offset?: number;
    limit?: number;
};
export type Machine = {
    id: number;
    name: string;
    tag?: string;
};
export type Machines = Machine[];
export type ListMachinesResponseBody = Machines;
export type CreateMachinesRequestBody = {
    name?: string;
    tag?: string | null;
    provider?: {
        email?: string | null;
        phonoNo?: string;
        contactDate?: string | Date;
    };
};
export type ShowMachineByIdResponseBody = Machine;
export class ListMachinesQueryValidator {
    /**
     * How many items to skip. Use for pagination
     */
    @IsOptional()
    @IsInt()
    offset: number;
    /**
     * How many items to return at one time (max 100)
     */
    @IsOptional()
    @IsInt()
    limit: number;
}
export class Provider1Validator {
    /**
     * email
     */
    @IsOptional()
    @IsEmail()
    email: string;
    /**
     * phonoNo
     */
    @IsOptional()
    @Matches(/^\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/)
    phonoNo: string;
    /**
     * contactDate
     */
    @IsOptional()
    @Type(() => Date)
    contactDate: Date;
}
export class CreateMachinesRequestBodyValidator {
    /**
     * name
     */
    @IsOptional()
    @Length(3, 128)
    name: string;
    /**
     * tag
     */
    @IsOptional()
    tag: string;
    /**
     * provider
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => Provider1Validator)
    provider: {
        email?: string | null;
        phonoNo?: string;
        contactDate?: string | Date;
    };
}
export default class APIAgent {
    httpClient: HTTPClient;
    constructor(httpClient: HTTPClient) {
        this.httpClient = httpClient;
    }
    /**
     * Health Check
     */
    async getMyHealth() {
        return await this.httpClient.get("/", {}) as GetMyHealthResponseBody;
    }
    /**
     * List all machines
     */
    async listMachines(query: ListMachinesQuery) {
        return await this.httpClient.get("/machines", query) as ListMachinesResponseBody;
    }
    /**
     * Create a machine
     */
    async createMachines(body: CreateMachinesRequestBody) {
        return await this.httpClient.post("/machines", body, {});
    }
    /**
     * Info for a specific machine
     */
    async showMachineById(machineId: string) {
        return await this.httpClient.get(`/machines/${machineId}`, {}) as ShowMachineByIdResponseBody;
    }
}
