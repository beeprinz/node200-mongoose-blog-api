const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
    User
        .find()
        .then(users => {
            res.status(200).json(users);
        });
});
//  '/' is the same as '/api/users'

router.get('/:id',(req,res)=>{
    User    
        .findById(req.params.id)
        .then(users => {
            res.status(200).json(users);
        });
});

router.post('/',(req,res)=>{
    console.log(req.body.firstName);
    Users = new User(req.body)  
       //req.body instead of manually inputting first name last name etc.
        .save()
        .then(users => {
            res.status(201).send(users);
        });
    });

router.put('/:id', (req,res)=>{
    User
    .findByIdAndUpdate(req.params.id)
    .then(user => {
        res.status(203).send(user);
    });
});

router.delete('/:id', (req,res)=>{
    User
    .findByIdAndRemove(req.params.id)
    .then(user => {
        res.status(204).send(user);
    });
});


module.exports = router;