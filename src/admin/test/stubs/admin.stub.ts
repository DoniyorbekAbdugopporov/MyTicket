import { Admin } from "../../../admin/models/admin.model";

export const adminStub = (): Partial<Admin> => {
  return {
    id: 1,
    name: "admin",
    login: "admin1",
    password: "Uzbek!$t0n",
    is_active: false,
    is_creator: false,
  };
};
