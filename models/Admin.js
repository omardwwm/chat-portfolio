const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
    isOnLine: { type: Boolean, required: true, default: true },
    isAdmin: { type: Boolean, required: true, default: true },
    password: { type: String, required: true, minlength: 4 }
});

adminSchema.pre("save", async function () {
    if (this.isModified("password")) {
        let hashedPassword = await bcrypt.hash(this.password, 10);
        console.log(hashedPassword);
        this.password = hashedPassword;
    }
})
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
