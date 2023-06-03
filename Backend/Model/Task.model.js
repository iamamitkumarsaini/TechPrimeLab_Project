const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    user_id:String,
    title: String,
    reason: String,
    type: String,
    divison: String,
    category: String,
    priority: String,
    department: String,
    start_date: String,
    end_date: String,
    location: String,
    status: {
        type: String,
        enum: ['Registered', 'Running', 'Cancelled', 'Closed'],
        default: "Registered"
    }
},{
    versionKey: false
})


const TaskModel = mongoose.model("task", taskSchema);


module.exports = { TaskModel };