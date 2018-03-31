$(function () {
 
  queryTopCate();

  /**
   * 获取一级分类数据
   */
  function queryTopCate() {
  //  $.maskShow();
    $.ajax({
      url: "/category/queryTopCategory",
      success: function (result) {
        // 渲染数据 
        // <li><a href="#">1</a></li>
        var rows = result.rows;
        var strArr = [];
        for (var i = 0; i < rows.length; i++) {
          strArr.push('<li data-id='+rows[i].id+' ><a href="#">'+rows[i].categoryName+'</a></li>');
        }

        // 把数组 变成字符串 [1,2,3,4] 1,2,3,4
        $(".lt_menu>ul").html(strArr.join(''));

        querySecondCategory(rows[0].id);
        // $.maskClose();
      }
    })
  }

  // 二级分类
  function querySecondCategory(id){
    $.maskShow();
    $.ajax({
      url:"/category/querySecondCategory?id="+id,
      success:function (result) {
        // <li><a href="javascript:;"><img src="./images/brand4.png" alt=""><p>文字</p></a></li>
        var rows=result.rows;
        if(rows.length>0){
          var strArr=[];
          for (var i = 0; i < rows.length; i++) {
            strArr.push('<li><a href="javascript:;"><img src="'+rows[i].brandLogo+'" alt=""><p>'+rows[i].brandName+'</p></a></li>');
          }
          $(".lt_content>ul").html(strArr.join(''));
        }else {
          $(".lt_content>ul").html('没有数据了');
        }
        
        $.maskClose();
      }
    })
  }

  // 注意li标签是动态生成 
  $(".lt_menu").on("tap","li",function () {
    var id=$(this).data("id");
    querySecondCategory(id);
  })
})