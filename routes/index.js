const express = require("express")
const router = express.Router()
const verifyToken = require("../middlewares/auth")
const registerController = require("../controllers/RegisterController")
const loginController = require("../controllers/LoginController")
const userController = require("../controllers/UserController")
const { validateRegister, validatorLogin } = require("../utils/validators/auth")
const validateUser = require('../utils/validators/user');

router.post("/register", validateRegister, registerController.register)
router.post("/login", validatorLogin, loginController.login)

// user routes
router.get("/admin/users", verifyToken, userController.findUsers)
router.post("/admin/users", verifyToken, validateUser, userController.createUser)

module.exports = router