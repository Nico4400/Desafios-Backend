import { userModel } from "../models/user.model.js";
import MailingService from "../../services/mailing/nodemailer.js";
import { actualDate} from "../../utils/functions.js";


export class UserManager {

    async getUsers(){
        try {
            const users = await userModel.find()
            if(users) {                
                return {message: "OK" , rdo: users}
            } else {
                return {message: "ERROR" , rdo: "Usuarios no existentes"}
            }
        } catch (e) {
            return {message: "ERROR" , rdo: "Error al obtener los usuarios: " + e.message}
        }
    }

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

    async updateLastConnection(email) {
        try {
            const currentDate = actualDate(); // Llama a la función para obtener la fecha actual
            const update = await userModel.findOneAndUpdate(
                { email: email },
                { last_connection: currentDate },
                { new: true }
            );

            if (update) {
                return { message: "OK", rdo: `Fecha de último ingreso actualizada exitosamente: ${update.last_connection}` };
            } else {
                return { message: "ERROR", rdo: "No se pudo actualizar la fecha de último ingreso" };
            }
        } catch (e) {
            return { message: "ERROR", rdo: `Error al actualizar la fecha de último ingreso: ${e.message}` };
        }
    }

    async deleteUsersLastConection() {
        try {           
            const twoDaysOf = new Date()
            twoDaysOf.setDate(twoDaysOf.getDate() - 2)
            console.log("Fecha límite para inactividad:", twoDaysOf);
            
            // Encontrar usuarios con last_connection anterior a la fecha límite o sin last_connection
            const users = await userModel.find({ 
                $or: [
                    { last_connection: { $lt: twoDaysOf } },
                    { last_connection: { $exists: false } }
                ] 
            });
            console.log("Usuarios inactivos encontrados:", users);
        
            if (users && users.length > 0){        
                // Instanciar el servicio de correo electrónico
                const mailingServices = new MailingService()
        
                // Recorrer los usuarios y enviar correo a cada uno
                for (const user of users) {
                    try { 
                        // Intentar enviar el correo electrónico   
                        if (user.email) {
                            console.log(`Enviando correo a ${user.email}`);
                            // Envia el correo electrónico
                            await mailingServices.sendSimpleMail({
                                from: "E-commerce",
                                to: user.email,
                                subject: "Recordatorio de inactividad - baja de usuario",
                                html: `
                                    <div>
                                        <h1>Baja de Usuario</h1>
                                        <p>The Hola <b>${user.first_name}</b></p>
                                        <p>Su usuario a sido eliminado ya que no has iniciado sesión en nuestra plataforma en los últimos 2 días.</p>
                                    </div>
                                `,
                            });
                        } else {
                            console.log(`Usuario ${user._id} no tiene correo electrónico`);
                        }                        
                    } catch (error) {
                        console.error(`Error al enviar correo electrónico a ${user.email}:`, error)
                    }
                    // Eliminar el usuario de la base de datos
                    console.log(`Eliminando usuario con ID ${user._id}`);
                    await userModel.deleteOne({ _id: user._id });
                }
                return {message: "OK" , rdo: users}
            } else {
                return { message: "OK", rdo: "No hay usuarios inactivos para eliminar" };
            }             
        } catch (e) {
            console.log(e)
            return {message: "ERROR" , rdo: "Error al momento de eliminar los usuarios"}
        }
    }
}

export default UserManager;