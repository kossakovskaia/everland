const linksAbout = document.querySelector('.menu__accordeon-about')
const blockAbout = document.querySelector('.menu__about')
const linksForWhom = document.querySelector('.menu__accordeon-for-whom')
const blockForWhom = document.querySelector('.menu__for-whom')
const linksServices = document.querySelector('.menu__accordeon-services')
const blockServices = document.querySelector('.menu__services')

const buttonAbout = document.querySelector('.btn1')
buttonAbout.addEventListener('click', (evt) => { openAndCloseAbout(evt); })
const buttonForWhom = document.querySelector('.btn2')
buttonForWhom.addEventListener('click', (evt) => { close2(evt); })
const buttonServices = document.querySelector('.btn3')
buttonServices.addEventListener('click', (evt) => { close3(evt); })

function openAndCloseAbout(evt) {
  linksAbout.classList.toggle('open-accordeon');
  blockAbout.classList.toggle('open-block-submenu');
  buttonAbout.classList.toggle('menu__button-accordeon_up');
  buttonAbout.classList.toggle('menu__button-accordeon_down');
}

function close2(evt) {
  linksForWhom.classList.toggle('open-accordeon');
  blockForWhom.classList.toggle('open-block-submenu');
  buttonForWhom.classList.toggle('menu__button-accordeon_up');
  buttonForWhom.classList.toggle('menu__button-accordeon_down');
}

function close3(evt) {
  linksServices.classList.toggle('open-accordeon');
  blockServices.classList.toggle('open-block-submenu');
  buttonServices.classList.toggle('menu__button-accordeon_up');
  buttonServices.classList.toggle('menu__button-accordeon_down');
}

const blockMenu = document.querySelector('.menu')
const buttonMenuHeader = document.querySelector('.header__menu-button')
buttonMenuHeader.addEventListener('click', (evt) => { openAndCloseMenu(evt); })

function openAndCloseMenu(evt) {
  buttonMenuHeader.classList.toggle('header__menu-button_open');
  buttonMenuHeader.classList.toggle('header__menu-button_close');
  blockMenu.classList.toggle('open-block-menu');

}

const linksHeader = document.querySelectorAll('.header__link')
linksHeader.forEach(elem => {
  elem.addEventListener('click', (evt) => {
    blockMenu.classList.remove('open-block-menu');
    buttonMenuHeader.classList.toggle('header__menu-button_open');
    buttonMenuHeader.classList.toggle('header__menu-button_close');
  })
})
