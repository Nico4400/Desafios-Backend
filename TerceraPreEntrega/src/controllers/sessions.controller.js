import { userService } from "../dao/repositories/index.repository.js";
import { createHash } from "../utils/bcrypt.js";

export const postRegister = async (req, res) => {
    try {
        const userData = req.body;
        const result = await userService.registerUser(userData);
        res.status(201).json({ message: "User registered", data: result });
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
            email: req.user.email
        }
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

export const postRecovery = async (req, res) => {
    console.log('Reached restore-password route');
    const { email, password } = req.body;
    try {
        const user = await userService.getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        user.password = createHash(password);
        await user.save();
        res.json({ message: "Password updated" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error });
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