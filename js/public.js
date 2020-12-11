$(function () {
    $(window).on('resize', function() {
        // 1 获取窗口宽度
        let clientW = $(window).width();
        // 2.设置临界点 true 背景 false img
        let isShowBigImage = clientW>=900;
        // 3 获取所有item
        let $allItems = $('#lk_carousel .carousel-item');
        // 4 遍历标签
        $allItems.each(function (index, item) {
            // 4.1 取出图片路径
            let src = isShowBigImage ? $(item).data('img-big') :  $(item).data('img-sm');
            let imgUrl = `url(${src})`;
            // 4.2 设置背景图片
            $(item).css({
                backgroundImage: imgUrl,
            });
            // 4.3创建图片
            if (!isShowBigImage) {
                // 小屏幕
                let imgEle = `<img src="${src}">`;
                $(item).empty().append(imgEle);
            } else {
                // 大屏幕
                $(item).empty();
            }
        });
    });
    // 触发切换轮播的pc和mobile
    $(window).trigger('resize');
    // 底部提示
    $('[data-toggle="tooltip"]').tooltip()
    // 移动端的触摸事件
    let startX = 0, endX = 0;
    let carousel = $('#lk_carousel');
    let carouselInner = $('#lk_carousel .carousel-inner')[0];
    carouselInner.addEventListener('touchstart', function(e) {
        startX = e.targetTouches[0].clientX;
    });
    carouselInner.addEventListener('touchmove', function(e) {
        endX = e.targetTouches[0].clientX;
        if(endX - startX > 0) {
            // 上一张
            carousel.carousel('prev');
        } else if (endX - startX < 0) {
            // 下一张
            carousel.carousel('next');
        }
    });
    console.log(carouselInner);
})