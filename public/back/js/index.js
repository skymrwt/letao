/**
 * Created by 汪涛 on 2017/11/21.
 */
  
$(function () {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.querySelector(".left_chart"));

// 指定图表的配置项和数据
  var option = {
    title: {
      text: '2017年注册人数'
    },
    tooltip: {},
    legend: {
      data:['人数']
    },
    xAxis: {
      data: ["一月","二月","三月","四月","五月","六月"]
    },
    yAxis: {},
    series: [{
      name: '人数',
      type: 'bar',
      data: [1520, 4571, 2036, 1245, 2456, 3214]
    }]
  };

// 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
//  ----------图二------------------------------
  var myChart1 = echarts.init(document.querySelector(".right_chart"));
  
  option = {
    title : {
      text: '热门品牌销售',
      subtext: '2017年6月',
      x:'center'
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['阿迪','新百伦','耐克','安踏','李宁']
    },
    series : [
      {
        name: '访问来源',
        type: 'pie',
        radius : '55%',
        center: ['50%', '60%'],
        data:[
          {value:335, name:'阿迪'},
          {value:310, name:'新百伦'},
          {value:234, name:'耐克'},
          {value:135, name:'安踏'},
          {value:1548, name:'李宁'}
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  myChart1.setOption(option);
  
  
  
  
    })



