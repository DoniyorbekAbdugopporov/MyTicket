import { adminStub } from "../test/stubs/admin.stub";

export const AdminService = jest.fn().mockReturnValue({
  createAdmin: jest.fn().mockResolvedValue(adminStub()),
  getAllAdmins: jest.fn().mockResolvedValue([adminStub()]),
  getAdminById: jest.fn().mockResolvedValue(adminStub()),
  findAdminByLogin: jest.fn().mockResolvedValue(adminStub()),
  updateAdminById: jest.fn().mockResolvedValue([1]),
  deleteAdminById: jest.fn().mockResolvedValue([1]),
});
