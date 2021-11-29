/* Maintaining Menu */
const menuWrapper = document.getElementById("nav-main-menu");
const backdrop = document.getElementById("backdrop");

const hideMobileMenu = () => {
	backdrop.style.display = "none";
	menuWrapper.style.display = "none";
};

const showMobileMenu = () => {
	backdrop.style.display = "flex";
	menuWrapper.style.display = "flex";
};

const closeMenuBtn = document.getElementById("closeMenu");
closeMenuBtn.addEventListener("click", hideMobileMenu);

const openMenuBtn = document.getElementById("openMenu");
openMenuBtn.addEventListener("click", showMobileMenu);

/* End Maintaining Menu */

/* Maintaining Porduct Navigation */
const productImages = [
	"images/image-product-1.jpg",
	"images/image-product-2.jpg",
	"images/image-product-3.jpg",
	"images/image-product-4.jpg",
];
let currentIndex = 0;

const productImage = document.getElementById("productImage");
const prevButton = document.getElementById("btnPrev");
const nextButton = document.getElementById("btnNext");

function decreaseIndex() {
	if (currentIndex === 0) {
		currentIndex = productImages.length - 1;
	} else {
		currentIndex--;
	}
	replaceProductImage();
}
function increaseIndex() {
	if (productImages.length - 1 === currentIndex) {
		currentIndex = 0;
	} else {
		currentIndex++;
	}
	replaceProductImage();
}
function setIndex(index) {
	if (index >= 0 && index < productImages.length) {
		currentIndex = index;
		replaceProductImage();
	}
}
function replaceProductImage() {
	productImage.setAttribute("src", productImages[currentIndex]);
}

prevButton.addEventListener("click", decreaseIndex);
nextButton.addEventListener("click", increaseIndex);

/* Change Product Image by Bottom Thumbnaiils Click */
const btnProductOne = document.querySelector(
	"ul.image-nav-desk li:nth-child(1) a.image-nav-item"
);
btnProductOne.addEventListener("click", setIndex.bind(null, 0));

const btnProductSecond = document.querySelector(
	"ul.image-nav-desk li:nth-child(2) a.image-nav-item"
);
btnProductSecond.addEventListener("click", setIndex.bind(null, 1));

const btnProductThirth = document.getElementById("image-thirth-nav");
btnProductThirth.addEventListener("click", setIndex.bind(null, 2));

const btnProductFourth = document.getElementById("image-fourth-nav");
btnProductFourth.addEventListener("click", setIndex.bind(null, 3));

replaceProductImage();

/* End Maintaining Product Navigation */

/* Maintaining Cart Display */
const cart = document.getElementById("cart");
const showHideCart = () => {
	if (cart.style.display === "flex") {
		cart.style.display = "none";
	} else {
		cart.style.display = "flex";
	}
};
const cartBtn = document.getElementById("see-cart");
cartBtn.addEventListener("click", showHideCart);

/* Maintaining Add Product to Cart Behaviour */
const product = {
	title: "Fall Limited Edition Sneakers",
	company: "Sneaker Company",
	description: `These low-profile sneakers are your perfect casual wear companion.
    Featuring a durable rubber outer sole, they’ll withstand
    everything the weather can offer.`,
	price: 125.0,
	discount: 50,
};

let productInCart = 0;

const badgeItemInCart = document.getElementById("badgeItemInCart");
const addToCart = document.getElementById("addToCart");
const inputCountItem = document.getElementById("inputCountItem");
const plusButton = document.getElementById("btnPlus");
const minusButton = document.getElementById("btnMinus");

plusButton.addEventListener("click", increaseCountItem);
minusButton.addEventListener("click", decreaseCountItem);

function increaseCountItem() {
	let numOfItem = parseInt(inputCountItem.value);
	numOfItem += 1;
	inputCountItem.value = numOfItem;
}
function decreaseCountItem() {
	let numOfItem = parseInt(inputCountItem.value);
	if (numOfItem > 0) {
		numOfItem -= 1;
		inputCountItem.value = numOfItem;
	}
}

addToCart.addEventListener("click", () => {
	let numOfItem = parseInt(inputCountItem.value);
	if (numOfItem > 0) {
		productInCart += numOfItem;
		refreshCartBadge();
		alert(numOfItem + " item(s) added to your cart!");
	} else {
		alert("Error: Please enter valid value!");
	}
	inputCountItem.value = "0";
});
function refreshCartBadge() {
	badgeItemInCart.innerText = productInCart;
	const priceTimeCount = document.getElementById("priceTimeCount");
	priceTimeCount.innerText = "$" + product.price + " x " + productInCart;
	const totalPrice = document.getElementById("totalPrice");
	totalPrice.innerText =
		"$" + parseFloat(product.price) * parseInt(productInCart);
	const cartEmptyLabel = document.getElementById("cartEmptyLabel");
	const cartContentFilled = document.querySelector("div.cart-card-content");

	if (productInCart === 0) {
		badgeItemInCart.style.display = "none";
		cartEmptyLabel.style.display = "block";
		cartContentFilled.children[0].style.display = "none";
		cartContentFilled.children[1].style.display = "none";
	} else {
		badgeItemInCart.style.display = "inline";
		cartEmptyLabel.style.display = "none";
		cartContentFilled.children[0].style.display = "block";
		cartContentFilled.children[1].style.display = "block";
	}
}

document.getElementById("clearCart").addEventListener("click", clearCart);

function clearCart() {
	productInCart = 0;
	refreshCartBadge();
}

refreshCartBadge();
/* End Maintaining Add Product to Cart Behaviour */

/* Handling Light  Box */
const imageNavCard = document.querySelector("div.image-nav");
//Create copy of imageNavCard to replace its position while its been
//displayed as lightbox
const imageNavCopy = document.createElement("div");
imageNavCopy.className = "image-nav";
imageNavCopy.innerHTML = imageNavCard.innerHTML;

const cardTriger = document.getElementById("productImage");
const backdropLightBox = document.querySelector("div.backdrop-lightbox");
const siblingCard = document.querySelector("div.shop-info-tool");
const parentCard = document.querySelector("section.product-display");
const mobileNav = document.querySelector("div.image-nav-mob");

/* Create and manage close button */
const closeButton = document.createElement("a");
closeButton.setAttribute("href", "");
closeButton.style.marginLeft = "10px";
closeButton.style.marginBottom = "15px";

const iconClose = document.createElement("img");
iconClose.setAttribute("src", "./images/icon-close.svg");
closeButton.appendChild(iconClose);
imageNavCard.insertBefore(closeButton, cardTriger);
closeButton.addEventListener("click", () => {
	imageNavCopy.remove();
	parentCard.insertBefore(imageNavCard, siblingCard);
	mobileNav.style.display = "none";
	backdropLightBox.innerHTML = "";
	backdropLightBox.style.display = "none";
	closeButton.style.display = "none";
});
closeButton.style.display = "none";

cardTriger.addEventListener("click", () => {
	backdropLightBox.style.display = "flex";
	backdropLightBox.innerHTML = "";
	mobileNav.style.display = "flex";
	mobileNav.style.padding = "0px 0px";
	mobileNav.style.marginLeft = "-20px";
	mobileNav.style.marginBottom = "190px";
	mobileNav.style.width = "110%";
	backdropLightBox.appendChild(imageNavCard);
	backdropLightBox.style.alignItems = "center";
	backdropLightBox.style.justifyContent = "center";

	closeButton.style.display = "block";

	/* Diplay image nav copy in image nav previous position */
	parentCard.insertBefore(imageNavCopy, siblingCard);
});

/* End Handling Light Box */
