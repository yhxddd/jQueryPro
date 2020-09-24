$(function () {
    //刷新页面不丢失数据 用到本地存储 localStorage
    // 回车/复选框 都会把本地存储的数据加载到页面中
    //数据存储格式： var todolist = [{ title:'xxx',done:false}]
    //alert(11);

    load();
    // 1. 利用事件对象.keyCode判断用户按下回车键
    //页面中的数据都要从本地存储中获取

    $("#title").on("keydown",function (event) {
        if(event.keyCode === 13) {
            if($(this).val() === "" ){
                alert("请输入您要办的事件")
            }else{
                //alert(111);
                //读取本地存储原来的数据
                var local = getData(); //声明数组存储数据
                //console.log(local);

                //把最新的数据(用户输入的数据) 追加给local数组 然后再存入本地存储
                local.push({ title: $(this).val(), done: false });
                saveData(local); //将local传递给函数

                // 2. 将本地存储的数据渲染到页面中
                load();
                $(this).val("");
            }
        }
    });

    // 3. todoList的删除操作
    $("ol,ul").on("click","a",function () {
        //alert(11);
        //获取本地存储
        var data = getData();
        console.log(data);
        //修改数据：找到当前点击的对应的那条数据
            //获取索引号
        var index = $(this).attr("id");
        console.log(index);

        //将data中的数据删除  然后再将data存入本地存储  再渲染到页面中
        data.splice(index, 1);
        saveData(data);
        load();
    });

    // 4. todoList正在进行和已完成选项操作
    $("ol,ul").on("click","input",function () {
        //checkbox 选中与否 与 是否完成绑定
        //alert(11);
        //先获取本地存储数据
        var data = getData();
        //修改数据: 点击看是选中哪个了复选框
        var index = $(this).siblings("a").attr("id");
        console.log(index);
        data[index].done = $(this).prop("checked"); //修改done属性
        console.log(data);
        //保存到本地存储
        saveData(data);
        //重新渲染
        load();
    });

    //读取本地存储的数据
    function getData() {
        var data = localStorage.getItem("todolist");
        if(data !== null) {
            //将字符串格式转化为对象格式
            return JSON.parse(data);
        }else{
            return [];
        }
    }
    //保存本地存储数据
    function saveData(data){
        localStorage.setItem("todolist",JSON.stringify(data));
    }

    //渲染加载数据 + 统计完成/未完成个数
    function load(){
        //先读取本地存储数据
        var data = getData();
        //console.log(data);
        //遍历之前要清空ol里面的元素内容
        $("ol,ul").empty();
        var todoCount = 0; //正在进行的个数
        var doneCount = 0; //已完成个数
        //遍历这些数据
        $.each(data,function (i,n) {
            //i 索引号  n：内容
            //console.log(n);
            //将数据渲染到ol中   给每个a 自定义一个索引号
            if(n.done){
                $("ul").prepend("<li><input type='checkbox' checked='checked'><p>"+ n.title +"</p><a href='javascript:;' id="+ i +"></a></li>")
                doneCount++;
            }else{
                $("ol").prepend("<li><input type='checkbox'><p>"+ n.title +"</p><a href='javascript:;' id="+ i +"></a></li>")
                todoCount++;
            }
        });
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
    }
});
