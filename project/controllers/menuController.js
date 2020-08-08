const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Menu = mongoose.model('Menu'); 

router.get('/', (req, res) => {
    res.render("menu/addOrEdit", { 
        viewTitle: "Menu" 
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var menu = new Menu(); 
    menu.siteID = req.body.siteID;
    menu.email = req.body.email;
    menu.siteName = req.body.siteName;
    menu.address = req.body.address;
    menu.save((err, doc) => {
        if (!err)
            res.redirect('menu/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("menu/addOrEdit", {
                    viewTitle: "Menu",
                    menu: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Menu.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('menu/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("menu/addOrEdit", {
                    viewTitle: 'Update Menu',
                    menu: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Menu.find((err, docs) => {
        if (!err) {
            res.render("menu/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving menu list :' + err);
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
    Menu.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("menu/addOrEdit", {
                viewTitle: "Update Menu",
                menu: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Menu.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/menu/list');
        }
        else { console.log('Error in menu delete :' + err); }
    });
});

module.exports = router;