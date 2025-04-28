require("dotenv").config();

const express = require("express");
const authRoutes = require("./routes/auth_routes");
const gadgetRoutes = require("./routes/gadget_routes");

const app = express();

app.use(express.json({}));

app.get("", (req, res) => {
    res.send("Agent Server Started")
})

app.use("/auth", authRoutes)
app.use("/gadgets", gadgetRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server Started on http://localhost:${process.env.PORT}`);
})