const accordionButton = document.querySelectorAll('.accordion__button');
const accordionSection = document.querySelectorAll('.accordion__section');
function openedAccordion(e) {
  let accordion = e.target.closest('.accordion__section');

  if (accordion.classList.contains('accordion__section_opened')) {
    accordion.classList.remove('accordion__section_opened')
  } else {
    accordionSection.forEach(function (item) {
      item.classList.remove('accordion__section_opened')
    })
    accordion.classList.add('accordion__section_opened')
  }
}

accordionButton.forEach(function (section) {
  section.addEventListener('click', openedAccordion);
})