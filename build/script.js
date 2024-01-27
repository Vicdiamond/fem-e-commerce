'use strict'

const btnPlus = document.querySelector('.btn-counter-plus')
const btnMinus = document.querySelector('.btn-counter-minus')
const btnPrevious = document.querySelector('.previous-btn')
const btnNext = document.querySelector('.next-btn')
const btnNextOverlay = document.querySelector('.next-btn-overlay')
const btnPreviousOverlay = document.querySelector('.previous-btn-overlay')
const btnClearCart = document.querySelector('.btn-delete')
const btnAddCart = document.querySelector('.btn-cart')
const btnShowCart = document.querySelector('.btn-showcart')
const btnMenu = document.querySelector('.btn-menu')
const btnCloseMenu = document.querySelector('.btn-close-menu')
const btnCloseOverlay = document.querySelector('.btn-close-overlay')

const counterEl = document.querySelector('.counter')
const imgEl = document.querySelector('.img-el')
const imgElOverlay = document.querySelector('.img-el-overlay')
const numItemsEl = document.querySelector('.item-number')
const numItemsContainer = document.querySelector('.item-num-container')
const cartEl = document.querySelector('.cart-el')
const emptyCartEl = document.querySelector('.empty-cart')
const orderedCartEl = document.querySelector('.ordered-cart')
let numItems = document.querySelector('.num-item')
const totalAmount = document.querySelector('.total')
const thumbnailContainer = document.querySelector('.thumbnail-container')
const thumbnailContainerOverlay = document.querySelector(
  '.thumbnail-container-overlay'
)
const thumbnailImgs = document.querySelectorAll('.thumbnail-img')
const thumbnailImgsOverlay = document.querySelectorAll('.thumbnail-img-overlay')
const imgOerlayContainer = document.querySelector('.img-overlay-container')
const darkOverlay = document.querySelector('.overlay-el')
const sideBar = document.querySelector('.sidebar')
const htmlBody = document.querySelector('.body')

// FUNCTIONS
const thumbnailsFeatures = function (e, containClass, thumbnail, img) {
  const clicked = e.target

  if (!clicked.classList.contains(`${containClass}`)) return

  thumbnail.forEach(img => {
    img.classList.remove(
      'bg-white',
      'opacity-50',
      'inset-0',
      'border-2',
      'border-orange-600'
    )
  })

  clicked.classList.add(
    'bg-white',
    'opacity-50',
    'inset-0',
    'border-2',
    'border-orange-600'
  )
  img.src = `../images/image-product-${clicked.src.slice(-15, -14)}.jpg`
}

const addStylesToCurOverlay = function () {
  thumbnailImgsOverlay.forEach(img => {
    img.classList.remove(
      'bg-white',
      'opacity-50',
      'inset-0',
      'border-2',
      'border-orange-600'
    )

    if (+img.src.slice(-15, -14) === +imgElOverlay.src.slice(-5, -4)) {
      img.classList.add(
        'bg-white',
        'opacity-50',
        'inset-0',
        'border-2',
        'border-orange-600'
      )
    }
  })
}

const nextSlidesMainAndOverlay = function (imgEl) {
  const productNum = +imgEl.src.slice(-5, -4)

  imgEl.src = `../images/image-product-${productNum + 1}.jpg`
  if (productNum === 4) {
    imgEl.src = `../images/image-product-1.jpg`
    return
  }
}

const previousSlidesMainAndOverlay = function (imgEl) {
  const productNum = +imgEl.src.slice(-5, -4)

  if (productNum === 1) {
    imgEl.src = `../images/image-product-4.jpg`
    return
  }

  imgEl.src = `../images/image-product-${productNum - 1}.jpg`
}

// EVENT LISTENERS

// Counter
btnPlus.addEventListener('click', () => +counterEl.textContent++)
btnMinus.addEventListener('click', () => {
  if (+counterEl.textContent === 0) return
  ;+counterEl.textContent--
})

// Next and previous functionalities for largescreen and overlay
btnNext.addEventListener('click', function () {
  nextSlidesMainAndOverlay(imgEl)
})

btnNextOverlay.addEventListener('click', function (e) {
  nextSlidesMainAndOverlay(imgElOverlay)

  addStylesToCurOverlay()
})

btnPrevious.addEventListener('click', function () {
  previousSlidesMainAndOverlay(imgEl)
})

btnPreviousOverlay.addEventListener('click', function () {
  previousSlidesMainAndOverlay(imgElOverlay)

  addStylesToCurOverlay()
})

// Add to cart
btnAddCart.addEventListener('click', function () {
  if (+counterEl.textContent === 0) return

  numItemsContainer.classList.remove('hidden')
  numItemsEl.textContent = counterEl.textContent
  this.classList.remove('bg-orange-500')
  this.classList.add('bg-orange-400')
  numItems.textContent = counterEl.textContent
  totalAmount.textContent = +numItems.textContent * 125

  if (!cartEl.classList.contains('hidden')) {
    orderedCartEl.classList.remove('hidden')
    orderedCartEl.classList.add('flex')
    emptyCartEl.classList.add('hidden')
  }
})

// Show cart
btnShowCart.addEventListener('click', function () {
  if (this.nextElementSibling.classList.contains('hidden')) {
    cartEl.classList.toggle('hidden')
    emptyCartEl.classList.toggle('hidden')
  }

  if (!this.nextElementSibling.classList.contains('hidden')) {
    cartEl.classList.toggle('hidden')
    orderedCartEl.classList.toggle('hidden')
    orderedCartEl.classList.add('flex')
  }
})

// Clear cart
btnClearCart.addEventListener('click', function () {
  orderedCartEl.classList.add('hidden')
  emptyCartEl.classList.remove('hidden')
  numItemsContainer.classList.add('hidden')
  btnAddCart.classList.add('bg-orange-500')
  btnAddCart.classList.remove('bg-orange-400')
})

btnCloseOverlay.addEventListener('click', function () {
  imgOerlayContainer.classList.add('hidden')
  darkOverlay.classList.add('hidden')
})

btnMenu.addEventListener('click', function () {
  sideBar.classList.remove('hidden')
  darkOverlay.classList.remove('hidden')
  htmlBody.classList.add('overflow-hidden')
})

btnCloseMenu.addEventListener('click', function () {
  sideBar.classList.add('hidden')
  darkOverlay.classList.add('hidden')
  htmlBody.classList.remove('overflow-hidden')
})

thumbnailContainer.addEventListener('click', function (e) {
  thumbnailsFeatures(e, 'thumbnail-img', thumbnailImgs, imgEl)
})
thumbnailContainerOverlay.addEventListener('click', function (e) {
  thumbnailsFeatures(
    e,
    'thumbnail-img-overlay',
    thumbnailImgsOverlay,
    imgElOverlay
  )
})

imgEl.addEventListener('click', function () {
  if (window.innerWidth < 1024) return

  imgOerlayContainer.classList.remove('hidden')

  darkOverlay.classList.remove('hidden')
})
