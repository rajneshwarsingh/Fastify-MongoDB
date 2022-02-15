// utils/sanitizeUser.ts
interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  __v?: number;
}

export function sanitizeUser(user: User): User {
  delete user.__v;
  delete user.password;
  return user;
}
