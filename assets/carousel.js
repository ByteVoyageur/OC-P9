document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelectorAll('.carousel-item')
  const indicators = document.querySelectorAll('.carousel-indicators button')
  let currentIndex = 0
  let autoSlideInterval

  goToSlide(0)

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      goToSlide(index)
      resetAutoSlide()
    })
  })

  document
    .querySelector('.carousel-control-prev')
    .addEventListener('click', () => {
      shiftSlide(-1)
    })

  document
    .querySelector('.carousel-control-next')
    .addEventListener('click', () => {
      shiftSlide(1)
    })

  startAutoSlide()

  function goToSlide(index, isAutoSlide) {
    if (index === currentIndex) {
      return
    }

    const currentSlide = slides[currentIndex]
    const nextSlide = slides[index]

    let direction = isAutoSlide
      ? '100%'
      : index > currentIndex
      ? '100%'
      : '-100%'

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
      const nextIndex = (currentIndex + 1) % slides.length
      goToSlide(nextIndex, true) // true: isAutoSlide
    }, 3000)
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval)
    startAutoSlide()
  }

  function shiftSlide(direction) {
    const nextIndex = (currentIndex + direction + slides.length) % slides.length
    goToSlide(nextIndex, false) // false: isAutoSlide
    resetAutoSlide()
  }
})
