const accordionButton = document.querySelectorAll('.advantages__accordion-button');
const accordionSection = document.querySelectorAll('.advantages__accordion-section');
function openedAccordion(e) {
  let accordion = e.target.closest('.advantages__accordion-section');

  if (accordion.classList.contains('advantages__accordion-section_opened')) {
    accordion.classList.remove('advantages__accordion-section_opened')
  } else {
    accordionSection.forEach(function (item) {
      item.classList.remove('advantages__accordion-section_opened')
    })
    accordion.classList.add('advantages__accordion-section_opened')
  }
}

accordionButton.forEach(function (section) {
  section.addEventListener('click', openedAccordion);
})