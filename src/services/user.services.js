import { UserRepository } from "../repository/user.repository.js";
import { config } from "../config/config.js";  
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const UserService = {
  registerUser: async (userData) => {
    // Verificar si el usuario ya existe por email
    const existingUser = await UserRepository.getByEmail(userData.email);
    if (existingUser) {
      return { error: "El usuario ya existe" };
    }

    // Crear usuario (el repo ya hashea la contraseña)
    const createdUser = await UserRepository.create(userData);
    if (!createdUser) return null;

    // Retornar usuario sin contraseña
    const { password, ...userWithoutPassword } = createdUser;
    return userWithoutPassword;
  },

  loginUser: async (email, password) => {
    const user = await UserRepository.getByEmail(email);
    if (!user) {
      return { error: "Credenciales inválidas" };
    }

    // Comparar contra el hash almacenado en 'password'
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { error: "Credenciales inválidas" };
    }

    // Generar tokens JWT
    const accessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      config.JWT_SECRET,
      { expiresIn: "15m" } // Token de acceso de corta duración
    );

    const refreshToken = jwt.sign(
      { id: user.id },
       config.JWT_REFRESH_SECRET,
      { expiresIn: "7d" } // Token de renovación más largo
    );

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        nombre: user.nombre,    
        email: user.email,
        role: user.role,
      },
    };
  },

  refreshAccessToken: async (refreshToken) => {
    try {
      // Verificar que el refresh token sea válido
      const decoded = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET);

      // Buscar el usuario en la base de datos
      const user = await UserRepository.getById(decoded.id);
      if (!user) {
        return { error: "Usuario no encontrado" };
      }

      // Generar un nuevo access token
      const newAccessToken = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        config.JWT_SECRET,
        { expiresIn: "15m" }
      );

      return {
        accessToken: newAccessToken,
      };
    } catch (error) {
      // Token inválido o expirado
      return { error: "Refresh token inválido o expirado" };
    }
  },

  getUserById: async (id) => {
    const user = await UserRepository.getById(id);
    if (!user) return null;

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  updateUser: async (id, newData) => {
    

    const updatedUser = await UserRepository.updateById(id, newData);
    if (!updatedUser) return null;

    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  },

  deleteUser: async (id) => {
    return await UserRepository.deleteById(id);
  },
};
