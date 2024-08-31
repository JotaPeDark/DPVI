import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    register(createUserDto: CreateUserDto): Promise<import("./schemas/user.schema").User>;
    findOne(id: string): Promise<import("./schemas/user.schema").User>;
    update(id: string, username: string, password: string): Promise<import("./schemas/user.schema").User>;
    delete(id: string): Promise<import("./schemas/user.schema").User>;
}
