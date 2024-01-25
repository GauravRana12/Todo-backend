const mongoose=require('mongoose');

const TaskSchema=mongoose.Schema({
    taskName:{type:String,required:true},
    description:{type:String,required:true},
    userId:{type:String,required:true}
})

const TaskModel=mongoose.model('task',TaskSchema);