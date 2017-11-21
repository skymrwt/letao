/**
 * Created by 汪涛 on 2017/11/21.
 */

$(function () {
  var $form = $("form");
  
  //表单校验
  $form.bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      //校验姓名
      username:{
        validators:{
          //为空校验
          notEmpty:{
            message:"用户名不能为空"
          },
          callback:{
            message:"用户名不存在"
          }
        }
      },
    //  校验密码
      password:{
        validators:{
          //为空校验
          notEmpty:{
            message:"密码名不能为空"
          },
          callback:{
            message:"密码错误"
          },
          //长度校验
          stringLength:{
            min:6,
            max:12,
            message:"密码名长度必须在6到12之间"
          }
        }
      }
      
    }
  })
  
  // 获取表单实例
  var validator = $form.data('bootstrapValidator');
//  表单校验成功
  $form.on("success.form.bv",function (e) {
    e.preventDefault();
    $.ajax({
      type:"post",
      dataType:"json",
      data:$form.serialize(),
      url:"/employee/employeeLogin",
      success:function (data) {
        if(data.error === 1000){
          validator.updateStatus("username",'INVALID' ,'callback');
        }
        if (data.error === 1001){
          validator.updateStatus("password","INVALID","callback");
        }
        if (data.success){
          location.href = "index.html"
        }
        
      }
    })
  })
})
