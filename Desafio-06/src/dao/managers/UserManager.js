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
  
    async addUser(user){
        try{
            const validation = !user.first_name || !user.last_name || !user.email || !user.age || !user.password ? false : true;
            if (!validation)
                return {message: "ERROR" , rdo: "Faltan datos en la creacion del usuario"}    
            const added = await userModel.create(user);
            return {message: "OK" , rdo: added}
        } catch (err) {
            res.status(400).json({ message: "Error al dar de alta el usiario - " + err.menssage })
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
}
