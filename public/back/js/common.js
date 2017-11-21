/**
 * Created by 汪涛 on 2017/11/21.
 */
$(function () {

  //进度条
  NProgress.configure({ showSpinner: false });
  $(document).ajaxStart(function () {
    NProgress.start()

  });
  $(document).ajaxStop(function () {
    setTimeout(function(){
      NProgress.done()
    },500)

  });



  // 验证身份
  var strURL = window.location.href;
  
  if ( strURL.indexOf("login.html") == -1){
    $.ajax({
        type:"GET",
        url:"/employee/checkRootLogin",
      success:function (data) {
        if (data.error == 400){
          location.href = "login.html"
        }
      }
    })
  }
  
  

  
  
  
  //模态框
  var $a = $("#a_modal");
  $a.on("click",function () {
    $('#logoutModal').modal('toggle')
  })
  
  //侧边栏显示隐藏
  var $left_toggle = $(".main .left_toggle");
  var $aside = $(".aside")
  var $main = $(".main")
  
  
  $left_toggle.on("click",function () {
    $aside.toggleClass("active");
    $main.toggleClass("active");
  })
  
  $("#sure").on("click",function () {
      $.ajax({
        type:"GET",
        url:"/employee/employeeLogout",
        success:function (data) {
          if(data.success){
            location.href = "login.html"
          }
          
        }
        
      })
      })
  
    //分类管理切换
  $(".parent_comm").on("click",function () {
    $(this).next().slideToggle()
  })
  
  // a标签高亮
  //var $as = $(".management ul a")
  //
  //  $as.on("click",function () {
  //    $(this).addClass("active").parent().siblings().children().removeClass("active")
  //  })
    })