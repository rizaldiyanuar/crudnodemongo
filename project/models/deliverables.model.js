const mongoose = require('mongoose');

var deliverablesSchema = new mongoose.Schema({
    deliverablesID: {
        type: String,
        required: 'This field is required.'
    },
    customerPO: {
        type: String,
    },
    siteID: {
        type: String,
    },
    email: {
        type: String
    },
    siteName: {
        type: String
    },
    dType: {
        type: String
    },
    install: {
        type: Date
    },
    finish: {
        type: Date
    },
});

// Custom validation for email
// customerPOSchema.path('email').validate((val) => {
//     emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return emailRegex.test(val);
// }, 'Invalid e-mail.');

mongoose.model('Deliverables', deliverablesSchema);