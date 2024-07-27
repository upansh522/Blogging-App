const { createHmac, randomBytes } = require('crypto');
const mongoose = require('mongoose');
const { createToken } = require('../services/user');

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
        default: '/public/images.png'
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


userSchema.static("matchPasswordAndCreateToken", async function(emailId, password) {
    const newUser = await this.findOne({ EmailId: emailId });

    if (!newUser) {
        return { error: "No user found with this email." };
    }

    const newSalt = newUser.salt;
    const OriginalHashedPassword = newUser.password;

    const newHashedPassword = createHmac('sha256', newSalt)
        .update(password)
        .digest('hex');

    if (OriginalHashedPassword !== newHashedPassword) {
        return { error: "Incorrect password" };
    }
    else if (OriginalHashedPassword===newHashedPassword)
    {        
        const token = createToken(newUser);    

        return {token,newUser};
    }
});


const User = mongoose.model('User', userSchema);

module.exports = User;
