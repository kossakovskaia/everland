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

  // todo update css selector
  const submitFormButton = document.querySelector('.btn[type="submit"]');

  function setOnFormArrowsClickHandlers() {
    const step = 186;
    const slidesContainer = document.querySelector(
      ".support__form-payment-wrapper"
    );

    document
      .querySelector(".support__form-arrow_right")
      .addEventListener("click", () => {
        slidesContainer.scrollLeft += step;
      });

    document
      .querySelector(".support__form-arrow_left")
      .addEventListener("click", () => {
        slidesContainer.scrollLeft -= step;
      });
  }

  function toggleButtonActive(button, activate) {
    if (activate) {
      button.classList.add("btn_secondary");
      button.classList.remove("btn_secondary-transparent-grey");
    } else {
      button.classList.remove("btn_secondary");
      button.classList.add("btn_secondary-transparent-grey");
    }
  }

  function toggleButtonDisabled(button, disabled) {
    button.disabled = disabled;

    if (disabled) {
      button.classList.add("btn_disabled");
    } else {
      button.classList.remove("btn_disabled");
    }
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
    /// todo add checkboxes
    toggleButtonDisabled(submitFormButton, !allDataPresent);
  }

  function setDatasetClickHandlers(key) {
    const buttons = document.querySelectorAll(`[data-${key}]`);

    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        formData[key] = button.dataset[key];

        const activeButton = document.querySelector(
          `.btn_secondary[data-${key}]`
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
      e.preventDefault();

      const { donate } = formData;

      if (donate) {
        document.querySelector(`[data-sum="${donate}"]`).click();

        const activeButton = document.querySelector(
          `.btn_secondary[data-donate]`
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
    document
      // todo update css selector
      .querySelector(`#${key}`)
      .addEventListener("change", (e) => {
        formData[key] = e.currentTarget.checked;
        undisableSubmitButton();
      });
  }

  function setAnotherSumButtonHandler() {
    // todo update css selector
    const anotherSomeListItem = document.querySelector(".another-sum");
    const button = anotherSomeListItem.querySelector(".btn");

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
        button.classList.add("btn");
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

function setAccordionHanlders() {
  const accordionButton = document.querySelectorAll(
    ".advantages__accordion-button"
  );
  const accordionSection = document.querySelectorAll(
    ".advantages__accordion-section"
  );
  function openedAccordion(e) {
    let accordion = e.target.closest(".advantages__accordion-section");

    if (accordion.classList.contains("advantages__accordion-section_opened")) {
      accordion.classList.remove("advantages__accordion-section_opened");
    } else {
      accordionSection.forEach(function(item) {
        item.classList.remove("advantages__accordion-section_opened");
      });
      accordion.classList.add("advantages__accordion-section_opened");
    }
  }

  accordionButton.forEach(function(section) {
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
    const blockAccordeons = document.querySelectorAll(".accordion");
    const accordeons = document.querySelectorAll(".accordion__block");
    const buttonsAccordeon = document.querySelectorAll(".accordion__button");

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
        blockAccordeons.forEach((elem) =>
          elem.className.includes("accordion_open")
            ? elem.classList.remove("accordion_open")
            : elem
        );
        accordeons.forEach((elem) =>
          elem.className.includes("accordion__block_open")
            ? elem.classList.remove("accordion__block_open")
            : elem
        );
        buttonsAccordeon.forEach((elem) =>
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

  function initAccordeon(id) {
    const buttonAccordeon = id.querySelector(".accordion__button");
    const accordeon = id.querySelector(".accordion__block");

    const openAccordeon = () => {
      id.classList.add("accordion_open");
      accordeon.classList.add("accordion__block_open");
      setTimeout(
        () => (
          buttonAccordeon.classList.toggle("accordion__button_up"),
          buttonAccordeon.classList.toggle("accordion__button_down")
        ),
        800
      );
    };
    const closeAccordeon = () => {
      id.classList.remove("accordion_open");
      accordeon.classList.remove("accordion__block_open");
      setTimeout(
        () => (
          buttonAccordeon.classList.toggle("accordion__button_up"),
          buttonAccordeon.classList.toggle("accordion__button_down")
        ),
        1000
      );
    };

    buttonAccordeon.addEventListener("click", () =>
      id.className.includes("accordion_open")
        ? closeAccordeon()
        : openAccordeon()
    );
  }

  const accordeonBlocks = document.querySelectorAll(".accordion");
  accordeonBlocks.forEach((elem) => initAccordeon(elem));
}

function setSlidersHandlers() {
  function setSliderHalder(selector) {
    const sliderContent = document.querySelector(selector);
    const sliderContainer = sliderContent.parentElement;
    if (!sliderContainer) {
      return;
    }

    const leftBtn = sliderContainer.querySelector(".btn-slider_left");
    const rightBtn = sliderContainer.querySelector(".btn-slider_right");
    const slidersCount = sliderContainer.children;
    const counterContainer = sliderContainer.querySelector(".about__roll");

    leftBtn.addEventListener("click", () => {
      sliderContent.scrollLeft -= sliderContainer.offsetWidth;
    });

    rightBtn.addEventListener("click", () => {
      sliderContent.scrollLeft += sliderContainer.offsetWidth;
    });
  }

  setSliderHalder("#about .slider__content");
}

function onLoad() {
  setFormHandlers();
  setAccordionHanlders();
  setMenuHandlers();
  setSlidersHandlers();
}

window.addEventListener("load", onLoad);

// todo Другая сумма поправить в donation
// todo Сброс введеной другой суммы
// todo slider
//
//