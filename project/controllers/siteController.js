const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Site = mongoose.model('Site'); 

router.get('/', (req, res) => {
    res.render("site/addOrEdit", { 
        viewTitle: "Insert Site" 
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var site = new Site(); 
    site.siteID = req.body.siteID;
    site.email = req.body.email;
    site.siteName = req.body.siteName;
    site.address = req.body.address;
    site.save((err, doc) => {
        if (!err)
            res.redirect('site/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("site/addOrEdit", {
                    viewTitle: "Insert Site",
                    site: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Site.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('site/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("site/addOrEdit", {
                    viewTitle: 'Update Site',
                    site: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Site.find((err, docs) => {
        if (!err) {
            res.render("site/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving site list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'siteID':
                body['siteIDError'] = err.errors[field].message;
                break;
            // case 'email':
            //     body['emailError'] = err.errors[field].message;
            //     break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Site.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("site/addOrEdit", {
                viewTitle: "Update Site",
                site: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Site.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/site/list');
        }
        else { console.log('Error in site delete :' + err); }
    });
});

module.exports = router;