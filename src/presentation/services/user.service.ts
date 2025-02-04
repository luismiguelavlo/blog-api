import { encriptAdapter, envs } from "../../config";
import { JwtAdapter } from "../../config/jwt.adapter";
import { generateUUID } from "../../config/uuid.adapter";
import { Status, User } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDTO } from "../../domain";
import { EmailService } from "./email.service";
import { UploadFilesCloud } from "../../config/upload-files-cloud.adapter";

export class UserService {
  constructor(private readonly emailService: EmailService) {}

  async login(credentials: LoginUserDto) {
    let urlPhoto = "";
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

    if (user.photo) {
      urlPhoto = await UploadFilesCloud.getFile({
        bucketName: envs.AWS_S3_BUCKET_NAME,
        key: user.photo,
      });
    }

    return {
      token: token,
      user: {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        photo: urlPhoto,
        birthdate: user.birthdate,
      },
    };
  }

  async register(
    userData: RegisterUserDTO,
    file: Express.Multer.File | undefined
  ) {
    //guardar la data del usuario
    const user = new User();
    let urlPhoto = "";
    let path = "";

    user.name = userData.name;
    user.surname = userData.surname;
    user.email = userData.email;
    user.password = userData.password;
    user.birthdate = userData.birthdate;

    if (file?.originalname && file.originalname.length > 0) {
      path = `users/${Date.now()}-${generateUUID()}-${file.originalname}`;

      const imgName = await UploadFilesCloud.uploadSingleFile({
        bucketName: envs.AWS_S3_BUCKET_NAME,
        key: path,
        body: file.buffer,
        contentType: file.mimetype,
      });

      user.photo = imgName;
      urlPhoto = await UploadFilesCloud.getFile({
        bucketName: envs.AWS_S3_BUCKET_NAME,
        key: path,
      });
    }

    try {
      const dbUser = await user.save();
      await this.sendEmailValidationLink(dbUser.email);
      return {
        id: dbUser.id,
        name: dbUser.name,
        surname: dbUser.surname,
        email: dbUser.email,
        photo: urlPhoto,
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
        status: Status.ACTIVE,
      },
    });

    if (!user) throw CustomError.unAuthorized("Invalid Credentials");

    return user;
  }

  public sendEmailValidationLink = async (email: string) => {
    const token = await JwtAdapter.generateToken({ email }, "300s");
    if (!token) throw CustomError.internalServer("Error getting token");

    const link = `http://${envs.WEBSERVICE_URL}/api/user/validate-email/${token}`;
    const html = `
      <h1>Validate your email</h1>
      <p>Click on the following link to validate your email</p>
      <a href="${link}">Validate your email: ${email}</a>
    `;
    const isSent = this.emailService.sendEmail({
      to: email,
      subject: "Validate your account",
      htmlBody: html,
    });
    if (!isSent) throw CustomError.internalServer("Error sending email");

    return true;
  };

  validateEmail = async (token: string) => {
    const payload = await JwtAdapter.validateToken(token);
    if (!payload) throw CustomError.badRequest("Invalid Token");

    const { email } = payload as { email: string };
    if (!email) throw CustomError.internalServer("Email not in token");

    const user = await User.findOne({ where: { email: email } });
    if (!user) throw CustomError.internalServer("Email not exist");

    user.status = Status.ACTIVE;

    try {
      await user.save();

      return {
        message: "Usuario activado",
      };
    } catch (error) {
      throw CustomError.internalServer("Something went very wrong");
    }
  };

  async getUserProfile(user: User) {
    return {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      birthdate: user.birthdate,
      photo: user.photo,
    };
  }

  async findOneUser(userId: string) {
    const result = await User.createQueryBuilder("user")
      .where("user.id = :id", { id: userId })
      .andWhere("user.status = :userStatus", { userStatus: Status.ACTIVE })
      .getOne();

    if (!result) {
      throw CustomError.notFoud("User not found");
    }

    // const query = `SELECT * FROM "user" WHERE "id" = $1`;
    // const result = await User.query(query, [userId]);

    return result;
  }

  async blockAccount() {
    return "hola";
  }
}
