$(function () {

  $(".category_menu").on("click",function () {
    $(this).find(".sub_menu").slideToggle();
  });

  $(".slide_menu").click(function () {
    // 
    // $(".left_menu").css("width",0);
    // $(".left_menu").hide();
    // $(".lt_view").css("paddingLeft",0);

    // class的切换 
    $(".lt_view").toggleClass("p0");
    
  })

  $(".log_out_ok").click(function () {
    /* 
    1 发送请求到后台 让后台删除 sesstion /employee/employeeLogout
    2 跳转页面 
     */


     $.ajax({
       url:"/employee/employeeLogout",
       success:function (result) {
        //  console.log(result);
        if(result.success){
          // 跳转页面
          location.href="/admin/login.html";
        }
       }
     });
    
  })
})