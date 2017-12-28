const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');


router.get('/', (req, res) => {
    Blog
        .find()
        .then(blogs => {
            res.status(200).json(blogs);
        });
});

router.get("/featured", (req, res) => {
    Blog
    .where({ blogs: "featured" })
    .then(blogs => {
      res.status(200).send(blogs);
    });
  });

//   router.get('/:id',(req,res)=>{
//     Blog    
//         .findById(req.params.id)
//         .then(blogs => {
//             res.status(200).json(blogs);
//         });
// });

router.get("/:id", (req, res) => {
    var id = req.params.id;
    console.log("Checking for ID ", id);
    Blog.findById({ _id: id }, (err, record) => { 
      if (record) {
        console.log("In success");
        return res.status(200).send(record);
      } else {
        return res.status(404).send();
      }
    });
  });
// what is err and record, why findone and not findbyid
// _id referring to key and id is the id number?

// router.post('/',(req,res)=>{
//     Blogs = new Blog(req.body)  
//        //req.body instead of manually inputting first name last name etc.
//         .save()
//         .then(blogs => {
//             res.status(201).send(blogs);
//         });
//     });

// router.post("/", (req, res) => {
//     let dbUser = null;    
//   // Fetch the user from the database
//   User
//   .findById(req.body.authorId)
//   .then(user => {
//       // Store the fetched user in higher scope variable
//       dbUser = user;      
//     // Create a blog
//     const newBlog = new Blog(req.body);
//     // Bind the user to it
//     newBlog.author = user._id;
//     // Save it to the database
//     return newBlog.save();
//   })
//   .then(blog => {
//     // Push the saved blog to the array of blogs associated with the User
//     dbUser.blogs.push(blog);

//     // Save the user back to the database and respond to the original HTTP request with a copy of the newly created blog.
//     dbUser.save().then(() => res.status(201).json(blog));
// })
// });

router.post('/', (req, res) => {
    let userSpot = null;

    User
        .findById(req.query.userId)
        .then((user) => {
            userSpot = user;
            const newBlog = new Blog(req.body);
            newBlog.author = user._id;
            return newBlog.save();

        })
        .then(blog => {
            userSpot.blogs.push(blog);
            userSpot
            .save()
            .then(() => res.status(201).json(blog));
        })
});

// Why won't this work!? :(

    router.put('/:id', (req, res) => {
        Blog
            .findByIdAndUpdate(req.params.id, { $set: req.body })
            .then(blogs => res.status(204).json(blogs))
    });

    router.delete('/:id', (req,res)=>{
        Blog
        .findByIdAndRemove(req.params.id)
        .then(blogs => {
            res.status(200).json(blogs);
        });
    });

module.exports = router;