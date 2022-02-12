var express = require('express');//使用Express
var router = express.Router(); //建立Express的Router
var listModel = require('../models/listModel.js');

router.post('/addList',function (req , res){//設定路由
    res.set('Access-Control-Allow-Origin', '*'); //解決ACAO問題
    var newlist = new listModel({ //傳入資料庫
        title:req.body.title,
        content:req.body.content,
        status:false
    });
    newlist.save(function(err,data){
        if(err){
            res.json({'status':1,"msg":"error"}); //回傳訊息
            console.log('add error');
        }else{
            res.json({'status':0,'msg':'success',data:data});
            console.log('add sucess');  //回傳訊息
        }
    });
});
router.post('/updateList',function(req,res){
    res.set('Access-Control-Allow-Origin', '*');
    var id = req.body.id;
    listModel.findById(id,function(err,data){  //尋找資料
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
    listModel.find(function(err,data){  //從DB get資料
        if(err){console.log(err);
        }
        res.json(data);
    });
});
router.post('/removeList',function(req,res){
    res.set('Access-Control-Allow-Origin', '*');
    var id = req.body.id;
    listModel.remove({'_id':id},function(err,data){  //進行移除
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
