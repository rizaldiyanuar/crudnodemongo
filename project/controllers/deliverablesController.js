const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Deliverables = mongoose.model('Deliverables');

router.get('/', (req, res) => {
    res.render("deliverables/addOrEdit", { 
        viewTitle: "Insert Deliverables" 
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res, log) {
    var deliverables = new Deliverables(); 
    deliverables.deliverablesID = req.body.deliverablesID;
    deliverables.customerPO = req.body.customerPO;
    deliverables.siteID = req.body.siteID;
    deliverables.email = req.body.email;
    deliverables.siteName = req.body.siteName ;
    deliverables.dType = req.body.dType;
    deliverables.install = req.body.install;
    deliverables.finish = req.body.finish;
    deliverables.save((err, doc) => {
        if (!err)
            res.redirect('deliverables/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("deliverables/addOrEdit", {
                    viewTitle: "Insert Deliverables",
                    deliverables: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Deliverables.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('deliverables/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("deliverables/addOrEdit", {
                    viewTitle: 'Update Deliverables',
                    deliverables: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Deliverables.find((err, docs) => {
        if (!err) {
            res.render("deliverables/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving deliverables list :' + err);
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
    Deliverables.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("deliverables/addOrEdit", {
                viewTitle: "Update Deliverables",
                deliverables: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Deliverables.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/deliverables/list');
        }
        else { console.log('Error in deliverables delete :' + err); }
    });
});

module.exports = router;