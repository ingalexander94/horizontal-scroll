(() => {
  const d = document;
  const SWIPPER = d.querySelector(".swiper-wrapper");
  const SLIDERS = d.querySelectorAll(".swiper-slide");
  const NUMBERS = d.querySelectorAll(".paso-number-content");
  const PAGE2 = d.querySelector(".page-2");
  let current = 0;

  const debounce = (fn) => {
    let timer;
    return function () {
      let context = this;
      let args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, 300);
    };
  };

  const scrollSection = (e) => {
    e.preventDefault();
    before = current;
    index = e.deltaY < 0 ? current - 1 : current + 1;
    current =
      index < 0 ? SLIDERS.length - 1 : index > SLIDERS.length - 1 ? 2 : index;
    if (index > SLIDERS.length - 1) updateView();
    else removeClassActive(before);
  };

  const activateDirect = (e, i) => {
    e.preventDefault();
    const before = current;
    current = i;
    removeClassActive(before);
  };

  const removeClassActive = (before) => {
    SLIDERS[before].classList.remove("active");
    SLIDERS[current].classList.add("active");
  };

  const updateView = (show = true) => {
    if (show) {
      PAGE2.classList.remove("hide");
      PAGE2.classList.add("show");
      setTimeout(
        () =>
          PAGE2.scrollIntoView({
            behavior: "smooth",
          }),
        200
      );
    } else {
      PAGE2.classList.remove("show");
      PAGE2.classList.add("hide");
    }
  };

  window.onscroll = () => window.scrollY === 0 && updateView(false);

  SWIPPER.addEventListener("wheel", debounce(scrollSection));

  NUMBERS.forEach((element, i) => {
    element.addEventListener(
      "click",
      debounce((e) => activateDirect(e, i))
    );
  });
})();
