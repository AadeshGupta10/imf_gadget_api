const express = require("express")

const { handleDelete, handleGetAll, handlePatch, handlePost, handleSelfDestruct } = require("../controllers/gadget_controller");
const authenticationGuard = require("../middleware/authenticationGuard");
const gadgetIdGuard = require("../middleware/gadgetIdGuard");

const gadgetRoutes = express.Router();

gadgetRoutes
    .get("/", handleGetAll)
    .post("/", authenticationGuard, handlePost)
    .patch("{/:id}", gadgetIdGuard, authenticationGuard, handlePatch)
    .delete("{/:id}", gadgetIdGuard, authenticationGuard, handleDelete)

    .post("{/:id}/self-destruct", gadgetIdGuard, authenticationGuard, handleSelfDestruct)

module.exports = gadgetRoutes;