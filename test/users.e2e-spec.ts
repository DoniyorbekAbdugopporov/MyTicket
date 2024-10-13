import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";

describe("User (e2e)", () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix("api");

    app.useGlobalPipes(new ValidationPipe());

    await app.init();

    // Avtorizatsiya va token olish jarayoni
    const response = await request(app.getHttpServer())
      .post("/api/auth/signin")
      .send({
        email: "doniyorbek22@gmail.com",
        password: "Uzbeki$t0n",
      });

    token = response.body.token;
    console.log("token", token);

    if (!token) {
      throw new Error("Token olishda xatolik yuz berdi.");
    }
  });

  // Foydalanuvchilar ro'yxatini olish testi (Autorizatsiyalangan)
  it("/api/users/all (GET) --> 200 OK", async () => {
    return request(app.getHttpServer())
      .get("/api/users/all")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200);
  });

  // Autorizatsiyasiz so'rov uchun test
  it("/api/users/all (GET) --> 401 'Unauthorized' error", async () => {
    return request(app.getHttpServer())
      .get("/api/users/all")
      .expect("Content-Type", /json/)
      .expect(401);
  });

  // // User sign-up testi
  // it("/api/auth/signup (POST) --> 201", async () => {
  //   return request(app.getHttpServer())
  //     .post("/api/auth/signup")
  //     .send({
  //       name: "user5",
  //       email: "user5@gmail.com",
  //       password: "Uzbek!$t0n",
  //       role_value: "admin",
  //     })
  //     .expect("Content-Type", /json/)
  //     .expect(201)
  //     .then((response) => {
  //       console.log(response.body);
  //       expect(response.body).toMatchObject({
  //         token: expect.any(String),
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err.response.body);
  //     });
  // });

  // // User sign-up testi (foydalanuvchi allaqachon mavjud)
  // it("/api/auth/signup (POST) --> 400 on existing user", async () => {
  //   return request(app.getHttpServer())
  //     .post("/api/auth/signup")
  //     .send({
  //       name: "Doniyorbek",
  //       email: "doniyorbek22@gmail.com", // Foydalanuvchi allaqachon mavjud
  //       password: "Uzbeki$t0n",
  //       role_value: "superadmin", // Noto'g'ri ro'l qiymati
  //     })
  //     .expect("Content-Type", /json/)
  //     .expect(400)
  //     .expect((response) => {
  //       expect(response.body).toMatchObject({
  //         message: "Bunday foydalanuvchi mavjud", // To'g'ri xabarni tekshirish
  //         statusCode: 400,
  //       });
  //     });
  // });

  // // User sign-up testi (parol validatsiyasi)
  // it("/api/auth/signup (POST) --> 400 on weak password", async () => {
  //   return request(app.getHttpServer())
  //     .post("/api/auth/signup")
  //     .send({
  //       name: "user2",
  //       email: "user2@gmail.com",
  //       password: "123", // Parol juda zaif
  //       role_value: "admin",
  //     })
  //     .expect("Content-Type", /json/)
  //     .expect(400)
  //     .expect((response) => {
  //       expect(response.body).toMatchObject({
  //         statusCode: 400,
  //         message: expect.arrayContaining(["Password is not strong enough"]), // To'g'ri validatsiya xabarini tekshirish
  //         error: "Bad Request",
  //       });
  //     });
  // });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });
});
