import mongoose from 'mongoose';

const clientsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    cuit: {
        type: String,
        required: false,
        trim: true
    },
    birthdate: {
        type: Date,
        required: false,
        default: Date.now(),
        trim: true
    }, 
    email: {
        type: String,
        required: false,
        trim: true
    }, 
    phone: {
        type: String,
        required: false,
        trim: true
    },
    address: {
        type: String,
        required: false,
        trim: true
    },
    location: {
        type: String,
        required: false,
        trim: true
    },
    postalCode: {
        type: String,
        required: false,
        trim: true
    },
    anses: {
        type: String,
        required: false,
        trim: true
    },
    afip: {
        type: String,
        required: false,
        trim: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    }
}, {
    timestamps: true,
});

const client = mongoose.model('Client', clientsSchema);

export default client;