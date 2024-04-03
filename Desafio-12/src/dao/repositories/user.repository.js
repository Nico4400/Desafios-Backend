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

    updateRole = async (id, role) => {
        const response = await this.dao.updateRole(id, role);
        return response;
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