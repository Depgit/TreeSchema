const mongoose = require('mongoose')

const treeSchema = new mongoose.Schema({
    data : {
        type : String,
        require: true
    },
    priority : {
        type : String,
        require : true
    },
    left : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Tree',
        default: null
    },
    right : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Tree',
        default: null
    }
})

module.exports = mongoose.model('Tree', treeSchema)