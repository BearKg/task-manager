const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const {createCustomError, customAPIError} = require('../errors/custom-error')

const getAllTasks = asyncWrapper(async (req, res) => {
        const tasks = await Task.find({})
        res.status(201).json({tasks}) //{task: task} shorthand es6: {task} 
})

const createNewTask = asyncWrapper(async (req, res) => {
        const task = await Task.create(req.body) // thêm dữ liệu vào tasks
        res.status(201).json({task})
})

const getSingleTask = asyncWrapper(async (req, res, next) => {
        const {id: taskID} = req.params // gán giá trị id trong req.param vào biến taskID -> giá trị id sẽ rõ ràng 
        const task = await Task.findOne({_id: taskID}) 
        if (!task) {
            return next(createCustomError(`no task with id: ${taskID}`, 404))
             // sẽ có một số lỗi cú pháp mongoose sẽ xử lý và cho ra lỗi 500. Vd: nhập ko đủ kí tự id
        }
        res.status(201).json({task})
})

const updateTask = asyncWrapper(async (req, res, next) => {
        const {id: taskID} = req.params // gán giá trị id trong req.param vào biến taskID -> giá trị id sẽ rõ ràng 
        const task = await Task.findOneAndUpdate({_id: taskID}, req.body, {
            new: true,
            runValidators:true
        }) 
        if (!task) {
            return next(createCustomError(`no task with id: ${taskID}`, 404)) // sẽ có một số lỗi cú pháp mongoose sẽ xử lý và cho ra lỗi 500. Vd: nhập ko đủ kí tự id
        }
        res.status(201).json({task})
})

const deleteTask = asyncWrapper(async (req, res, next) => {
        const {id: taskID} = req.params // gán giá trị id trong req.param vào biến taskID -> giá trị id sẽ rõ ràng 
        const task = await Task.findOneAndDelete({_id: taskID}) 
        if (!task) {
            return next(createCustomError(`no task with id: ${taskID}`, 404)) // sẽ có một số lỗi cú pháp mongoose sẽ xử lý và cho ra lỗi 500. Vd: nhập ko đủ kí tự id
        }
        res.status(201).json({task})
})

module.exports = {
    getAllTasks,
    createNewTask,
    getSingleTask,
    updateTask,
    deleteTask,
}

/**
 * Mongoose queries are not promises. They have a .then() function for co 
 * and async/await as a convenience. However, unlike promises, calling a 
 * query's .then() can execute the query multiple times.
 */

/**
 * patch chì thây đổi các giá trị theo req.body và vần giữ nguyên các giá trị còn lại
 * put sẽ thây thế giá trị thành req.body và sẽ lược bỏ giá trị nằm bên ngoài req.body mà không được validate
 */