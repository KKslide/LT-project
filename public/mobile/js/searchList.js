$(function () {
  // 全局参数查询对象
  var queryObj = {
    proName: "",
    brandId: "",
    price: "",
    num: "",
    page: 1,
    pageSize: 6
  };
  queryObj.proName = $.getURLParams("key");

  // 总条数
  var Count = 1;


  mui.init({
    pullRefresh: {
      container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down: {
        height: 50,//可选,默认50.触发下拉刷新拖动距离,
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        contentdown: "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
        contentover: "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
        contentrefresh: "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
        callback: function () {


          setTimeout(function () {
            queryObj.page = 1;
            queryProduct(function (result) {
              Count = result.count;
              var html = template("prolistTpl", result);
              $(".lt_product_list").html(html);
              // 结束下拉刷新
              mui('#refreshContainer').pullRefresh().endPulldownToRefresh(false);
              // 重置上拉控件的用户提示
              mui('#refreshContainer').pullRefresh().refresh(true);
            });
          }, 1000)

        }
      },
      up: {
        height: 50,//可选.默认50.触发上拉加载拖动距离
        auto: true,//可选,默认false.自动上拉加载一次
        contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
        contentnomore: '没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
        callback: function () {
          // 一共有多少页
          /* 
          11 
          5 

           */
          var totalPage = Math.ceil(Count / queryObj.pageSize);
          setTimeout(function () {
            // 判断
            if (queryObj.page < totalPage) {
              // 继续请求数据
              queryObj.page++;
              queryProduct(function (result) {
                var html = template("prolistTpl", result)
                $(".lt_product_list").append(html);
                // 有数据 传入 false  则无其他显示 
                mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
              })
            } else {
              // 没有数据就传入 true  给出用户提示 没有数据了
              mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
            }
          }, 1000);

        }
      }
    }
  });


  /* 
  1 初始化数据
    a 获取url的参数 ?key=1 -> 1 
    b 拼接url
    c 渲染数据 
  2 上拉加载下一页
    一共有多少页 
    总条数 和我们自己定的页容量 有关系 
   */

  // 发送请求
  function queryProduct(callback) {
    $.ajax({
      url: "/product/queryProduct",
      data: queryObj,
      success: function (result) {
        callback && callback(result);
        // html(html)
        // append(html) 
      }
    });
  }




  // 点击搜索
  $(".searchBtn").on("tap", function () {
    var val = $(".searchTxt").val();

    if (!$.trim(val)) {
      // 用户提示 请输入关键字
      mui.toast("请输入关键字");
    } else {
      queryObj.proName = val;
      // queryProduct();
      //  console.log( mui('#refreshContainer').pullRefresh().pullLoading);

      // 手动触发下拉 
      mui("#refreshContainer").pullRefresh().pulldownLoading();



    }
  })


  // 点击排序
  $(".lt_sort_bar>a").on("tap", function () {
    $(this).addClass("active").siblings().removeClass("active");

    //  mui-icon-arrowdown 改变箭头
    // <span class="mui-icon mui-icon-arrowdown"></span> 
    $(this).find(".mui-icon").toggleClass("mui-icon-arrowdown mui-icon-arrowup");

    var sort = -1;
    // 判断 如果 span 上 up 升序    down 降序
    if ($(this).find(".mui-icon").hasClass("mui-icon-arrowup")) {
      // 要 升序
      sort = 1;
    } else {
      // 降序
      sort = 2;
    }

    // 获取要排序的关键字
    // console.log($(this).data("sortname"));
    if ($(this).data("sortname") == "price") {
      queryObj.price = sort;
      queryObj.num = "";
    }
    if ($(this).data("sortname") == "num") {
      queryObj.num = sort;
      queryObj.price = "";
    }

    // 手动触发下拉 
    mui("#refreshContainer").pullRefresh().pulldownLoading();
  })
})