import { UserDTO } from "../api/dto/user.dto";

interface Props {
    data: UserDTO;
}

const User = ({data}: Props) => {
    return(<div>
        email: {data.email}<br></br>
        password: {data.password}
    </div>);
}

export default User;
