const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);



// DOM CONTENT LOADED
document.addEventListener("DOMContentLoaded", function () {
  new WOW().init();

  //prevent drag img and a
  const imagesAndLinks = document.querySelectorAll("img, a");
  if (imagesAndLinks) {
    imagesAndLinks.forEach(function (item, i, arr) {
      item.addEventListener("dragstart", function (e) {
        e.preventDefault();
      });
    });
  }

  // detect mobile device
  const devices = new RegExp("Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini", "i");
  if (devices.test(navigator.userAgent)) {
    $("body").addClass("mobile-device");
  }

  const itemsTickerContainer = document.querySelector('.hero__ticker-text .text-wrap');
  const itemsTicker = itemsTickerContainer.innerHTML;
  itemsTickerContainer.innerHTML += itemsTicker;

  let movieSlider = new Swiper(".js-movie__slider", {
    slidesPerView: "auto",
    loop: true,
    centeredSlides: true,
    spaceBetween: remToPx(0.94),
    speed: 300,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
      pauseOnMouseEnter: false,
    },
    pagination: {
      el: '.js-movie__slider .swiper-pagination',
      type: 'bullets',
    },
    breakpoints: {
      320: {
        autoplay: false,
      },
      720: {
        allowTouchMove: false,
        speed: 8000,
        spaceBetween: remToPx(3.75),
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        },
        pagination: false
      }
    }
  });

  // let movieSlider = new Swiper(".js-movie__slider", {
  //   slidesPerView: "auto",
  //   loop: true,
  //   centeredSlides: true,
  //   spaceBetween: remToPx(0.94),
  //   speed: 300,
  //   pagination: {
  //     el: '.js-movie__slider .swiper-pagination',
  //     type: 'bullets',
  //   },
  //   autoplay: false,
  //   breakpoints: {
  //     720: {
  //       allowTouchMove: false,
  //       speed: 8000,
  //       spaceBetween: remToPx(3.75),
  //       loop: true,
  //       autoplay: {
  //         delay: 0,
  //         disableOnInteraction: false,
  //         pauseOnMouseEnter: false,
  //       },
  //       // pagination: false
  //     }
  //   }
  // });


  if(window.innerWidth <= 720) {
    let movieSlider = new Swiper(".three-games__items", {
      slidesPerView: "auto",
      loop: true,
      centeredSlides: true,
      spaceBetween: remToPx(0.94),
      speed: 500,
      pagination: {
        el: '.three-games__items .swiper-pagination',
        type: 'bullets',
      },
    });
  }



  function startTimer(counter) {
    const hoursToAdd = parseInt(counter.getAttribute('data-hours'), 10);
    const now = new Date();
    const nextMidnight = new Date(now);
    nextMidnight.setHours(24, 0, 0, 0);

    const endTime = new Date(nextMidnight.getTime() + hoursToAdd * 60 * 60 * 1000);

    function updateCounter() {
      const now = new Date();
      const timeRemaining = endTime - now;

      if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        counter.querySelector('.hours').textContent = '00';
        counter.querySelector('.minutes').textContent = '00';
        counter.querySelector('.seconds').textContent = '00';
        return;
      }
      
      const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
      
      counter.querySelector('.hours').textContent = String(hours).padStart(2, '0');
      counter.querySelector('.minutes').textContent = String(minutes).padStart(2, '0');
      counter.querySelector('.seconds').textContent = String(seconds).padStart(2, '0');
    }

    const timerInterval = setInterval(updateCounter, 1000);
    updateCounter();
  }

  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    startTimer(counter);
  });



  if(window.innerWidth > 1024) {
    $('.hero__left-card img, .hero__right-card img').tilt({
      // axis: 'x',
      perspective: remToPx(20),
      maxTilt: -5,
      reset: false
    });

    $('.three-games__item').tilt({
      perspective: remToPx(30),
      maxTilt: -3,
    });
  }

  


  if(window.innerWidth > 720) {
    
    // parallax effect
    const threeGamesItems = document.querySelector('.three-games__items');
    const bgElementsGames = threeGamesItems.querySelectorAll('.bg-element');

    const parallaxEffectGames = (progress) => {
      bgElementsGames.forEach((element, index) => {
        // const speed = 0.3 + (index * 0.1); // Коефіцієнт швидкості для різних елементів
        const speed = 0.5;
        const offset = progress * speed * 100;
        element.style.transform = `translateY(${offset}px)`;
      });
    };

    const observerGames = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          window.addEventListener('scroll', onScrollGames);
        } else {
          window.removeEventListener('scroll', onScrollGames);
        }
      });
    }, {
      root: null,
      threshold: 0 // Спрацьовує коли секція з'являється у viewport
    });

    const onScrollGames = () => {
      const rect = threeGamesItems.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        parallaxEffectGames(progress);
      }
    };

    observerGames.observe(threeGamesItems);




    const goldenPack = document.querySelector('.golden-pack');
    const goldenPackLayer2 = goldenPack.querySelector('.layer-2');

    const parallaxEffectGolden = (progress) => {
      const speed = 0.6;
      const offset = progress * speed * 100;
      goldenPackLayer2.style.transform = `translateY(${offset}px)`;
    };

    const observerGolden = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          window.addEventListener('scroll', onScrollGolden);
        } else {
          window.removeEventListener('scroll', onScrollGolden);
        }
      });
    }, {
      root: null,
      threshold: 0
    });

    const onScrollGolden = () => {
      const rect = goldenPack.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        parallaxEffectGolden(progress);
      }
    };

    observerGolden.observe(goldenPack);

  }


  


  $('.js-open-modal-form').on('click', function(e) {
    e.preventDefault();
    Fancybox.show([{ src: "#modal-form", type: "inline" }]);
  });









});
// *END* DOM CONTENT LOADED

// function to convert PX to REM
function pxToRem(px) {
  const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  return px / fontSize;
}

// functino to convert REM to PX
function remToPx(rem) {
  const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  return rem * fontSize;
}

// functions for disabling scroll
function disableScroll() {
  document.body.style.overflow = "hidden";
}
function enableScroll() {
  document.body.style.overflow = "";
}



function handleTickInit(tick) {
  const now = new Date();
  const nextMidnight = new Date(now);
  nextMidnight.setHours(24, 0, 0, 0);
  const endTime = new Date(nextMidnight.getTime() + 48 * 60 * 60 * 1000);

  const timeDifference = endTime.getTime() - now.getTime();
  const hoursDifference = timeDifference / (1000 * 60 * 60);
  
  let offset = new Date( localStorage.getItem('countdown-offset') || new Date() );
  localStorage.setItem('countdown-offset', offset);
  let timeDuration = Tick.helper.duration(hoursDifference, 'hours');
  let deadline = new Date( offset.setMilliseconds( offset.getMilliseconds() + timeDuration ) );

  let counter = Tick.count.down(deadline, { format: ['d', 'h' ,'m', 's'] } );

  counter.onupdate = function(value) {
    tick.value = value;
  };
}
