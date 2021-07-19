import "slick-carousel/slick/slick"
import lazyframe from "lazyframe"
const $ = require(`jquery`)
const Parsley = require(`parsleyjs`)
const WOW = require(`wowjs`)

window.wow = new WOW.WOW({
    live: false
})

let videoWasPlayedFlag = false

const inView = function (element) {
    const win = $(window)
    const obj = element
    const scrollPosition = win.scrollTop()
    const visibleArea = win.scrollTop() + win.height()
    const objEndPos = obj.offset().top

    return visibleArea >= objEndPos && scrollPosition <= objEndPos
}

const loadVideo = (selector) => {
    const lazyVideos = [].slice.call(document.querySelectorAll(selector))

    lazyVideos.forEach(function (lazyVideo) {
        lazyVideo.children[0].src = lazyVideo.children[0].dataset.src
        lazyVideo.load()
    })
}

const playVideo = (selector) => {
    const video = document.querySelector(selector)
    if (video !== null) {
        loadVideo(selector)

        window.addEventListener(`scroll`, () => {
            if (!videoWasPlayedFlag && inView($(video))) {
                video.play()
                videoWasPlayedFlag = true
            }
        })
    }
}

const resetFormatsSlider = (selector) => {
    // $(selector)[0].pause()
    $(selector)[0].load()
    $(selector)[0].play()
}

$(`.js-change-formats`).on(`click`, function () {
    const elem = $(this)
    const formats = $(this).attr(`data-view`)
    if (formats === `desktop`) {
        $(`.slider-key-formats--desktop`).show()
        $(`.slider-key-formats--mobile`).hide()
        $(`.js-slider-key-formats-navigation`).slick(`refresh`)
        $(`.js-slider-key-formats-viewport`).slick(`refresh`)
        resetFormatsSlider(`.features__image--0`)
    } else if (formats === `mobile`) {
        $(`.slider-key-formats--desktop`).hide()
        $(`.slider-key-formats--mobile`).show()
        $(`.js-slider-key-formats-viewport-mobile`).slick(`refresh`)
        $(`.js-slider-key-formats-navigation-mobile`).slick(`refresh`)
        resetFormatsSlider(`.features__image-mobile--0`)
    }
    $(`.js-change-formats.is-active`).removeClass(`is-active`)
    elem.addClass(`is-active`)
})

$(document).ready(() => {
    window.wow.init()

    $(`#copyright-year`).text(new Date().getFullYear())

    playVideo(`.js-ready-video`)
    playVideo(`.js-ready-video--mobile`)

    if ($(`#sign_up_form`).length) {
        // parsley validator
        $(`.form--sign-up`).parsley()
    }

    $(`.hamburger`).click(function () {
        $(`.hamburger`).toggleClass(`is-active`)
        $(`body`).toggleClass(`menu-active-js`)
    })

    $(`.js-slider-key-features-viewport`).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        draggable: false,
        fade: true,
        cssEase: `linear`,
        speed: 150,
        focusOnSelect: true,
        dots: false,
        accessibility: false,
        asNavFor: `.js-slider-key-features-navigation`
    })

    $(`.js-slider-key-features-navigation`).slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: `.js-slider-key-features-viewport`,
        draggable: true,
        dots: false,
        focusOnSelect: true,
        accessibility: false,
        swipeToSlide: true,
        responsive: [{
            breakpoint: 960,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                arrows: false,
                dots: false,
                infinite: true,
                variableWidth: true,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: true,
                arrows: false,
                dots: false,
                infinite: false
            }
        }]
    })

    $(`.slider-key-features__navigation-item`).on(`focusin`, function (event) {
        const slideIndex = $(this).attr(`data-slide-index`)
        const sliderNavigation = $(`.js-slider-key-features-navigation`)
        const sliderViewport = $(`.js-slider-key-features-viewport`)
        sliderNavigation[0].slick.slickGoTo(parseInt(slideIndex))
        sliderViewport[0].slick.slickGoTo(parseInt(slideIndex))
    })

    $(`.js-slider-key-formats-viewport`).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        draggable: false,
        fade: true,
        cssEase: `linear`,
        speed: 150,
        focusOnSelect: true,
        dots: false,
        accessibility: false,
        asNavFor: `.js-slider-key-formats-navigation`
    })

    $(`.js-slider-key-formats-viewport`).on(`afterChange`, function (event, slick, currentSlide) {
        resetFormatsSlider(`.features__image--${currentSlide}`)
    })

    $(`.js-slider-key-formats-navigation`).slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: `.js-slider-key-formats-viewport`,
        draggable: false,
        dots: false,
        focusOnSelect: true,
        accessibility: false,
        variableWidth: true
    })

    $(`.slider-key-formats__navigation-item`).on(`focusin`, function (event) {
        const slideIndex = $(this).attr(`data-slide-format-index`)
        const sliderNavigation = $(`.js-slider-key-formats-navigation`)
        const sliderViewport = $(`.js-slider-key-formats-viewport`)
        sliderNavigation[0].slick.slickGoTo(parseInt(slideIndex))
        sliderViewport[0].slick.slickGoTo(parseInt(slideIndex))
    })

    // /
    $(`.js-slider-key-formats-viewport-mobile`).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        draggable: false,
        fade: true,
        cssEase: `linear`,
        speed: 150,
        focusOnSelect: true,
        dots: false,
        accessibility: false,
        asNavFor: `.js-slider-key-formats-navigation-mobile`
    })

    $(`.js-slider-key-formats-viewport-mobile`).on(`afterChange`, function (event, slick, currentSlide) {
        resetFormatsSlider(`.features__image-mobile--${currentSlide}`)
    })

    $(`.js-slider-key-formats-navigation-mobile`).slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: `.js-slider-key-formats-viewport-mobile`,
        draggable: false,
        dots: false,
        focusOnSelect: true,
        accessibility: false,
        variableWidth: true
    })
    // /


    $(`.js-timeline-carousel`).slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        arrows: false,
        adaptiveHeight: true,
        speed: 600,
        infinite: true,
        cssEase: `cubic-bezier(0.7, 0, 0.3, 1)`,
        touchThreshold: 100,
        variableWidth: true,
        swipeToSlide: true,
        responsive: [{
            breakpoint: 960,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                variableWidth: false,
            }
        }]
    })

    const nextArrow = $(`.slider-nav-arrow .btn-next-arrow`)
    const prevArrow = $(`.slider-nav-arrow .btn-prev-arrow`)
    const sliderSingle = $(`.slider-single`)

    nextArrow.click(function (e) {
        sliderSingle.slick(`slickNext`)
    })
    prevArrow.click(function (e) {
        sliderSingle.slick(`slickPrev`)
    })

    if ($(`.menu-navigation`).length) {
        $(`.menu-navigation`).on(`click`, `a`, function (event) {
            event.preventDefault()
            const id = $(this).attr(`href`)
            const top = $(id).offset().top - 80
            $(`body,html`).animate({ scrollTop: top }, 800)
            $(`body`).removeClass(`menu-active-js`)
            $(`.hamburger`).removeClass(`is-active`)
        })
    }

    if ($(`.sticky`).length) {
        $(window).scroll(function () {
            const sticky = $(`.sticky`)
            const scroll = $(window).scrollTop()
            const stickyOffset = $(`.page-section--business`).offset().top

            if (scroll >= stickyOffset) {
                sticky.addClass(`fixed`)
            } else {
                sticky.removeClass(`fixed`)
            }
        })
    }

    // lazyframe library for youtube iframe
    const element = $(`.video-player__lazyframe`)
    lazyframe(element, {
        onAppend: (iframe) => {
            $(iframe).attr(`allow`, `autoplay`)
        }
    })

    $(element).on(`keydown`, function (event) {
        const keycode = (event.keyCode ? event.keyCode : event.which)
        if (keycode === 13) {
            $(this).trigger(`click`)
        }
    })
})

$(`.select-slider-features`).on(`click`, `.select__head`, function () {
    if ($(this).hasClass(`open`)) {
        $(this).removeClass(`open`)
        $(this).next().fadeOut()
    } else {
        $(`.select__head`).removeClass(`open`)
        $(`.select__list`).fadeOut()
        $(this).addClass(`open`)
        $(this).next().fadeIn()
    }

    const selectedOption = $(`.select__head`).attr(`data-attr-feature`)
    $(`li.select__item`).each(function (index) {
        $(this).attr(`data-feature`) === selectedOption ? $(this).hide() : $(this).show()
    })
})

$(`.select-slider-features`).on(`click`, `.select__item`, function () {
    const elem = $(this)
    $(`.select__head`).removeClass(`open`)
    elem.parent().fadeOut()
    $(`.select__head span`).text(elem.text())
    $(`.select__head`).attr(`data-attr-feature`, elem.attr(`data-feature`))
})

$(`.select-slider-formats`).on(`click`, `.select__head-formats`, function () {
    if ($(this).hasClass(`open`)) {
        $(this).removeClass(`open`)
        $(this).next().fadeOut()
    } else {
        $(`.select__head-formats`).removeClass(`open`)
        $(`.select__list-formats`).fadeOut()
        $(this).addClass(`open`)
        $(this).next().fadeIn()
    }

    const selectedOption = $(`.select__head-formats`).attr(`data-attr-format`)
    $(`li.select__item-formats`).each(function (index) {
        $(this).attr(`data-format`) === selectedOption ? $(this).hide() : $(this).show()
    })
})

$(`.select-slider-formats`).on(`click`, `.select__item-formats`, function () {
    const elem = $(this)
    $(`.select__head-formats`).removeClass(`open`)
    elem.parent().fadeOut()
    $(`.select__head-formats span`).text(elem.text())

    const slideIndex = $(this).attr(`data-slide-format-index`)
    const sliderNavigation = $(`.js-slider-key-formats-navigation`)
    const sliderViewport = $(`.js-slider-key-formats-viewport`)
    sliderNavigation[0].slick.slickGoTo(parseInt(slideIndex))
    sliderViewport[0].slick.slickGoTo(parseInt(slideIndex))
    $(`.select__head-formats`).attr(`data-attr-format`, elem.attr(`data-format`))
})

$(`.select-slider-formats--mobile`).on(`click`, `.select__item-formats--mobile`, function () {
  const elem = $(this)
  $(`.select__head-formats--mobile`).removeClass(`open`)
  elem.parent().fadeOut()
  $(`.select__head-formats--mobile span`).text(elem.text())

  const slideIndex = $(this).attr(`data-slide-format-index`)
  const sliderNavigation = $(`.js-slider-key-formats-navigation-mobile`)
  const sliderViewport = $(`.js-slider-key-formats-viewport-mobile`)
  sliderNavigation[0].slick.slickGoTo(parseInt(slideIndex))
  sliderViewport[0].slick.slickGoTo(parseInt(slideIndex))
  $(`.select__head-formats--mobile`).attr(`data-attr-format`, elem.attr(`data-format`))
})

$(document).click(function (e) {
    // decect click for mobile select in sliders
    if (!$(e.target).closest(`.select-slider-features`).length) {
        $(`.select__head`).removeClass(`open`)
        $(`.select__list`).fadeOut()
    }

    if (!$(e.target).closest(`.select-slider-formats`).length) {
        $(`.select__head-formats`).removeClass(`open`)
        $(`.select__list-formats`).fadeOut()
    }
})
