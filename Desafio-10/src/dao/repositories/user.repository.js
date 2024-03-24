import UserDTO from "../../dtos/user.dto.js";

export default class UserRepository {
    constructor(dao) {
        this.dao = dao;
    }

    addUser = async (userData) => {
        const result = await this.dao.addUser(userData);
        return result;
    }

    getUser = async (email) => {
        const user = await this.dao.getUser(email);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        return user;
    }
    
    getUserId = async(id) => {
        const result = await this.dao.getUserId(id)
        return result
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


    // githubAuth = async () => {
    //     // Implementa la lógica de autenticación de GitHub aquí

    // }
    
    // githubCallback = async () => {
    //     // Implementa la lógica de callback de autenticación de GitHub aquí

    // }

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