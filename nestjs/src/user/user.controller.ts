import { Controller, Post, Body, Get, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService){}
    
    @Get()
    public async getAll(){
        const resp = await this.userService.getAll();
        return resp;
    }

    @Get("/:id")
    public async getOne(@Param("id") userId: number){
        const resp = await this.userService.getOne(userId);
        return resp;
    }
/*
    @Get("email/:email")
    public async getOneByEmail(@Param("email") email: string){
        const resp = await this.userService.getOneByEmail(email);
        return resp;
    }
*/
    @Post()
    public async createOne(@Body() createUserRequest: CreateUserDTO){
        const resp = await this.userService.createOne(createUserRequest);
        return resp;
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    public async deleteOne(@Param("id") userId: number){
        await this.userService.deleteOne(userId);
    }
}

