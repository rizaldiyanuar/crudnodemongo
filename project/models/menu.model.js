const mongoose = require('mongoose');

var menuSchema = new mongoose.Schema({
    siteID: {
        type: String,
        required: 'This field is required.'
    },
    email: {
        type: String
    },
    siteName: {
        type: String
    },
    address: {
        type: String
    }
});

// Custom validation for email
// customerPOSchema.path('email').validate((val) => {
//     emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return emailRegex.test(val);
// }, 'Invalid e-mail.');

mongoose.model('Menu', menuSchema);