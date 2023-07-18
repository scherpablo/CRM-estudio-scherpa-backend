import mongoose from "mongoose";
import bcrypt from "bcrypt";
import generateId from "../helpers/generateId.js";

const adminSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    token: {
        type: String,
        default: generateId
    },
    confirmed: {
        type: Boolean,
        default: false
    }
});

adminSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
})

adminSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;