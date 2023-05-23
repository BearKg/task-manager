const mongoose = require('mongoose')

const TaskScheme = new mongoose.Schema({
        name: {
                type: String,
                required: [true, 'must provide name'],
                trim: true,
                maxlength: [20, 'name can be more than 20 characters']
        }, 
        completed: {
                type: Boolean,
                default: false
        }
})

module.exports = mongoose.model('Task', TaskScheme)// invoke kết cấu của dữ liệu và sẽ tự động tao tên của mô hình quan hệ là tasks trong đó mỗi task là tuple 