import { User } from '../models/user';
import { CreateUserDTO, UpdateUserDTO } from '../utils/interface/user.interface';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

export class UserService {
  async createUser(data: CreateUserDTO) {
    const hashedPassword = await argon2.hash(data.password);
    const user = new User({ ...data, password: hashedPassword });
    return await user.save();
  }

  async getUserById(id: string) {
    return User.findById(id).populate('products');
  }

  async findUserByEmail(email: string) {
    const existingUser = await User.findOne({ email });
    return existingUser;
  }

  async updateUser(id: string, data: UpdateUserDTO) {
    if (data.password) {
      data.password = await argon2.hash(data.password);
    }
    return User.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteUser(id: string) {
    return User.findByIdAndDelete(id);
  }

  async authenticateUser(email: string, password: string) {
    let user = await User.findOne({ email }, { _id: 1, name: 1, email: 1, password: 1 });
    if (user && (await argon2.verify(user.password, password))) {
      user = user.toObject();
      const jwtSecret: string = process.env.JWT_SECRET;
      const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: 60 * 60 });
      user['token'] = token;
      delete user.password;
      return user;
    }
    return null;
  }
}
