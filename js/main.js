document.addEventListener("DOMContentLoaded", function () {
    const btnSearchMobile = document.querySelector('.search_btn_mobile');
    const formSearch = document.querySelector('.header__search');
    const formSearchClose = document.querySelector('.search_close');

    if(btnSearchMobile) {
        btnSearchMobile.addEventListener('click', function(){
            formSearch.classList.add('opened');
        })

        formSearchClose.addEventListener('click', function(){
            formSearch.classList.remove('opened');
        })
    }

    const productItems = document.querySelectorAll('.products_section .inner .item');

    if(productItems.length) {
        productItems.forEach(item => {
            if(!item.classList.contains('more')) {
                item.addEventListener('mouseenter', () => {
                    productItems.forEach(el => {
                        el.classList.remove('active');
                    });
                    item.classList.add('active');
                });
            }
        });
    }

    const video = document.querySelector('.about_video video');
    if(video) {
        const playBtn = document.querySelector('.about_video__play');

        playBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playBtn.classList.add('playing');
            } else {
                video.pause();
                playBtn.classList.remove('playing');
            }
        });

        video.addEventListener('ended', () => {
            playBtn.classList.remove('playing');
        });
    }

    const preimItems = document.querySelectorAll('.preim_item');
    if (preimItems.length) {
        const mainImg = document.querySelector('.preim_img img');

        const updateSigns = () => {
            preimItems.forEach(i => {
                i.querySelector('.preim_item__plus').textContent = i.classList.contains('active') ? '−' : '+';
            });
        };

        preimItems.forEach(item => {
            item.querySelector('.preim_item__header').addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                preimItems.forEach(i => i.classList.remove('active'));
                if (!isActive) {
                    item.classList.add('active');
                    if (mainImg && item.dataset.img) {
                        mainImg.src = item.dataset.img;
                    }
                }
                updateSigns();
            });
        });
        updateSigns();

        const firstActive = document.querySelector('.preim_item.active');
        if (firstActive && mainImg && firstActive.dataset.img) {
            mainImg.src = firstActive.dataset.img;
        }
    }

    if (document.querySelector('.certificat_grid')) {
        const lightbox = new PhotoSwipeLightbox({
            gallery: '.certificat_grid',
            children: 'a.certificat_item',
            pswpModule: PhotoSwipe
        });

        lightbox.addFilter('domItemData', (itemData, element, linkEl) => {
            const img = linkEl.querySelector('img');
            if (img && img.naturalWidth) {
                itemData.w = img.naturalWidth;
                itemData.h = img.naturalHeight;
            }
            return itemData;
        });

        lightbox.on('contentLoad', (e) => {
            const { content } = e;
            if (content.type === 'image' && (!content.data.w || !content.data.h)) {
                e.preventDefault();
                const img = new Image();
                content.element = img;
                img.onload = () => {
                    content.data.w = img.naturalWidth;
                    content.data.h = img.naturalHeight;
                    content.state = 'loaded';
                    lightbox.pswp.updateSize(true);
                };
                img.src = content.data.src;
            }
        });

        lightbox.init();
    }

    if (document.querySelector('.polymers_swiper')) {
        new Swiper('.polymers_swiper', {
            slidesPerView: 2,
            spaceBetween: 30,
            pagination: {
                el: '.polymers_pagination',
                clickable: true,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 16,
                },
                1041: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                }
            }
        });
    }
});


$(function(){

	
	var $body = $(document.body),
      	$html = $(document.documentElement);

    var menuBtn = $('.burger'),
        menuWrapper = $('.menu_burger'),
        menuClose = $('.menuClose'),        
        openedMenu = 'opened',
        overflowHidden = 'oveflowHidden';

    menuBtn.on("click", function(event) {
        menuWrapper.toggleClass(openedMenu);
        menuBtn.toggleClass(openedMenu);
        $html.toggleClass(overflowHidden);
        $html.toggleClass('open_menu');
    });
    menuClose.on("click", function(event) {
        menuWrapper.removeClass(openedMenu);
        menuBtn.removeClass(openedMenu);
        $html.removeClass(overflowHidden);
        $html.removeClass('open_menu');
    });

    $(document).on('click touchstart', function(e){
        if( $(e.target).closest(menuBtn).length || $(e.target).closest(menuWrapper).length) 
          return;
        if (menuBtn.hasClass(openedMenu)){
            menuWrapper.removeClass(openedMenu);
            menuBtn.removeClass(openedMenu);
            $html.removeClass(overflowHidden);
            $html.removeClass('open_menu');
        }
    });

  	$('input.phone_input').on('blur', function(){
        let phoneWrapper = $(this).parents('.field'),
            thisNumber = $(this).val().split(''),
            lastIndex = thisNumber.length-1,
            lastItem = thisNumber[lastIndex];
        if (isNaN(lastItem)){
            phoneWrapper.addClass('incorrect-phone');
            if (!phoneWrapper.find('.empty_number').length) {
                phoneWrapper.append('<div class="error_text empty_number">Введите номер телефона полностью </div>');
            }
            //$(this).val('');
        } else {
            phoneWrapper.removeClass('incorrect-phone');
            phoneWrapper.removeClass('error');
            phoneWrapper.find('.empty_number').remove();
        }
    });

    $('input').on('blur', function(){
    	if ($(this).parents('.field').hasClass('error')){
    		$(this).parents('.field').removeClass('error');
    		$(this).parents('.field').find('.error_text').remove();
    	}
    })

    //$('.phone_input').inputmask("+7 (999) 999-99-99");

    $('input[type="checkbox"]').on('change', function (event) {

        if (!$(this).closest('.field.required').hasClass('no_checked') && !$(this).is(":checked")) {
            $(this).closest('.field.required').addClass('no_checked');
        } else {
            $(this).closest('.field.required').removeClass('no_checked');
        }
    })

    $('.email_input').on('blur', function () {
        let phoneWrapper = $(this).parents('.field');
        let email = $(this).val();

        if (email.length > 0
            && (email.match(/.+?\@.+/g) || []).length !== 1) {
            phoneWrapper.addClass('incorrect-phone');
            if (!phoneWrapper.find('.empty_number').length) {
                phoneWrapper.append('<div class="error_text empty_number">Вы ввели некорректный e-mail</div>');
            }
        } else {
            phoneWrapper.removeClass('incorrect-phone');
            phoneWrapper.remove('empty_number');
        }
    });

    $('.form_button').on('click', function(e){
        $(this).parents('form').find('.field').each(function(){

            var valueInput = $(this).find('input').val();
            if ($(this).hasClass('required') && valueInput == ''){
                $(this).addClass('error');
                if (!$(this).find('.error_text').length) {
                    $(this).append('<div class="error_text">это поле обязательно для заполнения</div>');
                }
            }

            var valueTextarea = $(this).find('textarea').val();
            if ($(this).hasClass('required') && valueTextarea == ''){
                $(this).addClass('error');
                if (!$(this).find('.error_text').length) {
                    $(this).append('<div class="error_text">это поле обязательно для заполнения</div>');
                }
            }

            if ($(this).hasClass('no_checked')) {
                $(this).addClass('error');
                if (!$(this).find('.error_text').length) {
                    $(this).append('<div class="error_text">это поле обязательно для заполнения</div>');
                }
            }

            var value = $(this).find('select').val();
            var selectedOptionText = $(this).find('select option:selected').text();
            var check = value  != selectedOptionText;

            $(this).find('select option').each(function() {

                if (check == false) {
                    $(this).parents('.field').addClass('error');
                    if (!$(this).parents('.field').find('.error_text').length) {
                        $(this).parents('.field').append('<div class="error_text">это поле обязательно для заполнения</div>');
                    }
                } else {
                    if ($(this).parents('.field').find('.error_text').length) {
                        $(this).parents('.field').removeClass('error');
                        $(this).parents('.field').find('.error_text').remove();
                    }
                }
            });
        })

        if ($(this).closest('form').find('.field').hasClass('incorrect-phone') || $(this).closest('form').find('.field').hasClass('error')){
            e.preventDefault();
        } else {
             e.preventDefault();
        }
    });

    
});





