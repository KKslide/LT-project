$(function () {
  loadHistory();
  /**
   * 1 从本地读取localstorage  key:LT_his value:[]
   * 2 先获取 
   */
  function loadHistory() {
    var ls = localStorage;

    // 有数据就获取数据 无 就获取空数组 !! 
    var arr = (ls.getItem("LT_his") && JSON.parse(ls.getItem("LT_his"))) || [];
    
    // 判断 有没有数据 
    if(arr.length<1){
      $(".history_list").html('');
      return;
    }

    // 把数组加载出来 
    // <div class="hl_item mui-clearfix"> <span class="item_font">123</span> <span class="item_close mui-icon mui-icon-closeempty"></span> </div>

    var strArr=[];
    for (var index = 0; index < arr.length; index++) {
      strArr.push('<div class="hl_item mui-clearfix"> <span class="item_font">'+arr[index]+'</span> <span class="item_close mui-icon mui-icon-closeempty"></span> </div>');
    }
    // 渲染列表数据 
    $(".history_list").html(strArr.join(''));
  }

  // 点击搜索按钮
  /* 
  1 获取val
  2 判断是否为空
  3 存到localstorage->
  4 先获取存到localstorage ->数组
  5 数组.push(val) 去重 
  6 再把数组(转为json ) 存到 存到localstorage
   */
  $(".searchBtn").on("tap",function () {
    var val=$(".searchTxt").val();
    // 去掉空格
    if(!$.trim(val)){
      return false;
    }

    var ls = localStorage;
    var arr = (ls.getItem("LT_his") && JSON.parse(ls.getItem("LT_his"))) || [];

    // 要做去重的处理
    for (var i = 0; i < arr.length; i++) {
      if(arr[i]==val){
        // 删除旧的 添加新的到最开头
        // (要删除的值的索引,要删除几个)
        arr.splice(i,1);
      }   
    }
    // unshift 往数组的头部加数据
    // push 数组的尾部加数据!! 
    arr.unshift(val);   
    ls.setItem("LT_his",JSON.stringify(arr));
    // 加载localstorage的数据
    // loadHistory();

    // 跳转页面
    location.href="searchList.html?key="+val;
  })


  // 清空
  $(".clearBtn").on("tap",function () {
    localStorage.setItem("LT_his",JSON.stringify([]));
    loadHistory();
  })

  // 事件的委托 
  $("body").on("tap",".item_close",function () {
    // console.log(1234);

    // 获取父元素的索引
    var index=$(this).parent().index();
    // console.log(index);
    var ls = localStorage;
    var arr = (ls.getItem("LT_his") && JSON.parse(ls.getItem("LT_his"))) || [];
    // 删除数组中的元素
    arr.splice(index,1);

    // 存值
    ls.setItem("LT_his",JSON.stringify(arr));
    // 重新渲染 
    // (注意 自己删除自己 又自己绑定 容易出事 )
    loadHistory();
  })
})