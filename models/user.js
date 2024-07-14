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

const User = mongoose.model('User', userSchema);

module.exports = User;
