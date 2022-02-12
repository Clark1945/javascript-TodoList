var mongoose = require('mongoose');//匯入套件
mongoose.connect('mongodb://localhost:27017/todo',{useNewUrlParser:true});//連結robo3T設定的連線port號

var listSchema = new mongoose.Schema({
    title:String,
    content:String,
    status:Boolean
});//定義資料表格式
listSchema.set('collection','list');//定義資料表名稱
var model = mongoose.model('list',listSchema); //將修改寫入mongodb中
module.exports = model;  //模組化匯出