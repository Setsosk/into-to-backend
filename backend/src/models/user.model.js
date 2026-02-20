import mongoose, {Schema} from "mongoose";

//compare password
import bcrypt from "bcrypt";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minlength: 1,
        maxlength: 50,
    },

    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 10,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
       
    },

}, 

   {
        timestamps: true

}
);

//before saving any password we need to hash it
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
   
    next();
});

//compare password method
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema)