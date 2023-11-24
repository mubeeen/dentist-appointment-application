const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const AppointmentSchema = new Schema ({
        professional: {
            type: String,
            require: true,
        },
        clientName: {
            type: String, 
            require: true,
        },
        appointmentTime: {
            type: Date, 
            require: true,
        },
        duration: {
            type: Number,
            require: true,
        },
        reason: {
            type: String,
            require: true,
        },
        salt: String,
},{
    timestamps: true,
});

AppointmentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Appointment', AppointmentSchema)