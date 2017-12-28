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

// router.get('/:id',(req,res)=>{
//     User    
//         .findById(req.params.id)
//         .then(users => {
//             res.status(200).json(users);
//         });
// });

router.get("/:id", (req, res) => {
    var id = req.params.id;
    console.log("Checking for ID ", id);
    User.findById({ _id: id }, (err, record) => {
      if (record) {
        console.log("In success", record.lastName);
        return res.status(200).send(record);
      } else {
        return res.status(404).send();
      }
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

// router.put('/:id', (req,res)=>{
//     User
//     .findByIdAndUpdate(req.params.id)
//     .then(user => {
//         res.status(203).send(user);
//     });
// });
// // looks like it works but does not pass


router.put('/:id', (req, res) => {
    User
        .findByIdAndUpdate(req.params.id, { $set: req.body })
        .then(users => res.status(204).json(users))
});

router.delete('/:id', (req,res)=>{
    User
    .findByIdAndRemove(req.params.id)
    .then(users => {
        res.status(200).json(users);
    });
});

module.exports = router;