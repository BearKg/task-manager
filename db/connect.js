const mongoose = require('mongoose')

const connectDB = (url) => {
    return mongoose.connect(url, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify:false,
            useUnifiedTopology:true
        })
} // đưa mongoose.connect vào trong function riêng để khi connectionString có sai thì app không bị crash
   
module.exports = connectDB 

