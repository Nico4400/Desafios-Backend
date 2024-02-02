import { UserManager } from "../dao/managers/UserManager.js";
import { Router } from "express";
import { createHash } from "../utils/bcrypt.js";
import passport from "passport";


const sessionsRouter = Router();

sessionsRouter.post('/register',
    passport.authenticate("register", { failureRedirect: "/failregister" }),
    async (req, res) => {
        res.status(201).send({ message: "User registered" });
    }
);

// sessionsRouter.post('/register', async (req, res) => {
//     const { first_name, last_name, email, age, password } = req.body;
//     try {
//         const userManager = new UserManager();
//         const user = await userManager.addUser({
//             first_name,
//             last_name, 
//             age, 
//             email, 
//             password: createHash(password)
//         });
//         req.session.user = user;
//         res.redirect('/');
//     } catch (error) {
//         console.error(error);
//         res.status(400).send({error});
//     }
// });

// sessionsRouter.post('/login', async(req, res) => {
//     const { email, password } = req.body;
//     try {
//         const userManager = new UserManager();
//         const user = await userManager.getUser(email);
//         if(user.message !== "OK"){
//             return res.status(404).json({message: 'User not found'});            
//         }        
//         if(user.rdo.password !== password){            
//             return res.status(401).send({message: 'Invalid credentials'});
//         }
//         if(email === 'adminCoder@coder.com' && password === 'adminCod3r123'){
//             req.session.admin = true;
//         }
//         req.session.user = user;
//         res.redirect('/');
//     } catch (error) {
//         res.status(400).send({error});
//     }
// });

sessionsRouter.post('/login',
    passport.authenticate("login", { failureRedirect: "/faillogin" }),
    async (req, res) => {
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
    }
);
  

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

sessionsRouter.post('/restore-password', async (req, res) => {
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
});

sessionsRouter.get('/github',
    passport.authenticate("github", { scope: ["user:email"] }),
    (req, res) => {}
);
  
sessionsRouter.get('/githubcallback',
    passport.authenticate("github", { failureRedirect: "/login" }),
    (req, res) => {
      req.session.user = req.user;
      res.redirect("/");
    }
);

export default sessionsRouter;