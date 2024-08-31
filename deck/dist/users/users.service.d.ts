import { Model } from "mongoose";
import { User } from "src/users/schemas/user.schema";
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findOne(username: string): Promise<User | undefined>;
    findById(id: string): Promise<User | undefined>;
    update(id: string, username: string, password: string): Promise<User>;
    delete(id: string): Promise<User>;
}
