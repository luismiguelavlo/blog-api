import { encriptAdapter } from "../../config";
import { JwtAdapter } from "../../config/jwt.adapter";
import { User } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDTO } from "../../domain";

export class UserService {
  async login(credentials: LoginUserDto) {
    //1. buscar el usuario que se quiere loguear
    const user = await this.findUserByEmail(credentials.email);
    //2. validar si la contraseña es correcta
    const isMatching = encriptAdapter.compare(
      credentials.password,
      user.password
    );
    if (!isMatching) throw CustomError.unAuthorized("Invalid Credentials");
    //3. debemos generar un jwt
    const token = await JwtAdapter.generateToken({ id: user.id }); //! IMPORTANTE RECORDAR QUE EL PAYLOAD DEL JWT VIENE CON EL ID DEL USUARIO QUE SE ESTA LOGUEANDO
    if (!token) throw CustomError.internalServer("Error while creating JWT");
    //4.enviar la data al cliente
    return {
      token: token,
      user: {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        photo: user.photo,
        birthdate: user.birthdate,
      },
    };
  }

  async register(userData: RegisterUserDTO) {
    //guardar la data del usuario
    const user = new User();

    user.name = userData.name;
    user.surname = userData.surname;
    user.email = userData.email;
    user.password = userData.password;
    user.birthdate = userData.birthdate;

    try {
      const dbUser = await user.save();

      //TODO: enviar link de validacion

      return {
        id: dbUser.id,
        name: dbUser.name,
        surname: dbUser.surname,
        email: dbUser.email,
        photo: dbUser.photo,
        birthdate: dbUser.birthdate,
      };
    } catch (error: any) {
      if (error.code === "23505") {
        throw CustomError.badRequest(
          `User with email: ${userData.email} already exist`
        );
      }
      throw CustomError.internalServer("Error while creating user");
    }
  }

  async findUserByEmail(email: string) {
    const user = await User.findOne({
      where: {
        email: email,
        status: true,
      },
    });

    if (!user) throw CustomError.notFoud(`User with email: ${email} not found`);

    return user;
  }
}