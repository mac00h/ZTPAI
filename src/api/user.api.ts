import { CreateUserDTO } from "./dto/create-user.dto"
import { UserDTO } from "./dto/user.dto"

export class UserAPI {
    public static async getAll(): Promise<UserDTO[]>{
        const resp = await fetch("http://localhost:3000/users", {
            method: "GET"
        })

        const data = await resp.json()
        return data
    }

    public static async createOne(createRequest: CreateUserDTO){
        const resp = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(createRequest)
        })

        const data = await resp.json()
        return data
    }
}