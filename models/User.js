import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: false
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
        street: { type: String,         required: false
        },
        city: { type: String,         required: false
        },
        zip: { type: String,         required: false
        },
        country: { type: String,         required: false
        }
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
