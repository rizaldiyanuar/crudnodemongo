const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/InterviewDB', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./customerPO.model');
require('./deliverables.model');
require('./site.model');
require('./menu.model');