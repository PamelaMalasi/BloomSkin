const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
const User = require('../models/user');

const salt = bcrypt.genSaltSync(10);
const secret = 'asdfe45we45w345wegw345werjktjwertkjfdgfgfsgf';

//register
router.post('/register', async (req, res) => {
    const userInfo = req.body;
    try {
        if (!userInfo.username || !userInfo.email || !userInfo.password) {
            return res.status(400).send("Fields are empty");
        }

        if (userInfo.password.length < 3) {
            return res.status(400).send("Short password");
        }

        const foundUser = await User.findOne({ email: userInfo.email }).exec();
        if (foundUser) {
            return res.status(400).send("This user exists");
        }

        const newUser = new User({
            username: userInfo.username,
            email: userInfo.email,
            password: bcrypt.hashSync(userInfo.password, salt),
        });

        await newUser.save();
        return res.status(200).send("User Created");
    } catch (err) {
        console.log('Something is wrong ' + err);
        res.status(500).send("Something is wrong");
    }
});

//login
router.post('/login', async (req, res) => {
    const userData = req.body;
    const findUser = await User.findOne({ email: userData.email }).exec();

    try {
        if (findUser) {
            const passOk = bcrypt.compareSync(userData.password, findUser.password);
            if (passOk) {
                jwt.sign(
                    { email: findUser.email, id: findUser._id, role: findUser.role },
                    secret,
                    {},
                    (err, token) => {

                        if (err) return res.status(500).send("Token error");

                        res.cookie('token', token, { httpOnly: true }).json({
                            id: findUser._id,
                            email: findUser.email,
                            role: findUser.role, // 
                            username: findUser.username 
                        });

                    });
            } else {
                res.status(400).send("Invalid credentials");
            }
        } else {
            res.status(404).send("User not found");
        }
    } catch (err) {
        res.status(500).send("Something is wrong " + err);
    }
});

//get user
router.get('/', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) return res.status(401).send("Unauthorized");
        res.json(info);
    });
});

//logout
router.post('/logout', (req, res) => {
    res.cookie('token', '', { expires: new Date(0), httpOnly: true }).json('ok');
});

module.exports = router;
