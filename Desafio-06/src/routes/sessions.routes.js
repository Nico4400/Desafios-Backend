import { Router } from "express";
import { UserManager } from "../dao/managers/UserManager.js";


const sessionsRouter = Router();

sessionsRouter.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    try {
        const userManager = new UserManager();
        const user = await userManager.addUser({
            first_name, last_name, age, email, password
        });
        req.session.user = user;
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(400).send({error});
    }
});

sessionsRouter.post('/login', async(req, res) => {
    const { email, password } = req.body;
    try {
        const userManager = new UserManager();
        const user = await userManager.getUser(email);
        if(user.message !== "OK"){
            return res.status(404).json({message: 'User not found'});            
        }        
        if(user.rdo.password !== password){            
            return res.status(401).send({message: 'Invalid credentials'});
        }
        if(email === 'adminCoder@coder.com' && password === 'adminCod3r123'){
            req.session.admin = true;
        }
        req.session.user = user;
        res.redirect('/');
    } catch (error) {
        res.status(400).send({error});
    }
});

sessionsRouter.post('/logout', async(req, res) => {
    try {
        req.session.destroy((err) => {
            if(err){
                return res.status(500).json({message: 'Logout failed'});
            }
        });
        res.send({redirect: 'http://localhost:8080/login'});
    } catch (error) {
        res.status(400).send({error});
    }
});

export default sessionsRouter;