import passport from 'passport';
import local from 'passport-local';
import { UserManager } from '../dao/managers/UserManager.js';
import { userModel } from '../dao/models/user.model.js';
import { createHash, isValidPassword } from '../utils/bcrypt.js';
import { Strategy as GithubStrategy } from 'passport-github2';

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use('register', new LocalStrategy(
        {passReqToCallback: true, usernameField: 'email'},
        async (req, username, password, done) => {
            const {first_name, last_name, email, age} = req.body;
            try {
                const userManager = new UserManager();
                const user = await userManager.getUser(username);
                if(user.message === 'OK'){
                    console.log('User already exists');
                    return done(null, false);
                }
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password)
                }

                const result = await userManager.addUser(newUser);
                console.log(result);
                return done(null, result);
            } catch (error) {
                return done('Error to obtain the user ' + error);
            }
        }
    ));

    passport.use('login', new LocalStrategy(
        {usernameField: 'email'},
        async (username, password, done) => {
            try {
                const userManager = new UserManager();
                const user = await userManager.getUser(username);
                if(user.message !== 'OK'){
                    console.log('User doenst exists');
                    return done(null, false);
                }
                if(!isValidPassword(user, password)){
                    return done(null, false);
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.use('github', new GithubStrategy(
        {
            clientID: 'Iv1.d65b90205bcd0620',
            callbackURL: 'http://localhost:8080/api/sessions/githubcallback',
            clientSecret: '0fecf506997bfb3eaa67af187294671b5d4af1c2'
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log({profile});
                const userManager = new UserManager();
                const user = await userManager.getUser(profile._json.email);
                if(user.message !== 'OK'){
                    const newUser = {
                        first_name: profile._json.name.split(' ')[0],
                        last_name: profile._json.name.split(' ')[1],
                        age: 18,
                        email: profile._json.email,
                        password: 'GithubGenerated'
                    }
                    const result = await userManager.addUser(newUser);
                    return done(null, result);
                }
                return done(null, user);
            } catch (error) {
                
                return done(error);
            }
        }
    ));


    passport.serializeUser((user, done) => {
        console.log('Serializing user:', user);
        done(null, user.rdo._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findOne({_id: id});
        console.log('Deserialized user:', user);
        done(null, user);
    });
}

export default initializePassport;