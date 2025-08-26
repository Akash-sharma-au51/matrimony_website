import type { Request, Response } from 'express'
const Users = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerUser = async (req: Request, res: Response) => {
    const { fullname, email, password, phonenumber } = req.body as unknown as {
        fullname: string
        email: string
        password: string
        phonenumber: string
    }

    try {
        if (!fullname || !email || !password || !phonenumber) {
            return res.status(400).json({ message: 'missing required fields', success: false })
        }

        const normalizedEmail = email.trim().toLowerCase()
        const normalizedFullname = fullname.trim()
        const normalizedPhone = String(phonenumber).trim()

        const existing = await Users.findOne({ email: normalizedEmail })
        if (existing) {
            return res.status(400).json({ message: 'user already exists', success: false })
        }

        if (password.length < 8) {
            return res.status(400).json({ message: 'password must be at least 8 characters', success: false })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await Users.create({
            fullname: normalizedFullname,
            email: normalizedEmail,
            password: hashedPassword,
            phonenumber: normalizedPhone,
        })

        const token = jwt.sign(
            { id: newUser._id.toString(), email: newUser.email },
            process.env.JWT_SECRET || 'default_secret',
            { expiresIn: '1h' }
        )

        return res.status(201).json({
            message: 'User registered successfully',
            success: true,
            token,
        })
    } catch (err) {
        return res.status(500).json({ message: 'internal server error', success: false })
    }
}

const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body as unknown as {
        email: string
        password: string
    }

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'missing email or password', success: false })
        }

        const normalizedEmail = email.trim().toLowerCase()
        const user = await Users.findOne({ email: normalizedEmail })
        if (!user) {
            return res.status(404).json({ message: 'user not found', success: false })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: 'invalid credentials', success: false })
        }

        const token = jwt.sign(
            { id: user._id.toString(), email: user.email },
            process.env.JWT_SECRET || 'default_secret',
            { expiresIn: '1h' }
        )

        return res.status(200).json({
            message: 'Login successful',
            success: true,
            token,
        })
    } catch (error) {
        return res.status(500).json({ message: 'internal server error', success: false })
    }
}

const logoutUser = async(req:Request,res:Response) =>{
    try {
        res.clearCookie('token').status(201).json({
            message:"user logged out successfully",
            success:true
        })
        
    } catch (error) {
        res.status(500).json({
            message:"internal server error",
            success:false
        })
    }
}

module.exports = { registerUser, loginUser, logoutUser }




