import { Users } from "../../../users/models/users.model";

export const userStub = (): Partial<Users> => {
  return {
    id: 1,
    name: "user1",
    email: "user1@getMaxListeners.com",
    password: "13245435",
    role_value: "ADMIN",
    is_active: true,
  };
};
