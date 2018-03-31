
(function ($) {
  $("body").on("tap", "a", function () {
    location.href = $(this).attr("href");
  });

  // 显示和隐藏都是通个对象才可以  
  var Mask = mui.createMask();

  $.extend($, {
    maskShow: function () {
      Mask.show();
      $(".lt_loading").show();
    },
    maskClose: function () {
      Mask.close();
      $(".lt_loading").hide();
    },
    getURLParams: function (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      }
      return null;
    },
    LtAjax:function (option) {
      $.ajax({
        url:option.url,
        type:option.type||"get",
        data:option.data||"",
        success:function (result) {
          if(result.success){
            option.success && option.success(result);
          }else if(result.error==400){
            // 跳转到登录页面
            // location.href="/mobile/user/login.html";
            location.href="user/login.html?returnUrl="+location.href;
          }
        }
      });
    }
  });
})(Zepto);