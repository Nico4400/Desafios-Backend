import { userModel } from "../models/user.model.js";


export class UserManager {
    async getUser(email) {
        try {
            const user = await userModel.findOne({ email: email });
            if(user) {                
                return {message: "OK" , rdo: user}
            } else {
                return {message: "ERROR" , rdo: "El Usuario no existe"}
            }
        } catch (e) {
            return {message: "ERROR" , rdo: "Error al obtener el usuario: " + e.message}
        }
    }

    async getUserId(id) {
        try {
            const user = await userModel.findOne({ _id: id });
            if(user) {
                return {message: "OK" , rdo: user}
            } else {
                return {message: "ERROR" , rdo: "El Usuario no existe"}
            }
        } catch (e) {
            return {message: "ERROR" , rdo: "Error al obtener el usuario: " + e.message}
        }
    }
  
    async addUser(user){
        try{
            const validation = !user.first_name || !user.last_name || !user.email || !user.age || !user.password ? false : true;
            if (!validation)
                return {message: "ERROR" , rdo: "Faltan datos en la creacion del usuario", user}    
            const added = await userModel.create(user);
            console.log("a",added);
            return {message: "OK" , rdo: added}
        } catch (err) {
            console.error("Error al dar de alta el usuario:", user);
            if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
                return { message: "ERROR", rdo: `El correo electrónico '${err.keyValue.email}' ya está en uso.` };
            } else {
                return { message: "ERROR", rdo: "Error al dar de alta el usuario: " + err.message };
            }
        }
    }
  
    async deleteUser(id) {
        try {
            const deleted = await userModel.deleteOne({_id: id});    
            if (deleted.deletedCount === 0) {
                return {message: "ERROR" , rdo: `No se encontró el usuario con el ID ${id}. No se pudo eliminar.`}
            }    
            return {message: "OK" , rdo: `Usuario con ID ${id} eliminado exitosamente.`}
        } catch (e) {
            return {message: "ERROR" , rdo: "Error al momento de eliminar el usuario - "+ e.message}
        }
    }

    async updateRole(id, role){
        try {
            console.log('Updating role:', id, role);
            const result = await userModel.updateOne({_id: id}, role);
            return result;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}

export default UserManager;