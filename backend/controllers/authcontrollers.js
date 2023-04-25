const USER = require('../models/usermodel')
const generatetoken = require('../Jwt');
const asyncHandler = require("express-async-handler");

exports.register = asyncHandler(async (req, res) => {
    const { name, email, password, avatar } = req.body;
    if (!email || !password || !name) {
        res.status(400).json({
            message: 'username, password and email is required.'
        });
    }

    const OldUser = await USER.findOne({ email: email })
    if (OldUser) {
        res.status(400).json({
            message: `user with email ${req.body.email} already exists.`
        });
    }

    const user = await USER.create({
        name,
        email,
        password,
        avatar
    });

    res.status(200).json({
        success: true,
        user,
        token: generatetoken(user._id)
    })
})

// exports.login = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const AlreadyExists = await USER.findOne({ email: email })
//         if (!AlreadyExists) {
//             res.status(400).json({
//                 message: `user with email ${req.body.email} doesn't exists.`
//             });
//         }

//     } catch (error) {
//         throw error
//     }
// }