/**
 * Created by WHB on 2016/11/23.
 */


;(function ($,window,document,undefined) {
    $.fn.scrollLoad = function (options) {
        var defaults = {
            start: 0,
            startNum:7,
            limit: 16,
            wajxHtml:'',
            firstLoad:true,
            resNum:null,
            timeOutFlag : undefined,
            num  : null
        };
        var opts = $.extend({}, defaults, options);
        var Methods = {
            init: function (_this) {
                opts.timeOutFlag = setTimeout(function(){
                    $.post("../../assets/mobile/data/participationRecord.json",{},function(data){
                        opts.res = data.datas;
                        if(data.status == "ok"){
                            Methods.loading(true,opts.res,_this);
                        }else {
                            showErrMsg("加载失败");
                        }
                       // opts.timeOutFlag = undefined;
                    },"json");
                    setTimeout(function(){opts.timeOutFlag = undefined;},2000);
                },100);
                Methods.scrollLoad(_this)
            },
            ajaxRecord:function(obj,wajxHtml){
                wajxHtml += '<li>'+
                                '<div>'+
                                    '<div class="couponImg style">'+
                                        '<img src="'+obj.headImg+'" class="couponImg1" alt="">'+
                                    '</div>'+
                                    '<span class="inforList">'+
                                        '<span class="title clearfix">'+
                                            '<span class="left">'+obj.lotteryName+'</span>'+
                                            '<span class="right color1">参与'+obj.freNum+'次</span>'+
                                        '</span>'+
                                        '<span class="clearfix">'+
                                            '<span class="left">ID:'+obj.id+'</span>'+
                                            '<span class="right">'+obj.lotteryTime+'</span>'+
                                        '</span>'+
                                    '</span>'+
                                '</div>'+
                            '</li>';
                return wajxHtml;
            },
            loading : function(flag,res,_this){

                var loadingFix = new Object();
                if(loadingFix){
                    loadingFix = $("#loddingFix");
                    loadingFix.hide();
                }else{
                    var loadingHtml = '<div id="loddingFix" style="width: 100%;height: 100%;z-index: 999;display: none;position: fixed;background: gray;filter:alpha(opacity=50); -moz-opacity:0.5; -khtml-opacity: 0.5; opacity: 0.5;left: 0;top: 0; "><img style=" width: 2.5rem; top: 47%; position: fixed; left: 45%; " src="../../assets/mobile/images/loading.gif"></div>';
                    $("body").append(loadingHtml);
                    loadingFix = $("#loddingFix");
                }

                if(opts.firstLoad){
                    loadingFix.show();
                    setTimeout(function(){
                        loadingFix.hide();
                        for(var i = 0;i<opts.startNum;i++){
                            _this.append(Methods.ajaxRecord(res[i],opts.wajxHtml));
                        }
                        opts.wajxHtml = '';
                    },1000);
                    return;
                }

                if(!opts.firstLoad){
                    loadingFix.show();
                    setTimeout(function(){
                        loadingFix.hide();
                        if(opts.startNum+opts.limit>res.length){
                            if((opts.num>res.length-opts.startNum)&&(res.length-opts.startNum>0)){
                                for(var i = opts.startNum;i<res.length;i++){
                                    _this.append(Methods.ajaxRecord(res[i], opts.wajxHtml));
                                }

                                opts.startNum = opts.limit + opts.startNum;
                                opts.wajxHtml = '';
                                console.log(opts.startNum)
                            }
                            return;
                        }

                        for (var i = opts.startNum; i < opts.startNum + opts.limit; i++) {
                            _this.append(Methods.ajaxRecord(res[i], opts.wajxHtml));
                        }

                        opts.startNum = opts.limit + opts.startNum;
                        opts.wajxHtml = '';
                    },1000);
                }
            },
            scrollLoad:function(_this){
                var iStartY = 0;
                var iStartPagey = 0;
                $(window).on("touchstart", function (ev) {
                    iStartPagey = ev.originalEvent.targetTouches[0].pageY;
                });

                $(window).on("touchmove", function (ev) {
                    iStartY = iStartPagey - ev.originalEvent.targetTouches[0].pageY;
                });

                $(window).on("touchend", function () {
                    var scrollTop = $(this).scrollTop();
                    var scrollHeight = $(document).height();
                    var windowHeight = $(this).height();

                    if (scrollTop + windowHeight == scrollHeight) {
                        if (iStartY > 0) {
                            iStartY = 0;
                            if(opts.timeOutFlag){
                                return;
                            }
                            opts.timeOutFlag = setTimeout(function(){
                                opts.num = opts.limit - opts.start;
                                if(opts.startNum>opts.res.length){
                                    showErrMsg("没有更多数据咯");
                                    return;
                                }
                                $.post("../../assets/mobile/data/participationRecord.json", {}, function (data) {
                                    if (data.status == "ok") {//查询成功
                                        opts.res = data.datas;
                                        opts.firstLoad = false;
                                        Methods.loading(true, opts.res, _this);
                                    }
                                    else {
                                        showErrMsg("加载失败");
                                    }
                                }, "json");
                                setTimeout(function(){opts.timeOutFlag = undefined;},2000);
                            },100)

                        }
                    }
                });
            }
        };
        Methods.init($(this));



    };

    
})(jQuery,window,document);