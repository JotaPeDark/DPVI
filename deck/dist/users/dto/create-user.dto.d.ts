import { Role } from '../enums/roles.enum';
export declare class CreateUserDto {
    username: string;
    password: string;
    roles: Role[];
}
