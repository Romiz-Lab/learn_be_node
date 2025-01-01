const express = require("express")
const prisma = require("../prisma/client")
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs")

const findUsers = async (req, res) => {
  try {
    // get all user from database
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
      orderBy: {
        id: "desc",
      },
    })

    // send response
    res.status(200).send({
      success: true,
      message: "Users fetched successfully",
      data: users
    })
  } catch (error) {
    console.error(error)
    res.status(500).send({
      success: false,
      message: "Server error"
    })
  }
}

// create user
const createUser = async (req, res) => {
  // periksa validasi
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: "Validation error",
      errors: errors.array(),
    })
  }

  // hash password
  const hashedPassword = await bcrypt.hash(req.body.password, 10)

  try {
    // insert data
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      },
    })
    // send response
    res.status(201).send({
      success: true,
      message: "User created successfully",
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

module.exports = { findUsers, createUser }