import { TestingModule } from "@nestjs/testing";
import { UsersService } from "../users.service";
import { userStub } from "./stubs/user.stub";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import { RolesService } from "../../roles/roles.service";
import { getModelToken } from "@nestjs/sequelize";
import { Users } from "../models/users.model";
import { Roles } from "../../roles/models/roles.model";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";

describe("User service", () => {
  let usersService: UsersService;
  const mockUsersModel = {
    create: jest.fn().mockImplementation(userStub),
    findOne: jest.fn().mockImplementation(userStub),
    findAll: jest.fn().mockImplementation(() => [userStub()]),
    findByPk: jest.fn().mockImplementation(userStub),
    update: jest.fn().mockImplementation(() => [1, [userStub()]]),
    destroy: jest.fn(),
  };
  const mockRolesModel = {
    findOne: jest.fn().mockImplementation((value: string) => "USER"),
  };
  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        UsersService,
        JwtService,
        RolesService,
        {
          provide: getModelToken(Users),
          useValue: mockUsersModel,
        },
        {
          provide: getModelToken(Roles),
          useValue: mockRolesModel,
        },
      ],
    }).compile();
    usersService = moduleRef.get<UsersService>(UsersService);
  });

  it("should be defined", () => {
    expect(usersService).toBeDefined();
  });

  describe("createUser", () => {
    describe("when create User is called", () => {
      let createUsersDto: CreateUserDto;
      let newUser: Users;
      beforeEach(async () => {
        createUsersDto = {
          name: userStub().name,
          email: userStub().email,
          password: userStub().password,
          role_value: userStub().role_value,
        };
        newUser = await usersService.create(createUsersDto);
        console.log(newUser);
      });
      it("should be create new user", async () => {
        expect(newUser).toMatchObject({
          ...userStub(),
          roles: ["USER"],
        });
      });
    });
  });

  describe("getOneUser", () => {
    describe("when getOneUser is called", () => {
      test("then it should call usersService", async () => {
        expect(await usersService.findOne(userStub().id)).toEqual(userStub());
      });
    });
  });

  describe("getAllUsers", () => {
    describe("when getAllUsers is called", () => {
      test("then it should call usersService", async () => {
        expect(await usersService.findAll()).toEqual([userStub()]);
      });
    });
  });

  describe("update user", () => {
    describe("when update user is called", () => {
      let updatedUser: Users[];
      const id = userStub().id;
      const updateUserDto: UpdateUserDto = {
        name: "user1",
        email: "user@example.com",
        password: "1234566666",
        role_value: "SUPERADMIN",
      };

      beforeAll(async () => {
        const result = await usersService.update(id, updateUserDto);
        updatedUser = result[1];
      });

      it("then it should call usersService.update", () => {
        expect(mockUsersModel.update).toHaveBeenCalledWith(updateUserDto, {
          where: { id },
          returning: true,
        });
      });

      it("then it should return updated user", () => {
        expect(updatedUser).toEqual([userStub()]);
      });
    });
  });
});
