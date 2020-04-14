$(() => {
    // seamedSwiper()
    swiperSeamless()

    // 有缝轮播方案
    function seamedSwiper() {
        let $image = $('.image')
        let $img = $('.image img')
        let $dots = $('.controller2 span')
        let n = 0

        addEvents1('.forward', '.backward', $img.length, $image)    //controller1事件
        addEvents2($dots)  //controller2事件

        // 自动轮播
        function autoSlider() {
            let id = window.setInterval(() => {
                $dots.eq(n).trigger('click');
                n++
                n = (n === 4) ? 0 : n
            }, 2500)
            return id
        }
        // cotroller1控制逻辑
        function addEvents1(selector1, selector2, length, node) {
            let n = 0
            let $forward = $(selector1)
            let $backward = $(selector2)
            $forward.on('click', () => {
                n++
                n = (n >= length) ? length - 1 : n
                node.css('transform', 'translateX(' + 300 * n * (-1) + 'px)')
            })
            $backward.on('click', () => {
                n--
                n = (n < 0) ? 0 : n
                node.css('transform', 'translateX(' + 300 * n * (-1) + 'px)')
            })
        }
        // cotroller2控制逻辑
        function addEvents2(node) {
            node.on('click', (e) => {
                addActive(e.currentTarget)
                let index = $(e.currentTarget).index()
                $image.css('transform', 'translateX(' + index * -300 + 'px)')
                n = index
            })
            let timeID = autoSlider();
            $('.image-wrapper').on('mouseenter', (e) => {
                window.clearInterval(timeID)
            })
            $('.image-wrapper').on('mouseleave', (e) => {
                timeID = autoSlider();
            })
        }
        // 给controller2添加active样式
        function addActive(node) {
            $(node).addClass('active').siblings().removeClass('active')
        }
    }
    // 无缝轮播方案
    function swiperSeamless() {
        let $image = $('.image')
        let $img = $('.image img')
        let $dots = $('.controller2 span')
        let n = 0

        addEvents1('.forward', '.backward', $img.length, $image)    //controller1事件
        addEvents2($dots)  //controller2事件

        // 自动轮播
        function autoSlider() {
            let id = window.setInterval(() => {
                $dots.eq(n % 4).trigger('click');
                n++
                n = (n === 200) ? 100 : n
            }, 2500)
            return id
        }
        // cotroller1控制逻辑
        function addEvents1(selector1, selector2, length, node) {
            let n = 0
            let $forward = $(selector1)
            let $backward = $(selector2)
            $forward.on('click', () => {
                n++
                n = (n >= length) ? length - 1 : n
                node.css('transform', 'translateX(' + 300 * n * (-1) + 'px)')
            })
            $backward.on('click', () => {
                n--
                n = (n < 0) ? 0 : n
                node.css('transform', 'translateX(' + 300 * n * (-1) + 'px)')
            })
        }
        // cotroller2控制逻辑
        function addEvents2(node) {
            node.on('click', (e) => {
                addActive(e.currentTarget)
                let index = $(e.currentTarget).index()
                if (n > 3) {
                    $image.css({'transform':  'translateX(-1200px)'})
                    $image.one('transitionend',(e)=>{
                        $image.css({'transform': 'translateX(0)','transition-duration': "0ms"})
                    })
                }
                else{
                    $image.css({'transform': 'translateX(' + index * -300 + 'px)','transition-duration': "500ms"})
                }
                n = index
            })
            let timeID = autoSlider();
            $('.image-wrapper').on('mouseenter', (e) => {
                window.clearInterval(timeID)
            })
            $('.image-wrapper').on('mouseleave', (e) => {
                timeID = autoSlider();
            })
        }
        // 给controller2添加active样式
        function addActive(node) {
            $(node).addClass('active').siblings().removeClass('active')
        }

    }
})