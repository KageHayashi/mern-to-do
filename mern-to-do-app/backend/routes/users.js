const router = require('express').Router();
let User = require('../models/user.model');

// The route '/' means the current root route.
// So we're defining the behaviour for the users/ endpoint of our entire app
router.route('/').get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
})

// users/add behaviour
router.route('/add').post((req, res) => {
    const username = req.body.username;

    const newUser = new User({username});
    
    newUser.save()
    .then(() => res.json(`User ${username} added!`))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Route to View a single user with path variable 'id'
router.route('/:id').get((req, res) => {
    // Find the ID and respond with the JSOn data of the user
    User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
})

// Route to Delete a single user with path variable 'id'
router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then(user => res.json(`User '${user.username}' deleted.`))
    .catch(err => res.status(400).json('Error: ' + err));
})

// Route to Update a single user with path variable 'id'
router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
    .then(user => {
        user.username = req.body.username;
        
        user.save()
        .then(user => res.json(`User '${user.username}' updated!`))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;