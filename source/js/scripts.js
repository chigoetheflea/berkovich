"use strict";

const MENU = `.js-menu`;
const MENU_BUTTON = `.js-menu-button`;
const MENU_CLOSE = `.js-menu-close`;
const MENU_ACTIVE_CLASS = `top-menu--active`;
const MENU_CLOSED_CLASS = `top-menu--closed`;
const CLASS_REMOVING_TIME = 700;

const SLIDER_CLASSES = [`peppermint`, `peppermint-inactive`];
const SLIDER = `.js-slider`;
const SLIDER_NAV = `.js-slider-navigation`;
const SLIDER_PREV = `.js-slider-prev`;
const SLIDER_NEXT = `.js-slider-next`;
const SLIDER_DOTS = `.js-slider-dots`;
const SLIDER_ITEMS = `.slider__item`;
const SLIDER_NAV_TEXT_PREV = `.js-slider-nav-text-prev`;
const SLIDER_NAV_TEXT_NEXT = `.js-slider-nav-text-next`;
const SLIDER_ITEM_TITLE = `.js-slide-title`;
const SLIDER_NAV_TEXT_CHANGE_CLASS = `slider__navigation-text--change`;

const MODAL = `.js-modal`;
const MODAL_CLOSE = `.js-modal-close`;
const MODAL_BUTTON = `.js-modal-button`;
const MODAL_ACTIVE_CLASS = `modal--active`;
const MODAL_CLOSED_CLASS = `modal--closed`;

const SCROLL_BUTTON_CLASS = `.js-scroll`;

const LOADING = `.js-loading`;
const LOADING_HIDDEN_CLASS = `loading--hidden`;

const SCROLL_OFFSET = -50;

const FORM = `.form`;
const FORM_VALIDATION = `.js-form`;
const FORM_RESULT = `.js-result`;
const FORM_INPUT = `.form__input`;
const FORM_RESULT_ACTIVE_CLASS = `form__result--active`;
const FORM_RESULT_TIMEOUT = 2000;
const FORM_ALERT_ERROR = `Ошибка отправки!`;
const FORM_ALERT_SUCCESS = `Отправлено!`;
const FORM_METHOD = `POST`;
const FORM_SERVER_URL = (typeof phpHandler !== `undefined` ) ? phpHandler.url : `https://n-bpartners.ru/wp-content/themes/berkovich/lib/mail_handler.php`;
const FORM_FIELD_DEFAULT_VALUE = ``;
const FORM_SUBMIT = `.js-submit`;
const FORM_AGREE = `.js-agree`;
const FORM_DATE = '.js-date-picker';
const FORM_DATE_FORMAT = `F j, Y`;
const FORM_MASK = `.js-masked-input`;

const VALIDATE_FIELD = `[data-validate='true']`;
const VALIDATE_TRUE_CLASS = `form__input--success`;
const VALIDATE_FALSE_CLASS = `form__input--error`;

const Test = {
  REQUIRED: `required`,
  PHONE: `phone`,
  EMAIL: `email`,
  TAGS: `tags`,
};

const MaskTemplates = {
  phone: new Inputmask(`+7 (999) 999-99-99`),
  email: new Inputmask({regex: '[a-zA-Z0-9]+@[a-zA-Z]+\.[a-z]+'}),
};

const SlidersSettings = {
  speed: 250,
  touchSpeed: 250,
  stopSlideshowAfterInteraction: true,
  dots: true,
  isResponsive: false,
};

const Resolution = {
  PC: 1200,
  TABLET: 560,
  MOBILE: 0,
};

const SliderItem = {
  PC: 1,
  TABLET: 1,
  MOBILE: 1,
};

const switchModalClasses = (element, classes) => {
  const {active, closed} = classes;
  element = element.classList;

  element.remove(active);
  element.add(closed);

  setTimeout(() => {
    element.remove(closed);
  }, CLASS_REMOVING_TIME);
};

document.addEventListener(`DOMContentLoaded`, function() {

  setTimeout(() => {
    document.querySelector(LOADING).classList.add(LOADING_HIDDEN_CLASS);
  }, 300);

  /* menu */

  const menuWrapper = document.querySelector(MENU);
  const isMenuOpen = (menu) => menu.classList.contains(MENU_ACTIVE_CLASS);

  const menuButton = document.querySelector(MENU_BUTTON);
  const menuButtonClose = menuWrapper.querySelector(MENU_CLOSE);

  const openMenu = () => {
    menuWrapper.classList.add(MENU_ACTIVE_CLASS);

    menuButtonClose.addEventListener('click', closeMenu);
  };

  const closeMenu = () => {
    switchModalClasses(menuWrapper, {active: MENU_ACTIVE_CLASS, closed: MENU_CLOSED_CLASS,});

    menuButtonClose.removeEventListener(`click`, closeMenu);
  };

  if (menuButton) {
    menuButton.addEventListener(`click`, () => {
      (!isMenuOpen(menuWrapper)) ? openMenu() : closeMenu();
    });
  }

  /* menu */

  /* sliders */

  const handleSliderControlClick = (slider, sliderContainer, evt) => {
    const sliderPrev = sliderContainer.querySelector(SLIDER_PREV);
    const sliderNext = sliderContainer.querySelector(SLIDER_NEXT);

    if (evt.target === sliderPrev ) {
      slider.prev();
    }

    if (evt.target === sliderNext ) {
      slider.next();
    }
  };

  const initSlider = (sliderContainer, sliderSettings = SlidersSettings) => {
    if (sliderContainer) {
      const sliderWrapper = sliderContainer.querySelector(SLIDER);
      const sliderNavigation = sliderContainer.querySelector(SLIDER_NAV);
      const sliderDots = sliderContainer.querySelector(SLIDER_DOTS);

      sliderWrapper.classList.add(...SLIDER_CLASSES);

      const slider = Peppermint(
        sliderWrapper, {
          ...sliderSettings,
          dotsContainer: sliderDots,
          onSlideChange: (slideNumber) => {
            changeSlidesNavText(sliderWrapper, sliderNavigation, slideNumber);
          },
      });

      if (sliderNavigation) {
        sliderNavigation.addEventListener(`click`, handleSliderControlClick.bind(null, slider, sliderContainer));
      }

      return slider;
    }
  };

  const changeSlidesNavText = (sliderWrapper, sliderNavigation, slideNumber) => {
    const slides = sliderWrapper.querySelectorAll(SLIDER_ITEMS);
    const slidesCount = slides.length;

    const sliderNavTextPrev = sliderNavigation.querySelector(SLIDER_NAV_TEXT_PREV);
    const sliderNavTextNext = sliderNavigation.querySelector(SLIDER_NAV_TEXT_NEXT);

    const prevSlide = (slideNumber === 0) ? slidesCount - 1 : slideNumber - 1;
    const nextSlide = (slideNumber === slidesCount - 1) ? 0 : slideNumber + 1;

    const prevSlideText = slides[prevSlide].querySelector(SLIDER_ITEM_TITLE).textContent;
    const nextSlideText = slides[nextSlide].querySelector(SLIDER_ITEM_TITLE).textContent;

    sliderNavTextPrev.classList.add(SLIDER_NAV_TEXT_CHANGE_CLASS);
    sliderNavTextNext.classList.add(SLIDER_NAV_TEXT_CHANGE_CLASS);

    setTimeout(() => {
      sliderNavTextPrev.textContent = prevSlideText;
      sliderNavTextNext.textContent = nextSlideText;

      sliderNavTextPrev.classList.remove(SLIDER_NAV_TEXT_CHANGE_CLASS);
      sliderNavTextNext.classList.remove(SLIDER_NAV_TEXT_CHANGE_CLASS);
    }, 300);

  };

  const sliderServices = initSlider(document.querySelector(`.js-slider-sevices`), {
    ...SlidersSettings,
    slideshow: false,
    slideshowInterval: 2500,
    dots: false,
  });

  /* sliders */

  /* modal */

  const closeModal = (modal, button) => {
    switchModalClasses(modal, {active: MODAL_ACTIVE_CLASS, closed: MODAL_CLOSED_CLASS,});

    button.removeEventListener(`click`, handleModalCloseClick);
  }

  const openModal = (button) => {
    const target = document.querySelector(button.dataset.target);
    const slide = button.dataset.slide;
    const modalClose = target.querySelector(MODAL_CLOSE);

    if (slide) {
      sliderServices.slideTo(parseInt(slide));
    }

    if (target) {
      target.classList.add(MODAL_ACTIVE_CLASS);

      modalClose.addEventListener(`click`, handleModalCloseClick);
    }
  };

  const handleModalCloseClick = (evt) => {
    evt.preventDefault();

    const modal = evt.target.closest(MODAL);

    closeModal(modal, evt.target);
  }

  const handleModalButtonClick = (evt) => {
    evt.preventDefault();

    openModal(evt.target);
  };

  const modalButtons = Array.from(document.querySelectorAll(MODAL_BUTTON));

  if (modalButtons.length) {
    modalButtons.map((modalButton) => {
      modalButton.addEventListener(`click`, handleModalButtonClick);
    });
  }

  /* modal */

  /* scroll */

  const scrollButtons = Array.from(document.querySelectorAll(SCROLL_BUTTON_CLASS));
  const isValidAnchor = (target) => (target !== `#` && target !== ``);

  const scrollToTarget = (selector) => {
    const target = selector.getAttribute(`href`).trim();
    let position = 0;

    if (isValidAnchor(target)) {
      const targetElement = document.querySelector(selector.getAttribute(`href`).trim());

      position = targetElement.getBoundingClientRect().top;

      window.scrollBy({
        top: position,
        behavior: `smooth`,
      });

      if (isMenuOpen(menuWrapper)) {
        closeMenu();
      }
    }
  };

  const handleScrollButtonClick = (evt) => {
    evt.preventDefault();

    scrollToTarget(evt.target);
  };

  if (scrollButtons.length) {
    scrollButtons.map((scrollButton) => {
      scrollButton.addEventListener(`click`, handleScrollButtonClick);
    });
  }

  /* scroll */

  /* __ form sending */

  const clearForm = (form) => {
    const fields = Array.from(form.querySelectorAll(FORM_INPUT));
    const resultField = form.querySelector(FORM_RESULT);
    const submitButton = form.querySelector(FORM_SUBMIT);
    const formAgree = form.querySelector(FORM_AGREE);
    let fieldResetValue = FORM_FIELD_DEFAULT_VALUE;

    fields.map((field) => {
      field.value = fieldResetValue;
    });

    submitButton.disabled = true;
    formAgree.checked = false;
    resultField.classList.remove(FORM_RESULT_ACTIVE_CLASS);
  };

  const displayXHRError = (form, response) => {
    console.log(`Sending error: ${response}`);

    const resultField = form.querySelector(FORM_RESULT);
    resultField.textContent = FORM_ALERT_ERROR;
    resultField.classList.add(FORM_RESULT_ACTIVE_CLASS);

    setTimeout(() => {
      resultField.classList.remove(FORM_RESULT_ACTIVE_CLASS);
    }, FORM_RESULT_TIMEOUT);
  };

  const displayXHRSuccess = (form) => {
    console.log(`send`);

    const resultField = form.querySelector(FORM_RESULT);
    resultField.textContent = FORM_ALERT_SUCCESS;
    resultField.classList.add(FORM_RESULT_ACTIVE_CLASS);

    setTimeout(clearForm.bind(null, form), FORM_RESULT_TIMEOUT);
  };

  const sendFormData = (form) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData(form);

    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          displayXHRSuccess(form);
        } else {
          displayXHRError(form, xhr.response);
        }
      }
    };

    xhr.onerror = function() {
      displayXHRError(form);
    };

    xhr.open(FORM_METHOD, FORM_SERVER_URL);
    xhr.send(formData);
  };

  /* __ form sending */

  /* __ form check */

  const testRequired = (valueToTest) => {
    return valueToTest !== ``;
  };

  const testPhone = (valueToTest) => {
    const phoneRegExp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

    return phoneRegExp.test(valueToTest);
  };

  const testEmail = (valueToTest) => {
    const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return emailRegExp.test(valueToTest);
  };

  const testTags = (valueToTest) => {
    const tags = valueToTest.replace(/\s+/, ``).split(TAG_SEPARATOR);

    return tags.length <= 3;
  };

  const checkField = (field) => {
    const tests = Object.keys(field.dataset);
    const fieldValue = field.value;

    const testingResult = tests.every((test) => {
      let singleTestResult = true;

      switch (test) {
        case Test.REQUIRED:
          singleTestResult = testRequired(fieldValue);
          break;

        case Test.PHONE:
          singleTestResult = testPhone(fieldValue);
          break;

        case Test.EMAIL:
          singleTestResult = testEmail(fieldValue);
          break;

        case Test.TAGS:
          singleTestResult = testTags(fieldValue);
      }

      return singleTestResult;
    });

    field.classList.remove(VALIDATE_TRUE_CLASS, VALIDATE_FALSE_CLASS);

    if (testingResult) {
      field.classList.add(VALIDATE_TRUE_CLASS);
    } else {
      field.classList.add(VALIDATE_FALSE_CLASS);

      setTimeout(() => {
        field.classList.remove(VALIDATE_FALSE_CLASS);
      }, 1000);
    }

    return testingResult;
  };

  const checkForm = (formToCheck) => {
    const fieldsToCheck = Array.from(formToCheck.querySelectorAll(VALIDATE_FIELD));

    const checkPromise = new Promise((resolve, reject) => {
      const validationResult = fieldsToCheck.every((field) => {
        return checkField(field);
      });

      validationResult ? resolve(validationResult) : reject(validationResult);
    });

    checkPromise.then(
      result => result
    ).then(
      result => sendFormData(formToCheck),
      error => console.log(`no`)
    );
  };

  const handleFormSubmit = (form, evt) => {
    evt.preventDefault();

    checkForm(form);
  };

  const form = document.querySelector(FORM_VALIDATION);

  if (form) {
    form.addEventListener(`submit`, handleFormSubmit.bind(null, form));
  }

  /* __ form check */

  /* form agree */

  const changeSubmitAvailability = (checkbox) => {
    const formSubmit = document.querySelector(FORM_SUBMIT);

    formSubmit.disabled = !checkbox.checked;
  };

  const handleFormAgreeClick = (evt) => {
    changeSubmitAvailability(evt.target);
  };

  if (form) {
    const formAgreeField = form.querySelector(FORM_AGREE);

    if (formAgreeField) {
      formAgreeField.addEventListener(`click`, handleFormAgreeClick);
    } else {
      const formSubmit = document.querySelector(FORM_SUBMIT);

      formSubmit.disabled = false;
    }
  }

  /* form agree */

  /* input masks */

  const formMasks = Array.from(document.querySelectorAll(FORM_MASK));

  if (formMasks) {
    formMasks.map((formMask) => {
      const maskType = formMask.dataset.mask;

      MaskTemplates[maskType].mask(formMask);
    });
  }

  /* input masks */

  /* year */

  (()=>{
    const FOOTER_COPYRIGHT = `.js-copyright`;

    const copyright = document.querySelector(FOOTER_COPYRIGHT);

    if (copyright) {
      const date = new Date();
      const currentYear = date.getFullYear();

      copyright.textContent = currentYear;
    }
  })();

  /* year */
});
