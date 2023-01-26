function setFormHandlers() {
  function getInitialFormDataState() {
    return {
      donate: 0,
      email: "",
      frequency: "",
      name: "",
      payment: "",
      sum: 0,
      offerAgreed: true,
      personalDataAgreed: true,
    };
  }

  let formData = getInitialFormDataState();

  const submitFormButton = document.querySelector('.button[type="submit"]');

  function setOnFormArrowsClickHandlers() {
    const step = 186;
    const slidesContainer = document.querySelector(
      ".support__form-payment-wrapper"
    );

    document
      .querySelector(".support__form-arrow_right")
      .addEventListener("click", () => {
        if (window.innerWidth <= 330) {
          slidesContainer.scrollTop += step;
        } else {
          slidesContainer.scrollLeft += step;
        }
      });

    document
      .querySelector(".support__form-arrow_left")
      .addEventListener("click", () => {
        if (window.innerWidth <= 330) {
          slidesContainer.scrollTop -= step;
        } else {
          slidesContainer.scrollLeft -= step;
        }
      });
  }

  function toggleButtonActive(button, activate) {
    if (activate) {
      button.classList.add("button__secondary");
      button.classList.remove("button__secondary-transparent-grey");
    } else {
      button.classList.remove("button__secondary");
      button.classList.add("button__secondary-transparent-grey");
    }
  }

  function toggleButtonDisabled(button, disabled) {
    button.disabled = disabled;
  }

  function undisableSubmitButton() {
    const allDataPresent =
      formData.sum &&
      formData.payment &&
      formData.frequency &&
      formData.email &&
      formData.name &&
      formData.offerAgreed &&
      formData.personalDataAgreed;

    toggleButtonDisabled(submitFormButton, !allDataPresent);
  }

  function setDatasetClickHandlers(key) {
    const buttons = document.querySelectorAll(`[data-${key}]`);

    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        formData[key] = button.dataset[key];

        const activeButton = document.querySelector(
          `.button__secondary[data-${key}]`
        );

        if (activeButton) {
          toggleButtonActive(activeButton, false);
        }

        toggleButtonActive(button, true);

        undisableSubmitButton();
      });
    });
  }

  function setDonateButtonHandler() {
    const button = document.querySelector(".donate__support-btn");

    button.addEventListener("click", (e) => {
      const { donate } = formData;

      if (donate) {
        document.querySelector(`[data-sum="${donate}"]`).click();

        const activeButton = document.querySelector(
          `.button__secondary[data-donate]`
        );

        if (activeButton) {
          toggleButtonActive(activeButton, false);
        }

        undisableSubmitButton();
      }
    });
  }

  function clearFormOnSubmit() {
    document.querySelector(".support__form").reset();
    formData = getInitialFormDataState();
  }

  function setSubmitBtnHandlerHelper() {
    submitFormButton.addEventListener("submit", () => {
      e.preventDefault();
      console.log(formData);
      clearFormOnSubmit();
    });
  }

  function setInputChangeHandler(key) {
    document
      .querySelector(`.input.support__form-data-${key}`)
      .addEventListener("input", (e) => {
        formData[key] = e.target.value;
        undisableSubmitButton();
      });
  }

  function setCheckboxChangeHandler(key) {
    document.querySelector(`#${key}`).addEventListener("change", (e) => {
      formData[key] = e.currentTarget.checked;
      undisableSubmitButton();
    });
  }

  function setAnotherSumButtonHandler() {
    const anotherSomeListItem = document.querySelector(
      ".support__form-donate-another-summ"
    );
    const button = anotherSomeListItem.querySelector(".button");

    button.addEventListener("focus", (e) => {
      e.preventDefault();

      const input = document.createElement("input");
      input.classList.add("input");
      input.value = "5000";
      input.type = "text";

      input.onblur = () => {
        if (input.value) {
          return;
        }

        const button = document.createElement("button");
        button.classList.add("button");
        button.textContent = "Другая сумма";

        anotherSomeListItem.removeChild(input);
        anotherSomeListItem.appendChild(button);
      };

      anotherSomeListItem.removeChild(button);
      anotherSomeListItem.appendChild(input);
      input.focus();
    });
  }

  setOnFormArrowsClickHandlers();

  setInputChangeHandler("name");
  setInputChangeHandler("email");

  setCheckboxChangeHandler("offerAgreed");
  setCheckboxChangeHandler("personalDataAgreed");

  setDatasetClickHandlers("donate");
  setDatasetClickHandlers("sum");
  setDatasetClickHandlers("payment");
  setDatasetClickHandlers("frequency");

  setDonateButtonHandler();

  setAnotherSumButtonHandler();

  setSubmitBtnHandlerHelper();
}

function setAccordionHandlers() {
  const accordionButton = document.querySelectorAll(".button__accordion");
  const accordionSection = document.querySelectorAll(
    ".advantages__accordion-section"
  );
  function openedAccordion(e) {
    let accordion = e.target.closest(".advantages__accordion-section");

    if (accordion.classList.contains("advantages__accordion-section_opened")) {
      accordion.classList.remove("advantages__accordion-section_opened");
    } else {
      accordionSection.forEach(function (item) {
        item.classList.remove("advantages__accordion-section_opened");
      });
      accordion.classList.add("advantages__accordion-section_opened");
    }
  }

  accordionButton.forEach(function (section) {
    section.addEventListener("click", openedAccordion);
  });
}

function setMenuHandlers() {
  const blockLinksHeader = document.querySelector(".header__links");
  const links = blockLinksHeader.querySelectorAll('a[href*="#"]');
  links.forEach((elem) => initLinkHeader(elem));

  function initLinkHeader(elem) {
    elem.addEventListener("click", (evt) => {
      closeMenu();
      evt.preventDefault();
      const targetBlock = elem.getAttribute("href").substr(1);
      document.getElementById(targetBlock).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }
  // : ------------------------

  function initMenu(id) {
    const targetBlock = document.getElementById(id);
    const buttonMenu = document.querySelector(".header__menu-button");
    const blockAccordions = document.querySelectorAll(".accordion");
    const accordions = document.querySelectorAll(".accordion__block");
    const buttonsAccordion = document.querySelectorAll(".accordion__button");

    const openMenu = () => {
      targetBlock.classList.add("menu_open");
      setTimeout(() => {
        buttonMenu.classList.toggle("header__menu-button_open"),
          buttonMenu.classList.toggle("header__menu-button_close");
      }, 500);
    };

    const closeMenu = () => {
      if (targetBlock.className.includes("menu_open")) {
        targetBlock.classList.remove("menu_open");
        setTimeout(() => {
          buttonMenu.classList.toggle("header__menu-button_open"),
            buttonMenu.classList.toggle("header__menu-button_close");
        }, 900);
        blockAccordions.forEach((elem) =>
          elem.className.includes("accordion_open")
            ? elem.classList.remove("accordion_open")
            : elem
        );
        accordions.forEach((elem) =>
          elem.className.includes("accordion__block_open")
            ? elem.classList.remove("accordion__block_open")
            : elem
        );
        buttonsAccordion.forEach((elem) =>
          elem.className.includes("accordion__button_up")
            ? setTimeout(() => {
                elem.classList.remove("accordion__button_up"),
                  elem.classList.add("accordion__button_down");
              }, 1000)
            : elem
        );
      }
    };

    buttonMenu.addEventListener("click", () =>
      targetBlock.className.includes("menu_open") ? closeMenu() : openMenu()
    );
  }

  initMenu("menu");

  // : ----------------------

  function initAccordion(id) {
    const buttonAccordion = id.querySelector(".accordion__button");
    const accordion = id.querySelector(".accordion__block");

    const openAccordion = () => {
      id.classList.add("accordion_open");
      accordion.classList.add("accordion__block_open");
      setTimeout(
        () => (
          buttonAccordion.classList.toggle("accordion__button_up"),
          buttonAccordion.classList.toggle("accordion__button_down")
        ),
        800
      );
    };
    const closeAccordion = () => {
      id.classList.remove("accordion_open");
      accordion.classList.remove("accordion__block_open");
      setTimeout(
        () => (
          buttonAccordion.classList.toggle("accordion__button_up"),
          buttonAccordion.classList.toggle("accordion__button_down")
        ),
        1000
      );
    };

    buttonAccordion.addEventListener("click", () =>
      id.className.includes("accordion_open")
        ? closeAccordion()
        : openAccordion()
    );
  }

  const accordionBlocks = document.querySelectorAll(".accordion");
  accordionBlocks.forEach((elem) => initAccordion(elem));
}

function setSlidersHandlers() {
  function setSliderHandler(selector) {
    const sliderContent = document.querySelector(selector);
    const sliderContainer = sliderContent.parentElement;
    if (!sliderContainer) {
      return;
    }

    const leftBtn = sliderContainer.querySelector(".button__slider_left");
    const rightBtn = sliderContainer.querySelector(".button__slider_right");
    const slidersCount =
      sliderContainer.querySelectorAll(".slider__item").length;
    let counter = 1;
    const counterContainer = sliderContainer.querySelector(".about__roll");

    leftBtn.addEventListener("click", () => {
      sliderContent.scrollLeft -= sliderContainer.offsetWidth;
      if (counterContainer) {
        if (counter > 1) {
          counter--;
        }

        counterContainer.innerHTML = `${counter} / ${slidersCount}`;
      }
    });

    rightBtn.addEventListener("click", () => {
      sliderContent.scrollLeft += sliderContainer.offsetWidth;
      if (counterContainer) {
        if (counter < slidersCount) {
          counter++;
        }

        counterContainer.innerHTML = `${counter} / ${slidersCount}`;
      }
    });
  }

  setSliderHandler("#about .slider__content");
  setSliderHandler("#projects .slider__content");
}

function onLoad() {
  setFormHandlers();
  setAccordionHandlers();
  setMenuHandlers();
  setSlidersHandlers();
}

window.addEventListener("load", onLoad);
