document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelectorAll('.carousel-item')
  const indicators = document.querySelectorAll('.carousel-indicators button')
  let currentIndex = 0
  let autoSlideInterval
  let userClicked = '' // 'prev' for previous, 'next' for next, and '' for auto

  goToSlide(0)

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      userClicked = ''
      goToSlide(index)
      resetAutoSlide()
    })
  })

  document
    .querySelector('.carousel-control-prev')
    .addEventListener('click', () => {
      userClicked = 'prev'
      shiftSlide(-1)
    })

  document
    .querySelector('.carousel-control-next')
    .addEventListener('click', () => {
      userClicked = 'next'
      shiftSlide(1)
    })

  startAutoSlide()

  function goToSlide(index) {
    if (index === currentIndex) {
      return
    }

    const currentSlide = slides[currentIndex]
    const nextSlide = slides[index]

    // Determine the direction based on userClicked value
    let direction
    if (userClicked === 'prev') {
      direction = '-100%'
    } else {
      direction = '100%'
    }

    nextSlide.style.transform = `translateX(${direction})`
    nextSlide.classList.add('active')

    setTimeout(() => {
      currentSlide.style.opacity = '0'
      nextSlide.style.opacity = '1'
      nextSlide.style.transform = 'translateX(0)'

      setTimeout(() => {
        currentSlide.classList.remove('active')
        currentSlide.style.transform = ''
        currentIndex = index
      }, 1000)
    }, 20)
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      userClicked = ''
      const nextIndex = (currentIndex + 1) % slides.length
      goToSlide(nextIndex) // true: isAutoSlide
    }, 5000)
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval)
    startAutoSlide()
  }

  function shiftSlide(direction) {
    const nextIndex = (currentIndex + direction + slides.length) % slides.length
    goToSlide(nextIndex)
    resetAutoSlide()
  }
})
