import { envs } from "../../../src/config";
import { PostgresDatabase, Status, User } from "../../../src/data";
import { testServer } from "../../test-server";
import request from "supertest";
import moment from "moment";

describe("user route testing", () => {
  let userCreated: User;
  let token: string;

  beforeAll(async () => {
    await testServer.start();
    await new PostgresDatabase({
      host: envs.DB_HOST,
      port: envs.DB_PORT,
      username: envs.DB_USERNAME,
      password: envs.DB_PASSWORD,
      database: envs.DB_DATABASE,
    }).connect();

    const user = new User();
    user.name = "casimiro";
    user.surname = "robles";
    user.email = "cr@gmail.com";
    user.password = "Pass12345*";
    user.birthdate = new Date("1997-05-15");
    user.status = Status.ACTIVE;

    userCreated = await user.save();
  });

  afterAll(async () => {
    const user = await User.findOne({
      where: {
        email: "cr@gmail.com",
      },
    });
    if (user) await user.remove();

    const user2 = await User.findOne({
      where: {
        email: "pp@gmai.com",
      },
    });
    if (user2) await user2.remove();
  });

  describe("Test login user", () => {
    test("should login user", async () => {
      const { body } = await request(testServer.app)
        .post("/api/user/login")
        .send({ email: "cr@gmail.com", password: "Pass12345*" })
        .expect(200);

      token = body.token;

      expect(body).toEqual({
        token: expect.any(String),
        user: {
          id: expect.any(String),
          name: userCreated.name,
          surname: userCreated.surname,
          email: userCreated.email,
          photo: expect.any(String),
          birthdate: moment(userCreated.birthdate).format("YYYY-MM-DD"),
        },
      });
    });

    test("Should return 422 status when user loggin without credentials", async () => {
      const { body } = await request(testServer.app)
        .post("/api/user/login")
        .send({})
        .expect(422);
    });

    test("Should return 401 status error when user does not exist", async () => {
      const { body } = await request(testServer.app)
        .post("/api/user/login")
        .send({ email: "cr1@gmail.com", password: "Pass12345*" })
        .expect(401);

      expect(body).toEqual({
        message: "Invalid Credentials",
      });
    });

    test("Should return 401 status error when password is wrong", async () => {
      const { body } = await request(testServer.app)
        .post("/api/user/login")
        .send({ email: "cr@gmail.com", password: "Pass12345**" })
        .expect(401);

      expect(body).toEqual({
        message: "Invalid Credentials",
      });
    });
  });

  describe("Test register user", () => {
    test("Should register user and send status 200", async () => {
      const user = {
        name: "pepito",
        surname: "perez",
        email: "pp@gmai.com",
        password: "Pass12345*",
        birthdate: "05-15-1997",
        status: Status.ACTIVE,
      };

      const { body } = await request(testServer.app)
        .post("/api/user/register")
        .send(user)
        .expect(200);

      expect(body).toEqual({
        id: expect.any(String),
        name: user.name,
        surname: user.surname,
        email: user.email,
        photo: expect.any(String),
        birthdate: user.birthdate,
      });
    });
  });

  describe("test get user profile", () => {
    test("should return user data when execute getProfile", async () => {
      const { body } = await request(testServer.app)
        .get("/api/user/profile")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(body).toEqual({
        id: expect.any(String),
        name: userCreated.name,
        surname: userCreated.surname,
        email: userCreated.email,
        birthdate: moment(userCreated.birthdate).format("YYYY-MM-DD"),
        photo: expect.any(String),
      });
    });
  });
});
