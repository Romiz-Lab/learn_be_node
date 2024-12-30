const express = require("express")
const prisma = require("../prisma/client")

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

module.exports = { findUsers }