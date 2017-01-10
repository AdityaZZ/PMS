module.exports = {

    //用户表
    user: {
        name: {type: String, required: true},
        password: {type: String, required: true},
        sex: {type: String,default:"保密"},
        age: {type: Number,default:0},
        phone_number: {type: Number,default:0},
        creation_date: {type: Date, default: Date.now()},
        last_update_date: {type: Date, default: Date.now()},
        comments: {type: String,default:""}
    },

    //代办事项表
    todo_items: {
        user_id:{type: String},
        todo_item_title: {type: String},
        todo_item_content: {type: String},
        priority: {type: String, default: "low",enum:['low','medium','high']},
        creation_date: {type: Date,default: Date.now()},
        last_update_date: {type: Date, default: Date.now()},
        comments: {type: String}
    }

};
