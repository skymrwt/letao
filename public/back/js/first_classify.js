/**
 * Created by 汪涛 on 2017/11/22.
 */
$(function () {
    var currentPage = 1;
    var pageSize = 5;
    function render(){
        $.ajax({
            type:"get",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            url:"/category/queryTopCategoryPaging",
            success: function (data) {
                console.log(data);
                //    1. 拿到数据  准备 模板
                //    2. 做好模板 进行绑定
                $(".tbody-art").html(template("tpl",data))
                //    配置分页
                var options = {
                    bootstrapMajorVersion:3,
                    currentPage:currentPage,
                    totalPages:Math.ceil(data.total/pageSize),
                    itemTexts:function(type,page){
                        switch(type){
                            case "first": return "首页";
                            case "prev" : return "上一页";
                            case "next" : return "下一页";
                            case "last" : return "末页";
                            case  "page" : return page;
                        }
                    }   ,
                    onPageClicked:function(a,b,c,page){
                        currentPage = page;
                        render();
                    }
                }
                $("#first_paginator").bootstrapPaginator(options);
            }

        })
    }
    render()

//    添加一级分类
    $(".add-btn").on("click",function(){
        $("#firstModal").modal("show");
    })

    $("form").bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            categoryName:{
                validators:{
                    notEmpty:{
                        message:"请输入一级分类名称",
                    }
                }

            }
        }
    })

    $("form").on("success.form.bv",function(e){
        e.preventDefault();
        $.ajax({
            type:"post",
            data:$("form").serialize(),
            url:"/category/addTopCategory",
            success:function(data){
                if( data.success == true ){
                    console.log(1);
                    //关闭模态框
                    $("#firstModal").modal("hide");
                    $("form").data("bootstrapValidator").resetForm();
                    $("form")[0].reset();
                    console.log(2);
                    render();
                }
            }
        })
    })
})