var express = require('express');
var router = express.Router();
var listModel = [];
var id = 1;

router.post('/addList',function (req , res){
    var newlist = {
        _id:id,
        title:req.body.title,
        content:req.body.content,
        status:false
    };
    listModel.push(newlist);
    id++;
    res.json({'status':0,"msg":"sucess","data":newlist});
});
router.post('/updateList',function(req,res){
    var id = req.body.id;
    var index = listModel.findIndex(item => item._id == id);
    listModel[index].title = req.body.title;
    listModel[index].content= req.body.content;
    res.json({'status':0,"msg":"sucess"})
})
router.get('/getList',function(req,res){
    res.json(listModel);
});
router.post('/removeList',function(req,res){
    var id = req.body.id;
    var index = listModel.findIndex(item => item._id == id);
    listModel.splice(index,1);
    res.json({'status':0,"msg":"sucess"})
});

router.post('/changeStatus',function(req,res){
    var id = req.body.id;
    var index = listModel.findIndex(item => item._id == id);
    if(listModel[index].status){
        listModel[index].status = false;
    }
    else{
        listModel[index].status = true;
    }
    res.json({'status':0,"msg":"sucess"});
})
module.exports = router;
