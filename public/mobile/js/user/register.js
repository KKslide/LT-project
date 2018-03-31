$(function () {

  // 认证码
  var VCODE = null;
  // 点击注册
  $(".registerBtn").on("tap", function () {
    /* 
    1 验证 手机号码
      使用正则表达式去做验证!!! 
    2 验证密码 1
      长度不能少于6 
    3 验证 重复密码
      拿两个密码对比 
    4 验证认证码 
      a 验证非空 - 6位数
      b 验证和后台的认证码是否一致 
      c 倒计时 不能多次点击 
        tap 点击 
          0 判断是否可以二次点击 
          1 发送ajax 成功  设置VCODE 
          2 开启倒计时 
            文字修改 
            按钮不可以再次点击 
          3 倒计时时间到了
            重新允许点击
    5 发送请求-注册 
    成功 提示  
    失败 提示
     */

    var data = {
      username: $.trim($(".mobile").val()),
      password: $.trim($(".password").val()),
      mobile: $.trim($(".mobile").val()),
      vCode: $.trim($(".vCode").val())
    };

    // 1 验证 手机号码
    if (!/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(data.mobile)) {
      mui.toast("请输入合法的手机号码 萌萌哒");
      return false;
    }

    // 验证密码
    if (data.password.length < 6) {

      mui.toast("请输入合法的密码 😙");
      return false;
    }

    // 验证重复密码
    if (data.password !== $.trim($(".password2").val())) {
      mui.toast("两次密码不一致 😭");
      return false;
    }

    // 验证认证码
    if (data.vCode.length != 6) {
      mui.toast("请输入合法的认证码 😊");
      return false;
    }

    // data.vCode 长度一定是6位 
    if (data.vCode !== VCODE) {
      mui.toast("认证码不正确");
      return false;
    }

    // 提交数据到后台 完成注册 
    $.ajax({
      url:"/user/register",
      type:"post",
      data:data,
      success:function (result) {
        console.log(result);
       if(result.success){
         // 成功
         mui.toast("注册成功");
         setTimeout(function () {
           location.href="login.html";
         },1000);
       }
       if(result.error&&result.error==403){
         // 用户名已经存在
         mui.toast(result.message);
       }
        
      }
    })
  })

  // 获取认证码
  $(".getCodeBtn").on("tap", function () {
    if ($(this).attr("disabled") == true) {
      // 当前不能点击
      return false;
    }
    $(this).attr("disabled", true);
    var that = this;

    // 修改按钮的文字提示
    $(that).html("正在发送哦")
    // 发送请求
    $.ajax({
      url: "/user/vCode",
      type: "get",
      success: function (result) {
        // console.log(result);
        // 设置全局的vcode
        VCODE = result.vCode;
        var time = 5;
        // 开启倒计时
        var timeId = setInterval(function () {
          time--;
          $(that).html(time + "秒后再获取");
          if (time == 0) {
            clearInterval(timeId);
            $(that).removeAttr("disabled");
            $(that).html("获取认证码");

          }
        }, 1000);
      }
    })
  })
})