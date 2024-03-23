const UserRegistration = require('../models/RegisterSchema')
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const multer = require('multer')
var nodemailer = require('nodemailer')
exports.testController = (req, res) => {
    res.send('hello from test controller')
}

var id1 = ''

exports.photographerLogin = async (req, res) => {
    const { username, password,roleId } = req.body
    const userDB = await UserRegistration.findOne(
        { username },
        { _id: 1, username: 1, password:1, roleId:1 }
    )
    id1 = userDB._id
    if (userDB && password == userDB.password && roleId==userDB.roleId) {
        let Token = jwt.sign({ userDB }, 'jeth445', {
            expiresIn: '2h',
        })
        res.cookie('Token', Token)
        console.log(Token)
        res.status(200).send()
    } else {
        res.status(404).send()
    }
}



exports.photographerRegister = async (req, res) => {
      console.log(req.body)
        const { username, password, email, roleId } = req.body

        const userDB = await UserRegistration.findOne({ username })

        if (userDB) {
            res.send('Username already exists')
        } else {
            const Registration = new UserRegistration({
                username,
                password,
                email,
                roleId
            })
                .save()
                .then((result) => {
                    if (result) {
                        console.log("jjjjjjjj")
                        var transporter = nodemailer.createTransport({
                            host: 'smtp.gmail.com',
                            port: 465,
                            secure: true,
                            auth: {
                                user: 'manikumar81796@gmail.com',
                                pass: 'cnnsapjgbrilpywm',
                            },
                        })

                        var mailOptions = {
                            from: 'manikumar81796@gmail.com',
                            to: email,
                            subject: 'Sending Email using Node.js',
                            html: `<div class="card"><h1>PHOTOGRAPHERS HUB</h1>
            <div>
            <p>Thank you for registering....</p>
            <p>Now you became a member of photographers hub</p>
            </div>
            </div>`,
                        }

                        transporter.sendMail(
                            mailOptions,
                            function (error, info) {
                                if (error) {
                                    console.log(error)
                                } else {
                                    console.log('Email sent: ' + info.response)
                                }
                                console.log(result)
                                res.json({ data: result })
                            }
                        )
                    } else console.log(err)
                })
        }
    }

// app.post('/register', upload.single('image'), async (req, res) => {

// })
