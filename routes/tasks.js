const express = require('express')
const router = express.Router()

const {
    getAllTasks,
    createNewTask,
    getSingleTask,
    updateTask,
    deleteTask,
} = require('../controllers/tasks')


// router.get('/')         - get all the tasks
// router.post('/')        - create a new task
// router.get('/:id')     - get single task
// router.patch('/:id')   - update task
// router.delete('/:id')  - delete task 

router.route('/').get(getAllTasks).post(createNewTask)
router.route('/:id').get(getSingleTask).patch(updateTask).delete(deleteTask)

module.exports = router