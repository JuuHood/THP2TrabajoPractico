import { UserRepository } from "../repository/user.repository.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const UserService = {
  registerUser: async (userData) => {
    // Verificar si el usuario ya existe
    const existingUser = await UserRepository.getByEmail(userData.email);
    if (existingUser) {
      return { error: 'El usuario ya existe' };
    }

    const createdUser = await UserRepository.create(userData);
    if (!createdUser) return null;

    // Retornar usuario sin hash de contraseña
    const { password_hash, ...userWithoutPassword } = createdUser;
    return userWithoutPassword;
  },

  loginUser: async (email, password) => {
    const user = await UserRepository.getByEmail(email);
    if (!user) {
      return { error: 'Credenciales inválidas' };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return { error: 'Credenciales inválidas' };
    }

    // Generar tokens JWT
    const accessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' } // Token de acceso de corta duración
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' } // Token de renovación más largo
    );

    return {
      accessToken,
      refreshToken,
      user: { id: user.id, username: user.username, email: user.email, role: user.role }
    };
  },

  getUserById: async (id) => {
    const user = await UserRepository.getById(id);
    if (!user) return null;

    const { password_hash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  updateUser: async (id, newData) => {
    const updatedUser = await UserRepository.updateById(id, newData);
    if (!updatedUser) return null;

    const { password_hash, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  },

  deleteUser: async (id) => {
    return await UserRepository.deleteById(id);
  },
};