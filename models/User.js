import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address : {
        street: { type: String, required: true },
        city: { type: String, required: true },
        zip: { type: String, required: true },
        country: { type: String, required: true }
    },    
    token : {
        type: String,
    }, 
    todos : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todo"
    }
}, {
    timestamps: true
});

//Hash password antes de guardar
userSchema.pre('save', async function (next) {
    //Si el password no ha sido modificado
    if (!this.isModified('password')) {
       next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

//Verificar password
userSchema.methods.verifyPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}



const User = mongoose.model('User', userSchema);

export default User;
