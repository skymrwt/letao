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
                pageSize:pageSize
            },
            url:"/category/querySecondCategoryPaging",
            success:function(data){
                $(".tbody_art").html(template("tpl",data))
                //    配置分页
                var options = {
                    bootstrapMajorVersion:3,
                    currentPage:currentPage,
                    totalPages:Math.ceil(data.total/pageSize),  //总页数
                    itemTexts:function(type,page){
                        switch(type){
                            case "first": return "首页";
                            case "prev" : return "上一页";
                            case "next" : return "下一页";
                            case "last" : return "末页";
                            case  "page" : return page;
                        }
                    },
                    onPageClicked:function(a,b,c,page){
                        currentPage = page;
                        render()
                    }
                }

                $("#second_paginator").bootstrapPaginator(options);

            }

        })
    }

    render()

//    添加按钮>模态框
    $("#secondBtn").on("click", function () {
        $("#secondModal").modal("show");
    //    点击按钮之后发ajax获取一级菜单名称
        var currentPage = 1;
        var pageSize = 100;
        $.ajax({
            type:"get",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            url:"/category/queryTopCategoryPaging",
            success: function (data) {
                console.log(data);
                $(".dropdown-menu").html(template("menu_tpl",data))
            }
        })
    })


    $("form").on("click","li a",function(){
        $(".btn_words").text($(this).text());
        $(".first_id").val($(this).data("id"))
        console.log($(".first_id").val());
        $('form').data("bootstrapValidator").updateStatus("categoryId","VALID")
    })

//    图片上传
    $("#filedUpload").fileupload({
        dataType:"json",
        done:function(e,data){
            console.log(data);
            $(".show_img").attr("src",data.result.picAddr) //图片展示
            $(".img_src").val(data.result.picAddr);
            $('form').data("bootstrapValidator").updateStatus("brandLogo","VALID")
        }
    })

//    表单校验
    $("form").bootstrapValidator({
        excluded:[],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        fields: {
            categoryId: {
                validators: {
                    notEmpty: {
                        message: "请选择一级分类"
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: "请填写二级分类"
                    }
                }
            },
            brandLogo: {
        validators: {
            notEmpty: {
                message: "请上传图片!"
            }
        }
    },
        }
    })



    $("form").on('success.form.bv', function (e) {
        e.preventDefault();
        console.log("成功");
        $.ajax({
            type:"post",
            data:$("form").serialize(),
            url:"/category/addSecondCategory",
            success: function (data) {
                if( data.success == true ){
                //    关闭模态框
                //    重置表单内容  样式
                    $("#secondModal").modal("hide");
                    $("form").data("bootstrapValidator").resetForm();
                    $("form")[0].reset();
                    currentPage = 1;
                    render()
                }
                
            }
        })
    })

})