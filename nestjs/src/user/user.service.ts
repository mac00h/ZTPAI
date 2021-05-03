import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { UserDTO } from 'src/dto/user.dto';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    public async createOne(createUserRequest: CreateUserDTO){
        const user: User = new User();
        user.email = createUserRequest.email;
        user.password = createUserRequest.password;

        await this.userRepository.save(user);

        const userDTO = this.entityToDTO(user)

        return userDTO;
    }

    private entityToDTO(user: User): UserDTO{
        const userDTO = new UserDTO();
        userDTO.id = user.id;
        userDTO.email = user.email;
        userDTO.password = user.password;

        return userDTO;
    }

    public async getAll(){
        const users: User[] = await this.userRepository.find();
        const userDTO: UserDTO[] = users.map(x => this.entityToDTO(x));

        return userDTO;
    }

    public async getOne(userId: number){
        const user: User = await this.userRepository.findOne(userId);
        if(!user) throw new NotFoundException(`User with id ${userId} does not exist.`);

        const userDTO: UserDTO = this.entityToDTO(user);
        return userDTO;
    }
/*
    public async getOneByEmail(email: string){
        const user: User = await this.userRepository.findOne(email);
        if(!user) throw new NotFoundException(`User with email ${email} does not exist.`);

        const userDTO: UserDTO = this.entityToDTO(user);
        return userDTO;
    }
*/
    public async deleteOne(userId: number){
        //fetch and check if user exists
        const user: User = await this.getOne(userId);
        //delete the user
        await this.userRepository.remove(user);
    }
}
