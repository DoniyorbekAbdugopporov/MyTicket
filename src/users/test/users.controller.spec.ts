import { UsersController } from "../users.controller";
import { UsersService } from "../users.service";
import { Test } from "@nestjs/testing";
import { JwtService } from "@nestjs/jwt";
import { Users } from "../models/users.model";
import { CreateUserDto } from "../dto/create-user.dto";
import { userStub } from "./stubs/user.stub";
import { UpdateUserDto } from "../dto/update-user.dto";

jest.mock("../users.service");

describe("Users controller", () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, JwtService],
    }).compile();

    usersController = moduleRef.get<UsersController>(UsersController);
    usersService = moduleRef.get<UsersService>(UsersService);

    // // Mock implementation of usersService methods
    // (usersService.create as jest.Mock).mockResolvedValue(userStub());
    // (usersService.findAll as jest.Mock).mockResolvedValue([userStub()]);
    // (usersService.findOne as jest.Mock).mockResolvedValue(userStub());
    // (usersService.findUserByEmail as jest.Mock).mockResolvedValue(userStub());
    // (usersService.update as jest.Mock).mockResolvedValue([1]);
    // (usersService.remove as jest.Mock).mockReturnValue({
    //   message: "Foydalanuvchi o'chirildi",
    // });
  });

  it("Users controller should be defined", () => {
    expect(usersController).toBeDefined();
  });

  it("Users service should be defined", () => {
    expect(usersService).toBeDefined();
  });

  describe("create user", () => {
    describe("when create user is called", () => {
      let user: Users;
      let createUsersDto: CreateUserDto;

      beforeAll(async () => {
        createUsersDto = {
          name: userStub().name,
          email: userStub().email,
          password: userStub().password,
          role_value: userStub().role_value,
        };
        user = await usersController.create(createUsersDto);
      });

      it("then it should call usersService", () => {
        expect(usersService.create).toHaveBeenCalledWith(createUsersDto);
      });

      test("then it should return user", () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe("findAll users", () => {
    describe("when findAll users is called", () => {
      let users: Users[];

      beforeAll(async () => {
        users = await usersController.findAll();
      });

      it("then it should call usersService", () => {
        expect(usersService.findAll).toHaveBeenCalled();
      });

      it("then it should return users", () => {
        expect(users).toEqual([userStub()]);
      });
    });
  });

  describe("findOne user", () => {
    describe("when findOne user is called", () => {
      let user: Users;
      const id = userStub().id;

      beforeAll(async () => {
        user = await usersController.findOne(id);
      });

      it("then it should call usersService", () => {
        expect(usersService.findOne).toHaveBeenCalledWith(id);
      });

      it("then it should return user", () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe("findUserByEmail", () => {
    describe("when findUserByEmail is called", () => {
      let user: Users;
      const email = userStub().email;

      beforeAll(async () => {
        user = await usersController.findUserByEmail(email);
      });

      it("then it should call usersService", () => {
        expect(usersService.findUserByEmail).toHaveBeenCalledWith(email);
      });

      it("then it should return user", () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  // describe("update user", () => {
  //   describe("when update user is called", () => {
  //     let updatedUser: Users[];
  //     const id = userStub().id;
  //     const updateUserDto: UpdateUserDto = {
  //       name: "user1",
  //       email: "user@example.com",
  //       password: "1234566666",
  //       role_value: "SUPERADMIN",
  //     };

  //     beforeAll(async () => {
  //       const result = await usersController.update(id, updateUserDto);
  //       updatedUser = result[1]; // The updated user should be in the second index of the array result
  //     });

  //     it("then it should call usersService.update", () => {
  //       expect(usersService.update).toHaveBeenCalledWith(id, updateUserDto, {
  //         where: { id },
  //         returning: true,
  //       });
  //     });

  //     it("then it should return updated user", () => {
  //       expect(updatedUser).toEqual([userStub()]); // Verify the updated user matches the stub
  //     });
  //   });
  // });

  describe("remove user", () => {
    describe("when remove user is called", () => {
      let response: number;
      const id = userStub().id;

      beforeAll(async () => {
        response = await usersController.remove(id);
      });

      it("then it should call usersService", () => {
        expect(usersService.remove).toHaveBeenCalledWith(id);
      });

      it("then it should return removed confirmation message", () => {
        expect(response).toEqual([1]);
      });
    });
  });
});
