const express = require('express')
const Tree = require('../models/tree')
const router = express.Router()
const crypto = require('crypto');

router.get('/',(req,res)=>{
    res.send('cool buddy')
})
const parent = '63b66abe0a79d1eb66bedfe7'

async function bfs(node,store_node) {
    if(store_node.priority > node.priority){
        if(node.right === null){
            node.right = new Tree(store_node)
            await node.save();
            return;
        }else{
            const right_node = await Tree.findById(node.right._id.valueOf())
            bfs(right_node,store_node)
        }
    }else {
        if(node.left === null){
            node.left = new Tree(store_node)
            await node.save();
            return;
        }else{
            const left_node = await Tree.findById(node.left._id.valueOf())
            bfs(left_node,store_node)
        }
    }
}

router.post('/add', async (req,res)=>{
    const otp = crypto.randomInt(1, 10020290320293);
    const node = await new Tree({
        data : req.body.data,
        priority : otp
    })
    const root =  await Tree.findById(parent);
    bfs(root,node);
    node.save().then(result => {
        res.json({node : result})
    })
    .catch(err=>{
        console.log(err);
    })
})

module.exports = router