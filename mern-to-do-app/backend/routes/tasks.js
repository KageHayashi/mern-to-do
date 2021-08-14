const router = require('express').Router();
let Task = require('../models/task.model');

// The route '/' means the current root route.
// So we're defining the behaviour for the tasks/ endpoint of our entire app
router.route('/').get((req, res) => {
    Task.find()
    .then(tasks => res.json(tasks))
    .catch(err => res.status(400).json('Error: ' + err));
})

// tasks/add behaviour
router.route('/add').post((req, res) => {
    // Get the body data (which should be JSON)
    const username = req.body.username;
    const description = req.body.description;
    const date_created = Date.parse(req.body.date_created);
    const due_date = Date.parse(req.body.due_date);

    // Create new task using the request data
    const newTask = new Task({
        username,
        description,
        date_created,
        due_date,
    });
    
    // Save the task and catch errors
    newTask.save()
    .then(() => res.json(`Task added!`))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Route to View a single tasks with path variable 'id'
router.route('/:id').get((req, res) => {
    // Find the ID and respond with the JSOn data of the task
    Task.findById(req.params.id)
    .then(task => res.json(task))
    .catch(err => res.status(400).json('Error: ' + err));
})

// Route to Delete a single task with path variable 'id'
router.route('/:id').delete((req, res) => {
    Task.findByIdAndDelete(req.params.id)
    .then(task => res.json(`Task '${task.description}' deleted.`))
    .catch(err => res.status(400).json('Error: ' + err));
})

// Route to Update a single task with path variable 'id'
router.route('/update/:id').post((req, res) => {
    Task.findById(req.params.id)
    .then(task => {
        username = req.body.username;
        description = req.body.description;
        due_date = Date.parse(req.body.date);

        if (username) {task.username = username;}
        if (description) {task.description = description;}
        if (due_date) {task.due_date = due_date;}

        task.save()
        .then(task => res.json(`Task '${task.description}' updated!`))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;