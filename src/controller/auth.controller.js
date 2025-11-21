import { UserService } from "../services/user.services.js";

export const AuthController = {
  register: async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Nombre de usuario, email y contraseña son requeridos' });
    }

    try {
      const result = await UserService.registerUser({ username, email, password });
      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      res.status(201).json({
        message: 'Usuario registrado exitosamente',
        user: result,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    try {
      const result = await UserService.loginUser(email, password);
      if (result.error) {
        return res.status(401).json({ error: result.error });
      }

      res.status(200).json({
        message: 'Inicio de sesión exitoso',
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        user: result.user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },
};