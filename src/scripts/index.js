

//js的入口文件
//引入zepto
var $ = require('./components/zepto-modules/_custom');
var wx = require('./components/weixin/jweixin');
require('./components/zepto-modules/ajax');
module.exports = $;





var Swiper=require('./components/swiper/swiper-3.3.1.min');

console.log(Swiper);

var SwiperAnimate=require('./components/swiper/swiper.animate1.0.2.min');


 var mySwiper = new Swiper ('.swiper-container', {
  onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
    SwiperAnimate.swiperAnimateCache(swiper); //隐藏动画元素 
    SwiperAnimate.swiperAnimate(swiper); //初始化完成开始动画
  }, 
  onSlideChangeEnd: function(swiper){ 
    SwiperAnimate.swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
  } 
  });     

var $ = require('zepto-modules/zepto');
 
require('zepto-modules/event');
require('zepto-modules/ajax');
require('zepto-modules/form');
require('zepto-modules/touch');
 
module.exports = $;

/*保证swiper只显示一次*/
/*for(var i=0;i<localStorage.length;i++){
    if (localStorage.key[i]=='showTime'){
        $('#myIscroll').show();
         $('.swiper-container').hide();
    }
    else{
       $('#myIscroll').hide();
    $('.swiper-container').show();
    localStorage.setItem('showTime','1');
}*/

 $('#myIscroll').hide();
$('.swiper-container').show();



$('#enter').tap(function(){
    $('#myIscroll').show();
    $('.swiper-container').hide();

    /*初始化ajax，显示技能页*/
    $.ajax({
        url:"/api/skill",
        type:"POST",
        success:function(data){
            console.log(data);
            $('#thelist').html('');
            for(var i=0;i<data.length;i++){
                   
                $('#thelist').append('<li>TITLE:'+data[i].category+'</li>')
                            .append('<li>熟悉度:'+data[i].level+'</li>')
                            .append('<li>类别:'+data[i].name+'</li>')
                            .append('<li>应用时间:'+data[i].time+'</li>');                
            }

         var IScroll=require('./components/iscroll/iscroll');
        var myIScroll = new IScroll('#wrapper', {mouseWheel: false});
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

        }
    });


    $("#footer div").tap(function() {
    var apiTarget = $(this).attr('id');
    $.post('/api/' + apiTarget, {}, function(response) {
        var html = "";
        for (var i = 0; i < response.length; i++) {
           if(i==0){
            console.log('iiiii');
                $('#thelist').append('<li>TITLE:'+response[i].category+'</li>')
                            .append('<li>熟悉度:'+response[i].level+'</li>')
                            .append('<li>类别:'+response[i].name+'</li>')
                            .append('<li>应用时间:'+response[i].time+'</li>');    
            }
            else{
                 for(var key in response[i]){
                 html += "<li>" + response[i][key] + "</li>";
                 }
              $("#scroller ul").html(html);
             }
        }
       
        var IScroll=require('./components/iscroll/iscroll');
    var myIScroll = new IScroll('#wrapper', {mouseWheel: false});
    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    })
      
})

});


/* $('#skill').tap(function(){
    $('#thelist').html('');
    $.ajax({
        url:"/api/skill",
        type:"POST",
        success:function(data){
            console.log(data);
                          
           
            for(var i=0;i<data.length;i++){
                
                $('#thelist').append('<li>TITLE:'+data[i].category+'</li>')
                            .append('<li>熟悉度:'+data[i].level+'</li>')
                            .append('<li>类别:'+data[i].name+'</li>')
                            .append('<li>应用时间:'+data[i].time+'</li>');                
            }
    var IScroll=require('./components/iscroll/iscroll');
    var myIScroll = new IScroll('#wrapper', {mouseWheel: false});
    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
        }
    });
 })


$('#project').tap(function(){
    $('#thelist').html('');  
    $.ajax({
        url:"/api/project",
        type:"POST",
        success:function(data){
            console.log(data);
                         
           
            for(var i=0;i<data.length;i++){
                for(var key in data[i])
                    if(key=='image'){
                       $('#thelist').append('<li><img src="'+ data[i][key]+'"/></li>');
                    }
                   else{
                     $('#thelist').append('<li>'+data[i][key]+'</li>') ;
                   }
                              
            }
    var IScroll=require('./components/iscroll/iscroll');
    var myIScroll = new IScroll('#wrapper', {mouseWheel: false});
    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
        }
    });
 })

$('#work').tap(function(){
    $('#thelist').html('');  
    $.ajax({
        url:"/api/work",
        type:"POST",
        success:function(data){
            console.log(data);
                         
           
            for(var i=0;i<data.length;i++){
                for(var key in data[i])
                     if(key=='image'){
                       $('#thelist').append('<li><img src="'+ data[i][key]+'"/></li>');
                    }
                   else{
                     $('#thelist').append('<li>'+data[i][key]+'</li>') ;
                   }
                              
            }
    var IScroll=require('./components/iscroll/iscroll');
    var myIScroll = new IScroll('#wrapper', {mouseWheel: false});
    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
        }
    })
 });
*/



$("#scan").tap(function() {
    $.post("http://1064669386.applinzi.com/php/getsign.php", {
        url: window.location.href
    }, function(data) {
        pos = data.indexOf('}');
        dataStr = data.substring(0, pos + 1);
        objData = JSON.parse(dataStr);
        console.log(dataStr);
        wx.config({
            debug: true,
            appId: objData.appId,
            timestamp: objData.timestamp,
            nonceStr: objData.nonceStr,
            signature: objData.signature,
            jsApiList: [
                 'getLocation'
                // 所有要调用的 API 都要加到这个列表中
            ]
        });

        wx.ready(function() {

            // 在这里调用 API
            wx.getLocation({
    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
    success: function (res) {
        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
        var speed = res.speed; // 速度，以米/每秒计
        var accuracy = res.accuracy; // 位置精度

        alert(localIds);
    }

        });

        });

    });

})





















































