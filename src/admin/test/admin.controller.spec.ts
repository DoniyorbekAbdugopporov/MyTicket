import { JwtService } from "@nestjs/jwt";
import { AdminController } from "../admin.controller";
import { AdminService } from "../admin.service";
import { Test } from "@nestjs/testing";
import { Admin } from "../models/admin.model";
import { CreateAdminDto } from "../dto/create-admin.dto";
import { adminStub } from "./stubs/admin.stub";

jest.mock("../admin.service");

describe("Admin controller", () => {
  let adminController: AdminController;
  let adminService: AdminService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [AdminService, JwtService],
    }).compile();

    adminController = moduleRef.get<AdminController>(AdminController);
    adminService = moduleRef.get<AdminService>(AdminService);
  });

  it("Admin controller should be defined", () => {
    expect(adminController).toBeDefined();
  });

  it("Admin Service should be defined", () => {
    expect(adminService).toBeDefined();
  });

  describe("create admin", () => {
    describe("when create admin is called", () => {
      let admin: Admin;
      let createAdminDto: CreateAdminDto;

      beforeAll(async () => {
        createAdminDto = {
          name: adminStub().name,
          login: adminStub().login,
          password: adminStub().password,
          is_active: adminStub().is_active,
          is_creator: adminStub().is_creator,
        };
        admin = await adminController.createAdmin(createAdminDto);
      });

      it("then it should call adminService", () => {
        expect(adminService.createAdmin).toHaveBeenCalledWith(createAdminDto);
      });

    //   it("then it should return admin", () => {
    //     expect(admin).toEqual(adminStub());
    //   });
    });
  });
});
