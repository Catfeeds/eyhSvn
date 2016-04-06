/**
 * Created by eyohu023 on 2015/12/9.
 */
(function($){
    /*条件赛选的控制*/
    var maxPrice   =$("#maxPrice:hidden").val();
    var minPrice   =$("#minPrice:hidden").val();
    var Method = {
        init:function(_this){
            rentalMode = _this.find(".rental_mode");
            radio      = _this.find("input:radio");
            checkbox   = _this.find("input:checkbox");
            btnClear   = $(".btn-clear");
            noAction   = _this.find(".no-action");
            Method.radioClick();
            Method.checkboxClick();
            Method.clearClick()
        },
        clearClick:function(){
            btnClear.on("click",function(){
                rentalMode.removeClass("active");
                noAction.addClass("active");
                rentalMode.find("input").attr({checked:false});
                noAction.find("input").attr({checked:true});
                if($("#slider-range").get(0)){
                    $("#slider-range").slider({
                        range: true,
                        min: 0,
                        max: 3000,
                        values: [minPrice, maxPrice]
                    });
                    $("#slider-range-amount").text("￥" + minPrice + " - ￥" + maxPrice);
                }
            })
        },
        radioClick:function(){
            radio.parent(rentalMode).each(function(){
                $(this).on("click",function(){
                    if($(this).find("input:radio")[0].checked==true){
                        $(this).siblings(rentalMode).removeClass("active");
                        $(this).addClass("active");
                        $(this).find("input :radio").attr("checked", false);
                    }
                    else{
                        $(this).removeClass("active");
                        $(this).find("input :radio").attr("checked", true);
                    }
                })
            })
        },
        checkboxClick:function(){
            checkbox.parent(rentalMode).each(function(){
                $(this).on("click",function(){
                    if($(this).find("input:checkbox")[0].checked==true){

                        $(this).addClass("active");
                        $(this).find("input :radio").attr("checked", false);
                    }
                    else{
                        $(this).removeClass("active");
                        $(this).find("input :radio").attr("checked", true);
                    }
                })
            })
        }
    };
    Method.init($(".search-terms,.service-type,.com_list,.hd-mask,.cont"));

})(jQuery);

