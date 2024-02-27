import { UserManager } from "../dao/managers/UserManager.js";
import { createHash } from "../utils/bcrypt.js";


export const postRegister = async (req, res) => {
    res.status(201).send({ message: "User registered" });
};

export const postLogin = async (req, res) => {
    try {
        if(!req.user){
            return res.status(400).send({message: 'Error with credentials'});
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
        res.status(400).send({ error });
    }    
};  

export const postLogout = async(req, res) => {
    try {
        req.session.destroy((err) => {
            if(err){
                return res.status(500).json({message: 'Logout failed'});
            }
        });
        res.send({redirect: 'http://localhost:8080/login'});
    } catch (error) {
        console.error(error);
        res.status(400).send({error});
    }
};

export const postRecovery = async (req, res) => {
    console.log('Reached restore-password route');
    const { email, password } = req.body;
    try {
        const userManager = new UserManager();
        const user = await userManager.getUser( email );
        console.log(user);
        if (user.message !== 'OK') {
            return res.status(401).send({ message: "Unauthorized" });
        }
        user.rdo.password = createHash(password);
        await user.rdo.save();
        console.log(user.rdo.password);
        res.send({ message: "Password updated" });
    } catch (error) {
        console.error(error);
        res.status(400).send({ error });
    }
};

export const githubAuth = (req, res) => {
};
  
export const githubCallback = (req, res) => {
      req.session.user = req.user;
      res.redirect("/");
};

export const getCurrent = (req, res) => {
        res.send("Usuario actual: " + req.session.user.email);
};
