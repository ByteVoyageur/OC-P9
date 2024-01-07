document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelectorAll('.carousel-item')
  let currentIndex = 0

  function goToSlide(index) {
    slides[currentIndex].classList.remove('active')
    slides[index].classList.add('active')
    currentIndex = index
  }

  document
    .querySelectorAll('.carousel-indicators button')
    .forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        goToSlide(index)
      })
    })

  document
    .querySelector('.carousel-control-prev')
    .addEventListener('click', () => {
      const nextIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1
      goToSlide(nextIndex)
    })

  document
    .querySelector('.carousel-control-next')
    .addEventListener('click', () => {
      const nextIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0
      goToSlide(nextIndex)
    })
})
