const express = require("express")
const { validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const prisma = require("../prisma/client")

const register = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array()
    })
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10)

  try {
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      }
    })
    res.status(201).send({
      success: true,
      message: "User registered successfully",
      data: user
    })
  } catch (error) {
    console.error(error)
    res.status(500).send({
      success: false,
      message: "Server error"
    })
  }
}

module.exports = { register }