import { userService } from "../dao/repositories/index.repository.js";
import { createHash } from "../utils/bcrypt.js";
import MailingService from "../services/mailing/nodemailer.js";
import UserDTO from "../dtos/user.dto.js";


export const getAllUsers = async (req, res, next) => {
    try {
        const result = await userService.getUsers();
        let users = [];

        result.rdo.forEach((user) => {
            const userFormatted = new UserDTO(user) 
            users.push(userFormatted.getCurrentUser())
        });
        
        res.send({status: 'success', payload: users});
    } catch (error) {
        next(error);
    }
};

export const postRegister = async (req, res) => {
    try {
        const userData = req.user;
        console.log("user",userData);
        if (!req.user) {            
            return res.status(400).json({ message: 'Error with credentials' });
        }
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age: req.user.age,
            email: req.user.email,
            role: req.user.role
        }
        res.redirect('/');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const postLogin = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(400).json({ message: 'Error with credentials' });
        }
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age: req.user.age,
            email: req.user.email,
            role: req.user.role
        }
        const result = await userService.updateLastConnection(req.user.rdo.email)
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(400).json({ error });
    }    
};  

export const postLogout = async(req, res) => {
    try {
        req.session.destroy((err) => {
            if(err){
                return res.status(500).json({ message: 'Logout failed' });
            }
            res.json({ redirect: 'http://localhost:8080/login' });
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error });
    }
};

export const postRestore = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await userService.getUser(email);
        if (user.message !== 'OK') {
            return res.status(401).send({ message: "Unauthorized" });
        }
        const mailingService = new MailingService()
        mailingService.sendSimpleMail({
            from: 'Notification <nico.fernandezcastillo@gmail.com>',
            to: user.rdo.email,
            subject: 'We received a request to update your password',
            html: `
                <h1>Update your password</h1>
                <div>                
                    <p>Hi ${user.rdo.first_name},</p>
                    <p>We received a request that you want to update your password. You can do this by clicking the link below.</p>
                    <p>This request expires in 1 hour.</p>
                    <a href="http://localhost:8080/update-password" target="_blank" rel="noopener noreferrer">Restore Password</a>
                    <p>If you didn't make this request, you don't need to do anything.</p>
                </div>
            `
        })
        res.send({message: 'Mail sent'})
    } catch (error) {
        req.logger.warn(error);
        res.status(400).send({ error });
    }
}

export const postUpdate = async (req, res) => {
    console.log('Reached restore-password route');
    const { email, password } = req.body;
    try {
        const user = await userService.getUser(email);
        if (user.message !== 'OK') {
            return res.status(401).json({ message: "Unauthorized" });
        }
        user.rdo.password = createHash(password);
        await user.rdo.save();
        res.json({ message: "Password updated" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error });
    }
};

export const putRole = async (req, res) => {
    try {
        const { uId } = req.params;
        const role = req.body;
        console.log('Params:', req.params);
        console.log('Body:', req.body);
        const response = await userService.updateRole(uId, role);
        if (!response) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json(response);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error al actualizar el Usuario" });
    }
};

export const githubAuth = (req, res) => {
    // Implementar lógica de autenticación de GitHub
};
  
export const githubCallback = (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
};

export const getCurrent = async (req, res) => {
    try {
        // Verifica si hay un usuario en la sesión
        if (req.session && req.session.user) {
            // Obtén el usuario de la sesión
            const currentUser = req.session.user;
            console.log(currentUser)
            // Envía la respuesta con el usuario actual
            res.json(currentUser);
        } else {
            // Si no hay usuario en la sesión, devuelve un error de no autenticado
            res.status(401).json({ message: "Usuario no autenticado" });
        }
    } catch (error) {
        // Si ocurre algún error, envía una respuesta de error con el mensaje de error
        res.status(400).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    const { uId } = req.params
    try {  
        const result = await userService.deleteUser(uId)
        if (result.message==="OK") {
            return res.status(200).json(result)
            } else {
                res.status(400).json(result)
            }
    } catch (error) {
        res.status(400).json({message: `No podemos eliminar al usuario - ${error}`})
    }
}

export const deleteUsers= async (req, res, next) => {
    try {
        console.log("Iniciando proceso de eliminación de usuarios inactivos");
        const result = await userService.deleteUsersLastConection();
        console.log("Resultado del proceso:", result);
        
        if (result.message==="OK") {
        return res.status(200).json(result)
        } else {
            res.status(400).json(result)
        }
    } catch (error) {
        console.error("Error en el controlador deleteUsers:", error);
        res.status(400).json({message: `No podemos eliminar los usuarios inactivos - ${error}`})
    } 
};