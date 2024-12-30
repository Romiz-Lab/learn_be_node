const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const router = require("./routes")

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false  }))
app.use(bodyParser.json())

const port = 5031

app.get("/", (req, res) => {
  res.send("Hello, World! I'm a simple Node.js server")
})

app.use("/api", router)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})