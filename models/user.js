const { createHmac, randomBytes } = require('crypto');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
    },
    EmailId: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    profileUrl: {
        type: String,
        default: '../public/images.png'
    },
    role: {
        type: String,
        enum: ["User", "Admin"],
        default: 'User'
    }
}, { timestamps: true });

userSchema.pre('save', function(next) {
    const user = this;
    if (user.isModified('EmailId')) {
        user.EmailId = user.EmailId.toLowerCase();
    }
    if (!user.isModified('password')) {
        return next();
    }

    const salt = randomBytes(16).toString('hex'); // Ensure salt is encoded in hex
    const hmac = createHmac('sha256', salt)
        .update(user.password)
        .digest('hex');

    user.salt = salt;
    user.password = hmac;

    next(); // Call next() to proceed with saving the user
});


userSchema.static("matchPassword", async function(emailId, password) {
    console.log("Searching for user with email:", emailId);  // Debug log

    const newUser = await this.findOne({ EmailId: emailId }); // Change emailId to EmailId

    if (!newUser) {
        console.log("No user found with email:", emailId);  // Debug log
        return { error: "No User Found" };
    }

    const newSalt = newUser.salt;
    const OriginalHashedPassword = newUser.password;

    const newHashedPassword = createHmac('sha256', newSalt)
        .update(password)
        .digest('hex');

    if (OriginalHashedPassword === newHashedPassword) {
        console.log("Password match successful for user:", emailId);  // Debug log
        return { ...newUser.toObject(), password: undefined, salt: undefined };
    }

    console.log("Password mismatch for user:", emailId);  // Debug log
    return { error: "Incorrect password" };
});

const User = mongoose.model('User', userSchema);

module.exports = User;
