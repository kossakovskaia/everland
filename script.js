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

function onLoad() {
  setFormHandlers();
}

window.addEventListener("load", onLoad);

// todo Другая сумма поправить в donation
// todo Сброс введеной другой суммы
