import mongoose from 'mongoose';

const expedientSchema = new mongoose.Schema({
    number: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: false,
        trim: true
    },
    law: {
        type: String,
        required: false,
        trim: true
    },
    state: {
        type: String,
        required: false,
        trim: true
    },
    startDate: {
        type: Date,
        required: true,
        default: Date.now(),
        trim: true
    },
    clientRelation: {
        type: String,
        required: false,
        trim: true
    },
    admin: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    },
    client: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client"
    }
}, {
    timestamps: true
});

const expedient = mongoose.model('Expedient', expedientSchema);

export default expedient;

