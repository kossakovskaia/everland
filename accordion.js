// const accordionHeaderClickHandler = function (e) {
//   document.querySelectorAll('.accordion__section').forEach(function (section) {
//     section.querySelector('.accordion__body').style.maxHeight = '0px'
//   })

//   let accordionSection = e.target.closest('.accordion__section')

//   let insideElHeight = accordionSection.querySelector('.accordion__body > *').clientHeight

//   let buttonIcon = accordionSection.querySelector('.accordion__button-icon')
//   buttonIcon.classList.add('accordion__button-icon_active')
//   accordionSection.querySelector('.accordion__body').style.maxHeight = insideElHeight + 'px'
// }

// document.querySelectorAll('.accordion__button').forEach(function (section) {
//   section.addEventListener('click', accordionHeaderClickHandler);

// })
const accordionButton = document.querySelectorAll('.accordion__button');

accordionButton.forEach(function (item) {
  item.addEventListener('click', () => {
    let accordionBody = document.querySelector('.accordion__body');
    console.log(accordionBody)
    // if (accordionBody.style.maxHeight) {
    //   document.querySelectorAll('.accordion__body').forEach((item) => item.style.maxHeight = null)
    // } else {
    //   document.querySelectorAll('.accordion__body').forEach((item) => item.style.maxHeight = null)
    //   accordionBody.style.maxHeight = accordionBody.scrollHeight + 'px'
    // }
  })
})
