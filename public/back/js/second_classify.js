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
                console.log(data);
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
                    }   ,
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
})