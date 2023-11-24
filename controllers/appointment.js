const Appointment = require("../models/appointment");
const jwt = require("jsonwebtoken");
require("dotenv").config();
var _ = require("lodash");

exports.createNewAppointment = async (req, res) => {
    let data = !_.isUndefined(req) && !_.isUndefined(req.body) ? req.body : null;
    
    const professional = data.professional;
    const clientName = data.clientName;
    const appointmentTime = data.appointmentTime;
    const duration = data.duration;
    const reason = data.reason;

    const appointmentObj = new Appointment({
        professional: professional, 
        clientName: clientName, 
        appointmentTime: appointmentTime, 
        duration: duration,
        reason: reason,
    });
    
	await appointmentObj.save();

    res.status(201).json({
		message: "Your appointment has been created successfully",
	});

};

exports.getAppointmentsByDate = async (req, res) => {
    try {
        const date = req.query.date;

        const appointments = await Appointment.find({
            appointmentTime: {
                $gte: new Date(`${date}T00:00:00Z`),
                $lt: new Date(`${date}T23:59:59Z`),
            },
        });

        res.status(200).json(appointments);
    } catch (error) {
        console.error('Error getting appointments by date:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getAppointmentsByName = async (req, res) => {
	try {
        // Extract the client name from the query parameters
        const clientName = req.query.clientName;

        // Validate the clientName here if needed

        // Use Mongoose to query appointments for the specified client name
        const appointments = await Appointment.find({
            clientName: clientName,
        });

        res.status(200).json(appointments);
    } catch (error) {
        console.error('Error getting appointments by client name:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getAllAppointments = async (req, res) => {
	try {
        // Use Mongoose to query all appointments
        const appointments = await Appointment.find();

        res.status(200).json(appointments);
    } catch (error) {
        console.error('Error getting all appointments:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteAppointment = async (req, res) => {
	try {
        // Extract the appointment ID from the request parameters
        const appointmentId = req.params.id;


        // Use Mongoose to find and remove the appointment by ID
        const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);

        // Check if the appointment was found and deleted
        if (!deletedAppointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        res.status(200).json({
            message: 'Appointment deleted successfully',
            deletedAppointment: deletedAppointment,
        });
    } catch (error) {
        console.error('Error deleting appointment by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateAppointment = async (req, res) => {
	try {
        // Extract appointment ID from the request parameters
        const appointmentId = req.params.id;

        console.log("mujsb efsdj fsdj",req)

        // Extract updated data from the request body
        const updatedData = req.body;

        // Validate the updated data if needed

        // Use Mongoose to find the appointment by ID and update it
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            appointmentId,
            { $set: updatedData },
            { new: true }
        );

        if (!updatedAppointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        res.status(200).json(updatedAppointment);
    } catch (error) {
        console.error('Error updating appointment by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};







