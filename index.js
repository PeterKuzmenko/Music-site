var cart, open, polosa, polosa1, numberPrice, cartCounter, totalPrice, allItems, prices, items, articul, good, good1;
cart = {};
open = document.querySelector(".cart");
polosa = document.getElementById("goods1");
polosa1 = document.getElementById("goods2");
totalPrice = document.getElementById("delivery-cost");
i = 0;
y = 0;

$(document).ready(function() {
	loadMusics();
	checkCart();
});

function loadMusics() {
	$.getJSON("musics.json", function(data) {
		var music = document.getElementById('goods1');
		var musicOnSale = document.getElementById('goods2');
		let out = "";
		
		for(var key in data) {
				out += '<div class="row">';
				if(data[key].sale){
					out += '<div class="box-sale">';
					out += '<div class="sale">sale</div>';
					out += '</div>';
				}
				out += '<img class="art" src="'+data[key].image+'">';
				out += '<div class="info">';
				out += '<div class="title-of-music">'+data[key].title+'</div>';
				out += '<div class="aftor">by Artist</div><br>';
				out += '<img src="images/rating.png">';
				out += '<p><span>Lorem ipsum</span> dolor sit amet, conadipiscing elit, sed diam nonu.</p>';
				out += '<div class="buy">';
				out += '<div class="price">$'+data[key].price+'</div>';
				if(data[key].sale){
					out += '<div class="price-sale">$'+data[key].pricesale+'</div>';
				}
				out += '<button data-art="'+key+'" class="add">add to cart</button>';
				out += '</div>';
				out += '</div>';
				out += '</div>';
			if(!data[key].sale) {
				music.innerHTML += out;
			} else {
				musicOnSale.innerHTML += out;
			}
			out = "";
		}		
		
		$('button.add').on('click', addToCart);

		function showCart() {
			let out = "";
			for(var key in cart) {
				out += '<div class="item-cart">';
				out += '<img class="cart-image" src="'+ data[key].image +'" alt="">';
				out += '<div class="box">';
				out += '<div class="title-of-music">1 x '+data[key].title+' <span>by Artist</span></div>';
				out += '<img src="images/rating.png" alt="">';
				out += '</div>';
				out += '<div class="album-price">';
				if(data[key].sale){
					out += '<div class="price">$<span class="number">'+data[key].pricesale+'</span></div>';
					
				} else {
					out += '<div class="price">$<span class="number">'+data[key].price+'</span></div>';
				}
				out += '<button class="delete" data-art="'+key+'">x</button>';
				out += '</div>';
				out += '</div>';
				out += '<img class="cart-separator" src="images/cart-separator.png" alt="">';
			}
			document.getElementById('show-cart').innerHTML = out;
			$('.delete').on('click', deleteMusic);
			itemsCounter();
			priceCounter();
		}

		showCart();
		width();

		function addToCart() {
			articul = $(this).attr('data-art');
			if(cart[articul]){
				alert("Вы уже добавили этот плейлист в корзину")
			} else {
				cart[articul] = 1;
			}

			localStorage.setItem('cart', JSON.stringify(cart));
			showCart();
		}

		function deleteMusic() {
			articul = $(this).attr('data-art');
			delete cart[articul];
			showCart();
			saveCartToLS();
		}

		function width() {
			var good = polosa.querySelectorAll(".row");
			var good1 = polosa1.querySelectorAll(".row");
			var width1 = 240 * good.length;
			polosa.style.width = width1 + "px";
			var width2 = 240 * good1.length;
			polosa1.style.width = width2 * good1.length + "px";
		}
	})
}

function checkCart() {
 	if(localStorage.getItem('cart')){
 		cart = JSON.parse(localStorage.getItem('cart'));
 	}
}

function saveCartToLS() {
	localStorage.setItem('cart', JSON.stringify(cart));
}

function right() {
	good = polosa.querySelectorAll(".row");
	if(good.length * -240 + 4 * 240 != i){
		i -= 240;
	}
	polosa.style.left = i + "px";
}

function left() {
	if(!i <= 0){
		i += 240;
	}
	polosa.style.left = i + "px";
}

function right1() {
	good1 = polosa1.querySelectorAll(".row");
	if(good1.length * -240 + 4 * 240 != y){
		y -= 240;
	}
	polosa1.style.left = y + "px";
}

function left1() {
	if(!y <= 0){
		y += 240;
	}
	polosa1.style.left = y + "px";
}

function itemsCounter() {
	cartCounter = document.getElementById("counter-item");
	allItems = document.querySelectorAll(".item-cart");
	prices = document.querySelectorAll(".number");
	items = document.querySelector(".items");

	cartCounter.innerHTML = allItems.length;
}

function priceCounter() {
	numberPrice = 0;
	for(var i = 0; i < prices.length; i++) {
		numberPrice += parseFloat(prices[i].innerHTML);
	}

	if(numberPrice) {
		totalPrice.innerHTML = "$" + numberPrice.toFixed(2);
	} else {
		totalPrice.innerHTML = "$00.00";
	}

	if(allItems.length == 0) {
		items.innerHTML = "<h2>cart is empty</h2>";
	}
}

function openned() {
	if(open.style.display == "none") {
		open.style.display = "block";
	} else {
		open.style.display = "none"
	}
}