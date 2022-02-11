var express = require('express');
var router = express.Router();
var listModel = require('../models/listModel.js');

router.post('/addList',function (req , res){
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000/api/addList');
    var newlist = new listModel({
        title:req.body.title,
        content:req.body.content,
        status:false
    });
    newlist.save(function(err,data){
        if(err){
            res.json({'status':1,"msg":"error"});
            console.log('add error');
        }else{
            res.json({'status':0,'msg':'success',data:data});
            console.log('add sucess');
        }
    });
});
router.post('/updateList',function(req,res){
    res.set('Access-Control-Allow-Origin', '*');
    var id = req.body.id;
    listModel.findById(id,function(err,data){
        if(err){
            console.log(err);
            res.json({'status':1,'msg':'error'});
        }
        else{
            data.title = req.body.title;
            data.content = req.body.content;
            data.save(function(err){
                if(err){
                    console.log(err);
                    res.json({'status':1,'msg':'error'});
                }else{
                    res.json({'status':0,'msg':'success'});
                }
            });
        }
    });
});

router.get('/getList',function(req,res){
    res.set('Access-Control-Allow-Origin', '*');
    listModel.find(function(err,data){
        if(err){console.log(err);
        }
        res.json(data);
    });
});
router.post('/removeList',function(req,res){
    res.set('Access-Control-Allow-Origin', '*');
    var id = req.body.id;
    listModel.remove({'_id':id},function(err,data){
        if(err){
            console.log(err);
            res.json({'status':1,'msg':"error"});
        }
        else{
            res.json({'status':0,'msg':"success"});
        }
    });
    /*var index = listModel.findIndex(item => item._id == id);
    listModel.splice(index,1);
    res.json({'status':0,"msg":"sucess"})*/
});

router.post('/changeStatus',function(req,res){
    res.set('Access-Control-Allow-Origin', '*');
    var id = req.body.id;
    listModel.findById(id,function(err,data){
        if(err){
            console.log(err);
            res.json({'status':1,'msg':'error'});
        }
        else{
            if(data.status){
                data.status = false;
            }
            else{
                data.status = true;
            }
            data.save(function(err){
                if(err){
                    console.log(err);
                    res.json({'status':1,'msg':"error"});
                }else{
                    res.json({'status':0,'msg':"success"});
                }
            });
            /*res.json({'status':1,'msg':"success"});*/
        }
    });
    /*var index = listModel.findIndex(item => item._id == id);
    if(listModel[index].status){
        listModel[index].status = false;
    }
    else{
        listModel[index].status = true;
    }
    res.json({'status':0,"msg":"sucess"});*/
});
module.exports = router;
