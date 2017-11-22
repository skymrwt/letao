/**
 * Created by 汪涛 on 2017/11/22.
 */
$(function () {
    var currentPage = 1;
    var pageSize = 5;

    function render() {
        $.ajax({
            type:"get",
            data:{
                page:currentPage,
                pageSize:pageSize,
            },
            url:"/user/queryUser",
            success: function (data) {
                console.log(data);
                $(".body_art").html(template("tpl",data))
                //    分页插件配置
                var options = {
                    bootstrapMajorVersion:3,//版本号
                    currentPage:currentPage,//当前页
                    totalPages:Math.ceil(data.total/pageSize),//总页数
                    onPageClicked:function(a,b,c,page){
                        currentPage = page;
                        render()
                    },
                    itemTexts:function(type,page){
                        switch(type){
                            case "first": return "首页";
                            case "prev" : return "上一页";
                            case "next" : return "下一页";
                            case "last" : return "末页";
                            case  "page" : return page;
                        }
                    }
                }
                $("#user_paginator").bootstrapPaginator(options)
            }
        })
    }

    render()
//    给操作按钮注册点击事件 委托给 body
    $(".body_art").on("click","button", function () {

        var user_id = $(this).parent().data("id");

        var user_status = $(this).parent().data("status")

        user_status == 1?user_status=0:user_status=1;

        console.log(user_status);
        $("#confirmModal").modal("show");
        //给模态框确定按钮注册点击事件
        $(".btn-confirm").off().on("click",function(){
            $.ajax({
                type:"post",
                data:{
                    id:user_id,
                    isDelete:user_status
                },
                url:"/user/updateUser",
                success:function(data){
                    if (data.success == true){
                        $("#confirmModal").modal("hide");
                        render()
                    }
                }
                
            })
        })

    })
})