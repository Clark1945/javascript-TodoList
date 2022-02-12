var todolist=[];
var id=1;
//不會用到

function addList(){
    var _title=$("#title").val();
    var _message=$("#message").val();
   // 取得標題+內容

    if(_title == "" || _message == ""){  //NotNullCheck
        alert("請輸入標題或內容！");
    }
    else{
        $.post("http://localhost:3000/api/addList",{'title':_title,'content':_message},function(res){  //Post呼叫，傳入標題+內容
        newList(res.data);//顯示
        
        //清空欄位
        $("#title").val("");
        $("#message").val("");
        });
        /*var newtodo = {
            "_id":id,
            "title":_title,
            "content":_message,
            "status":false
        };
        todolist.push(newtodo);
        newList(newtodo); //自定義function?
        id++;
*/
        
    }
}

function newList(data){
    //var status = (data.status)?"checked":"";
    var titleClass = (data.status)?"title2":"title";
    var messageClass = (data.status)?"message2":"message";
    var editClass = (data.status)?"none":"inline";
    //CSS調整樣式

//data.id未設定，亂碼？
    var content = `
    <div class="content" id="${data._id}">
        <div class="${titleClass}">
            <input type="checkbox" onclick="changeStatus('${data._id}',this)"/>
            <text id ="title${data._id}">${data.title}</text>
            <button class ="i_btn" onclick = "removeList('${data._id}')">
                刪除
            </button>
            <button class="i_btn" id="edit${data._id}" style = "display:${editClass}" onclick="editList('${data._id}')">
                修改
            </button>
            <button class="i_btn" id="update${data._id}" style = "display:none" onclick="updateList('${data._id}')"> 
                確認
            </button>
        </div>
        <div class="${messageClass}">
            <text id ="message${data._id}">${data.content}</text>
        </div>
    </div>`//新增的todolist項目
    $("body").append(content);//加入當前網頁
}

function editList(id){
    $('#edit'+id).css("display","none");//修改鈕消失
    $('#update'+id).css("display","inline");  //更新鈕出現

    var input = document.createElement("input");//建立Input標籤
    input.type = "text";//Input類型設定為TEXT
    input.id = "edit_title"+id;  //編輯用ID
    input.value = $("#title"+id).text();  //取得值
    input.size = Math.max(20/4*3,4);  //設定Input欄寬度

    $("#title"+id).css("display","none"); //隱藏
    $("#title"+id).parent().append(input);  //加入修改後的項目

    var message_input = document.createElement("input");
    message_input.type = "text";
    message_input.id = "edit_message"+id;
    message_input.value = $('#message'+id).text();
    message_input.size = Math.max(50/4*3,4);  

    $('#message'+id).css("display","none"); 
    $('#message'+id).parent().append(message_input);  //加入Input text
}

function updateList(id){
    var title = $("#edit_title"+id).val();
    var message = $("#edit_message"+id).val(); //取修改後的值

    $.post('http://localhost:3000/api/updateList',{'id':id,'title':title,'content':message},function(res){
        if(res.status==0){
            $('#title'+id).text(title);
            $('#message'+id).text(message); //放入值
        
            $('#edit'+id).css("display","inline");
            $('#update'+id).css("display","none");  //Button還原
        
            $('#title'+id).css("display","inline");  //顯示文字模式的標題與內容
            $('#message'+id).css("display","inline");
        
            $('#edit_title'+ id).remove();
            $('#edit_message'+id).remove(); //移除修改用Input
        }
    });
 /*   $('#title'+id).text(title);
    $('#message'+id).text(message); //放入值

    $('#edit'+id).css("display","inline");
    $('#update'+id).css("display","none");  //Button的還原

    $('#title'+id).css("display","inline");  //顯示文字模式的標題與內容
    $('#message'+id).css("display","inline");

    $('#edit_title'+ id).remove();
    $('#edit_message'+id).remove(); //editList的Input text
*/
}

function removeList(id){
    $.post('http://localhost:3000/api/removeList',{'id':id},
    function(res){
        if (res.status==0){
            $("#"+id).remove();  //刪除
        }
    });
 /*   var index= todolist.findIndex(element => element._id == id);
    todolist.splice(index,1);
    $("#"+id).remove();*/
}   
function changeStatus(id,btnstatus){
    var title = btnstatus.parentNode; //titleClass
    var message = title.nextElementSibling; //messageClass

    $.post('http://localhost:3000/api/changeStatus',{'id':id,'status':btnstatus.checked},function(res){
        if(res.status==0){
            if(btnstatus.checked){
                title.className = "title2";//刪除線
                message.className = "message2";
                $('#edit'+id).css('display','none');//隱藏按鈕
                $('#update'+id).css('display','none');
                
                if(document.getElementById("edit_title"+id)){
                    $('#title'+id).css('display','inline'); 
                    $('#message'+id).css('display','inline');
                    $('#edit_title'+id).remove();
                    $('#edit_message'+id).remove();
                }
        }
        else{
            title.className = 'title';
            message.className = "message";
            $('#edit'+id).css('display',"inline");
        }
    }
    });

   /* if(btnstatus.checked){
        title.className = "title2";
        message.className = "message2";
        $('#edit'+id).css('display','none');
        $('#update'+id).css('display','none');
        
        if(document.getElementById("edit_title"+id)){
            $('#title'+id).css('display','inline');
            $('#message'+id).css('display','inline');
            $('#edit_title'+id).remove();
            $('#edit_message'+id).remove();
        }
    }
    else{
        title.className = 'title';
        message.className = "message";
        $('#edit'+id).css('display',"inline");
    }*/
}
getList();  //載入時運作getList()
function getList(){
    $.get('http://localhost:3000/api/getList',function(data,status){
    for(var i = 0;i< data.length;i++){
        newList(data[i]);
    }
    });
}