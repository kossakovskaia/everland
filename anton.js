const blockLinksHeader = document.querySelector('.header__links')
const links = blockLinksHeader.querySelectorAll('a[href*="#"]')
links.forEach(elem => initLinkHeader(elem))


function initLinkHeader(elem) {
  elem.addEventListener('click', (evt) => {
    closeMenu();
    evt.preventDefault();
    const targetBlock = elem.getAttribute('href').substr(1);
    document.getElementById(targetBlock).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
};
// : ------------------------


function initMenu(id) {
  const targetBlock = document.getElementById(id)
  const buttonMenu = document.querySelector('.header__menu-button')
  const blockAccordeons = document.querySelectorAll('.accordion')
  const accordeons = document.querySelectorAll('.accordion__block')
  const buttonsAccordeon = document.querySelectorAll('.accordion__button');

  const openMenu = () => {
    targetBlock.classList.add('menu_open')
    setTimeout(() => {
      buttonMenu.classList.toggle('header__menu-button_open'),
        buttonMenu.classList.toggle('header__menu-button_close')
    }, 500);
  }

  const closeMenu = () => {
    if (targetBlock.className.includes('menu_open')) {
      targetBlock.classList.remove('menu_open');
      setTimeout(() => {
        buttonMenu.classList.toggle('header__menu-button_open'),
          buttonMenu.classList.toggle('header__menu-button_close')
      }, 900)
      blockAccordeons.forEach(elem =>
        elem.className.includes('accordion_open') ? elem.classList.remove('accordion_open') : elem)
      accordeons.forEach(elem =>
        elem.className.includes('accordion__block_open')
          ? (elem.classList.remove('accordion__block_open')
          )
          : elem)
      buttonsAccordeon.forEach(elem => elem.className.includes('accordion__button_up')
        ? setTimeout(() => {
          elem.classList.remove('accordion__button_up'),
            elem.classList.add('accordion__button_down')
        }, 1000)
        : elem)
    }
  }


  buttonMenu.addEventListener('click', (evt) =>
    targetBlock.className.includes('menu_open') ? closeMenu() : openMenu())

  return { openMenu, closeMenu }
}

const { openMenu, closeMenu } = initMenu("menu");

// : ----------------------

function initAccordeon(id) {
  const buttonAccordeon = id.querySelector('.accordion__button');
  const accordeon = id.querySelector('.accordion__block')

  const openAccordeon = () => {
    id.classList.add('accordion_open');
    accordeon.classList.add('accordion__block_open');
    setTimeout(() => (buttonAccordeon.classList.toggle('accordion__button_up'),
      buttonAccordeon.classList.toggle('accordion__button_down')), 800)
  }
  const closeAccordeon = () => {
    id.classList.remove('accordion_open');
    accordeon.classList.remove('accordion__block_open');
    setTimeout(() => (buttonAccordeon.classList.toggle('accordion__button_up'),
      buttonAccordeon.classList.toggle('accordion__button_down')), 1000)
  }

  buttonAccordeon.addEventListener('click', (evt) =>
    id.className.includes('accordion_open') ? closeAccordeon() : openAccordeon());
}


const accordeonBlocks = document.querySelectorAll('.accordion')
accordeonBlocks.forEach(elem => initAccordeon(elem));
