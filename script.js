(() => {
  const d = document;
  const SWIPPER = d.querySelector(".swiper-wrapper");
  const SLIDERS = d.querySelectorAll(".swiper-slide");
  const NUMBERS = d.querySelectorAll(".paso-number-content");
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
      index < 0 ? SLIDERS.length - 1 : index > SLIDERS.length - 1 ? 0 : index;
    removeClassActive(before);
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

  SWIPPER.addEventListener("wheel", debounce(scrollSection));

  NUMBERS.forEach((element, i) => {
    element.addEventListener(
      "click",
      debounce((e) => activateDirect(e, i))
    );
  });
})();
