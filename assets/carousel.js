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

    let movingDirection = isAutoSlide
      ? '-100%'
      : index > currentIndex
      ? '-100%'
      : '100%'

    indicators.forEach((indicator, idx) => {
      indicator.classList.toggle('active', idx === index)
    })

    slides[currentIndex].style.opacity = '0'
    slides[currentIndex].style.transform = `translateX(${movingDirection})`
    slides[currentIndex].classList.remove('active')

    slides[index].style.opacity = '1'
    slides[index].style.transform = 'translateX(0%)'
    slides[index].classList.add('active')

    setTimeout(() => {
      slides[currentIndex].style.transform = ''
      currentIndex = index
    }, 500)
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
