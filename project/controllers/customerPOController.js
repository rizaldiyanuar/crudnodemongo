const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const CustomerPO = mongoose.model('CustomerPO'); 

router.get('/', (req, res) => {
    res.render("customerPO/addOrEdit", { 
        viewTitle: "Insert Customer PO" 
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var customerPO = new CustomerPO(); 
    customerPO.fullName = req.body.fullName;
    customerPO.email = req.body.email;
    customerPO.price = req.body.price;
    customerPO.dType = req.body.dType;
    customerPO.save((err, doc) => {
        if (!err)
            res.redirect('customerPO/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("customerPO/addOrEdit", {
                    viewTitle: "Insert CustomerPO",
                    customerPO: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    CustomerPO.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('customerPO/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("customerPO/addOrEdit", {
                    viewTitle: 'Update CustomerPO',
                    customerPO: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    CustomerPO.find((err, docs) => {
        if (!err) {
            res.render("customerPO/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving customerPO list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
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
    CustomerPO.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("customerPO/addOrEdit", {
                viewTitle: "Update CustomerPO",
                customerPO: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    CustomerPO.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/customerPO/list');
        }
        else { console.log('Error in customerPO delete :' + err); }
    });
});

module.exports = router;