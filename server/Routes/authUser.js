const express = require('express');

const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../model/User');
const { body, validationResult } = require('express-validator');

router.post('/register',

    body('email', 'email is not valid').isEmail(),
    body('firstname', 'first name must be atleaast 3 characters').isLength({ min: 3 }),
    body('lastname', 'last name must be atleaast 2 characters').isLength({ min: 2 }),
    body('password', 'password must be atleast 6 character').isLength({ min: 6 }),

    async (req, res) => {

        const { firstname, lastname, email, password } = req.body;
        const errors = validationResult(req);

        const salt = await bcrypt.genSalt(10);

        let secPass = await bcrypt.hash(password, salt);

        if (!errors.isEmpty()) {
            return res.status(401).json({ success: false, errors: errors.array() });
        }

        try {

            // if (!name || !email || !password) { return res.status(400).json({ success: false, message: 'All field is required' }) };

            const usr = await User.findOne({ 'email': email });

            if (usr) {
                return res.status(400).json({ success: false, message: 'email already exist!' });
            }

            const data = new User({
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: secPass
            });

            data.save();

            res.status(200).json({ success: true, data });
        } catch (error) {
            // console.log(error);
            res.status(400).json({ success: false, message: error.message });
        }
    })


// Login 
router.post('/login',
    body('email', 'email is not valid').isEmail(),
    body('password', 'password must be atleast 6 character').isLength({ min: 6 }),
    async (req, res) => {

        const { email, password } = req.body;

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(401).json({ success: false, errors: errors.array() });
        }
        console.log(password);

        try {

            if (!email || !password) { return res.status(400).json({ success: false, message: 'All field is required' }) };

            // res.status(200).json({ success: true, data: 'asd', email });

            const data = await User.findOne({ email });

            if (!data) {
                return res.status(400).json({ success: false, message: 'Please put valid credintials!' });
            }

            const compPass = await bcrypt.compare(password, data.password);

            if (!data) {
                return res.status(400).json({ success: false, message: 'User not found!' });
            }

            if (!compPass) {
                return res.status(400).json({ success: false, message: 'Please put valid credintials!' });
            }

            return res.status(200).json({ success: true, data });

        } catch (error) {
            console.log(error);
            res.status(400).json({ success: false, message: error.message });

        }
    })

module.exports = router