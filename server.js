import express from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';
import {register} from './Controllers/register.js';
import {signin} from './Controllers/signin.js';
import {users} from './Controllers/users.js';
import {profile} from './Controllers/profile.js';
import {image} from './Controllers/image.js';


//CONNECTING TO DATABASE USING KNEX.JS
import knex from 'knex';
// import { json } from 'body-parser';

const db = knex({
    client: 'pg',
    connection: {
        //home localhost
        host : '127.0.0.1',
        user : 'postgres',
        password : 'shaban333',
        database : 'facerecognition'
    }
});

//create hash - crypted password
const hash = (pass) =>{
    return new Promise((res, rej) => {
        bcrypt.hash(pass, 12, (err, hash) => {
            if(err){
                rej(err);
            }else{
                console.log(hash.length);
                res(hash);
            }
        })
    })
}


//compare password with hash
// hash('fore').then(res => {
//     bcrypt.compare('s', res, (err, result) => {
//         if(err){
//             console.log('ERORR:', err)
//         }else{
//             console.log('TRUE:', result);
//         }
//     })
// });

//this process.env.PORT can be any NAME, like process.env.JOX (we just create it)
// 
console.log('PORT LISTENING:', process.env.PORT);
//execute on cmd and change port: PORT=4050 node server.js

const _PORT = 4000;
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());
//security - this is necessary for client-server connection
app.use(cors())


//get initial
app.get('/', (req, res) => {
    res.json('This is working.');
})

//signin
app.post('/signin', (req, res) => {
    signin(req, res, db);
})

//OR 'CURYNG' 
//register 
app.post('/register', register(db, bcrypt))

//profile
app.get('/users', (req, res) => {
    users(req, res, db);
})

//profile
app.get('/profile/:id', (req, res) => {
    profile(req, res, db);
})

//image
app.put('/image', (req, res) => {
    image(req, res, db);
})

//listenb port
app.listen(_PORT, () => {
    console.log(`Listening port ${_PORT}`);
})
