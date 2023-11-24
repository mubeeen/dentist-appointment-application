const express = require("express");
const router = express.Router();

// import controllers
const {
	createNewAppointment,
    getAppointmentsByDate,
    getAllAppointments,
    getAppointmentsByName,
    deleteAppointment,
    updateAppointment
} = require("../controllers/appointment");

// import middlewares
const { userRegisterValidator, userById } = require("../middlewares/user");
const { verifyToken } = require("../middlewares/auth");

// api routes
router.post("/appointments", createNewAppointment);
router.get("/appointments", getAppointmentsByDate);
router.get("/appointments/name}", getAppointmentsByName);
router.get("/appointments/all", getAllAppointments);
router.delete("/appointments/:id", deleteAppointment);
router.put("/appointments/:id", () => {
    console.log("mewo")
});


module.exports = router;