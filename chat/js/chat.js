/*发送消息*/
//function send(headSrc,str){
//	var html="<div class='send'><div class='msg'><img src="+headSrc+" />"+
//	"<p><i class='msg_input'></i>"+str+"</p></div></div>";
//	upView(html);
//}
/*接受消息*/
function show(headSrc,str){
	var html="<div class='show'><div class='msg'><img src="+headSrc+" />"+
	"<p><i class='msg_input'></i>"+str+"</p></div></div>";
	upView(html);
}
/*更新视图*/
function upView(html){
	$('.message').append(html);
	$('body').animate({scrollTop:$('.message').outerHeight()-window.innerHeight},200)
}
function sj(){
	return parseInt(Math.random()*10)
}
$(function(){
	$('.footer').on('keyup','input',function(){
		if($(this).val().length>0){
			$(this).next().css('background','#114F8E').prop('disabled',true);
		
		}else{
			$(this).next().css('background','#ddd').prop('disabled',false);
		}
	})
	$('.footer p').click(function(){
		show("./images/touxiangm.png",$(this).prev().val());
		//test();
	})
})

/*测试数据*/
//var arr=['我是小Q','好久没联系了！','你在想我么','怎么不和我说话','跟我聊会天吧'];
//var imgarr=['images/touxiang.png','images/touxiangm.png']
//test()
//function test(){
//	$(arr).each(function(i){
//		setTimeout(function(){
//			send("images/touxiang.png",arr[i])
//		},sj()*500)
//	})
//}
 $.ajax({
        url : 'config.json',
        type : 'get',
        dataType : 'json',
        success : function(res){
            ip = 'ws://'+ res.client_host + ':' +res.port;       
       			var  nickname = "duyuanbo";
                var socket;
                if(!nickname){
                    alert('Please enter nickname');
                }
                if(window.WebSocket){
                    //关闭用户信息输入框
                    //$('#login_block').attr('style','');

                    socket = new WebSocket(ip);
                    //连接建立
                    socket.onopen = function(){
                        send('login',nickname);
                    };
                    //收到消息
                    socket.onmessage = function() {
                        var msg = JSON.parse(event.data); //解析收到的json消息数据
                       // alert('msg.type='+msg.type+" "+"msg.user="+msg.user+" msg.content="+msg.content);
                        if(msg.type == 'login' || msg.type == 'logout'){
//                          var html = '';
//                          for(var id=0;id < msg.user_list.length ;id++)
//                          {
//                              html += '<div class="line">' +
//                                  '<span class="picture"><img src="assets/img/header.jpg" alt="test"></span>' +
//                                  '<span class="nickname">'+ msg.user_list[id] +'</span>' +
//                                  '<span class="conversation"></span>' +
//                                  '</div>';
//                          }
//                          $('.user-block').html(html);
                        }
                        if(msg.type == 'system'){
//                          $('.chat-block').append('<p class="bg-warning message"><a name=""></a><i class="glyphicon glyphicon-info-sign"></i>'+msg.content+' online</p>');
                        }
                        if(msg.type == 'IM' && msg.user != nickname){
//                          $('.chat-block').append(
//                              '<div class="chat-block-left">' +
//                              '<p class="chat-block-nickname">'+ nickname +'</p>' +
//                              '<span>'+ msg.content +'</span>' +
//                              '</div>'
           var html="<div class='send'><div class='msg'><img src="+"images/touxiang.png"+" />"+
	"<p><i class='msg_input'></i>"+msg.content+"</p></div></div>";
	upView(html);
                         //   );
						//	alert('have msg');
                        }
                    };

                    //发生错误
                    socket.onerror = function(){
                        console.log("Connected to WebSocket server error");
                        $('.chat-block').append('<p class="bg-danger message"><a name=""></a><i class="glyphicon glyphicon-info-sign"></i>Connect to WebSocket server error.</p>');

                    };

                    //连接关闭
                    socket.onclose = function(){
                        console.log('websocket Connection Closed. ');
                        $('.chat-block').append('<p class="bg-warning message"><a name=""></a><i class="glyphicon glyphicon-info-sign"></i>websocket Connection Closed.</p>');
                    };

                    function send(type , user , content){
                        var msg = {
                            type: type,
                            user: user,
                            content: content
                        };
                        try{
                            socket.send(JSON.stringify(msg));
//                          var html="<div class='send'><div class='msg'><img src="+"images/touxiang.png"+" />"+
//	"<p><i class='msg_input'></i>"+msg.content+"</p></div></div>";
//	upView(html);
                        } catch(ex) {
                            console.log(ex);
                        }
                    }

                    //按下enter键发送消息
                    $(window).keydown(function(event){
                        if(event.keyCode === 13){
                            var message = $('#input_message').val();
                            if(!message)
                            {
                                alert('Please enter content');
                                return;
                            }
                            send('IM',nickname,message);
                            $('#input_message').val('');
                            $('.chat-block').append(
                                '<div class="chat-block-right">' +
                                '<span>'+ message +'</span>' +
                                '</div>'
                            );
                        }
                    });

                    //点发送按钮发送消息
                    $('#send').bind('click',function(){
                        var message = $('#input_message').val();
                        if(!message)
                        {
                            alert('Please enter content');
                            return;
                        }
                        send('IM',nickname,message);
                        $('#input_message').val('');
                        $('.chat-block').append(
                            '<div class="chat-block-right">' +
                            '<span>'+ message +'</span>' +
                            '</div>'
                        );
                    });

                }
                else{
                    alert('The browser nonsupport web socket');
                }
            //}
          //  );
        }
    });
