// Js controls
// console.log("for controls");

// * product.js den buraya yani main.js e import ettiğimiz fetchProducts fonksiyonu.
import { addToCart, displayCartTotal, renderCartItems } from "./cart.js";
import { fetchProducts, renderProducts } from "./product.js";
import { getFromLocalStorage, updateCartIcon } from "./utils.js";

// ! HTML 'den elemanları çekme
const menuIcon = document.querySelector("#menu-icon");
// console.log(menuIcon);
const menu = document.querySelector(".navbar");
// console.log(menu);
// menu iconuna tıklayınca menu kısımına class ekleyip çıkardık.
menuIcon.addEventListener("click", () => {
  menu.classList.toggle("open-menu");
});
// Anasayfa ve cart sayfasında yapılacak işlemleri ayır.
// Sayfa yüklendiğinde çalışacak fonksiyon.
document.addEventListener("DOMContentLoaded", async () => {
  const cart = getFromLocalStorage();

  // console.log(window);
  // Biz tarayıcıda anasayfadamıyız, cart sayfasındamıyız ?
  // cart.html
  if (window.location.pathname.includes("cart.html")) {
    // console.log(`Cart Page`);
    renderCartItems();
    displayCartTotal();
  }
  // index.html
  else {
    // console.log(`Main Page`);
    const product = await fetchProducts();
    // console.log(product);
    // Buradaki arrow function addToCartCallBack fonksiyonu oluyor.
    renderProducts(product, (event) => addToCart(event, product));
  }
  // Sepet ikonunu güncelle
  updateCartIcon(cart);
});
