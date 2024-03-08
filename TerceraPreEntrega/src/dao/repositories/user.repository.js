import UserDTO from "../../dtos/user.dto.js";

export default class UserRepository {
    constructor(dao) {
        this.dao = dao;
    }

    registerUser = async (userData) => {
        const newUser = new UserDTO(userData);
        const result = await this.dao.create(newUser);
        return result;
    }

    loginUser = async (userData) => {
        const { email, password } = userData;
        const user = await this.dao.getUserByEmail(email);
        if (!user || user.password !== password) {
            throw new Error('Credenciales inválidas');
        }
        return user;
    }

    logoutUser = async () => {
        // Implementa la lógica de cierre de sesión aquí
        // Por ejemplo, en una aplicación web con Express y Express-Session, sería:
        // req.session.destroy();
        // Pero esto dependerá del framework o tecnología que estés utilizando
    }

    updateUserPassword = async (email, newPassword) => {
        const user = await this.dao.getUserByEmail(email);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        user.password = newPassword;
        const result = await user.save();
        return result;
    }

    getUserByEmail = async (email) => {
        const user = await this.dao.getUserByEmail(email);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        return user;
    }

    githubAuth = async () => {
        // Implementa la lógica de autenticación de GitHub aquí

    }
    
    githubCallback = async () => {
        // Implementa la lógica de callback de autenticación de GitHub aquí

    }

    getCurrentUser = async (req) => {
        try {
            // Verifica si hay una sesión y si hay un usuario autenticado (su ID) en la sesión
            if (req.session && req.session.userId) {
                // Obtiene el usuario desde la base de datos usando el ID almacenado en la sesión
                const user = await this.dao.getUserById(req.session.userId);
                // Verifica si el usuario existe
                if (!user) {
                    throw new Error('Usuario no encontrado');
                }
                // Retorna el usuario recuperado
                return user;
            } else {
                throw new Error('Usuario no autenticado');
            }
        } catch (error) {
            throw new Error('Error al obtener el usuario actual: ' + error.message);
        }
    }
}