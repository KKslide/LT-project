$(function () {


  $(".loginBtn").on("tap", function () {

    // 获取用户名和密码
    // var formStr=$("form").serialize();
    // console.log(formStr);

    var user = $(".userTxt").val();
    var pwd = $(".pwdTxt").val();

    if (!$.trim(user)) {
      // 提出用户提示
      mui.toast("请输入合法的用户名");
      return false;
    }
    if (!$.trim(pwd)) {
      // 提出用户提示
      mui.toast("请输入合法的密码");
      return false;
    }

    // 发送请求 要登录

    $.ajax({
      url:"/user/login",
      type:"post",
      data:$("form").serialize(),
      success:function (result) {
        if(result.success){
          //  跳回到原来的页面
          // console.log("成功");
          if($.getURLParams("returnUrl")){
            location.href=$.getURLParams("returnUrl");
          }
          else{
            // 跳回首页
            location.href="/mobile/index.html";
          }
          
        }else {
          mui.toast(result.message);
        }
        
      }
    })
    
    
    
  });

})