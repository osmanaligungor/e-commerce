import {
  calculateCartTotal,
  getFromLocalStorage,
  saveToLocalStorage,
  updateCartIcon,
} from "./utils.js";

let cart = getFromLocalStorage();
// * Sepete Ekleme Yapacak Fonksiyon
export function addToCart(event, products) {
  // Tıklanılan ürünün id sine erişildi ve productId değişkenine atandı
  const productId = parseInt(event.target.dataset.id);
  // Bu id ye sahip başka bir ürün var mı
  const product = products.find((product) => product.id === productId);
  // console.log(product);

  // Eklenecek veri öncesinde sepette varsa bunu yeni bir eleman olarak ekleme
  if (product) {
    // Eğer ürün varsa bunu bul
    const exitingItem = cart.find((item) => item.id === productId);
    // Ürün sepette varsa bunu ekleme
    if (exitingItem) {
      exitingItem.quantity++;
    } else {
      // Eklenecek veriyi objeye çevir.
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      };

      cart.push(cartItem);
      // Ekleme yapılan cartın içeriğini güncelledik
      event.target.textContent = "Added";
      // Sepet iconunu güncelleyen fonksiyon
      updateCartIcon(cart);
      // Localstorage a kayıt yapan fonksiyon
      saveToLocalStorage(cart);
      // Toplam miktarı hesapla
      displayCartTotal();
      // Sepet ikonunu güncelle
      updateCartIcon(cart);
    }
  }
}

// * Sepetten Ürünleri Silecek Fonksiyon
const removeFromCart = (event) => {
  // silinecek elemanın id sine eriştik
  const productID = parseInt(event.target.dataset.id);
  // Tıklanılan elemanı sepetten kaldır.
  cart = cart.filter((item) => item.id !== productID);
  // Localstorage ı güncelle
  saveToLocalStorage(cart);
  // Sayfayı güncelle
  renderCartItems();
  // Toplam miktarı hesapla
  displayCartTotal();
  // Sepet ikonunu güncelle
  updateCartIcon(cart);
};

// * Sepetteki elemanları render edecek fonksiyon
export const renderCartItems = () => {
  // Html de elemanların render edileceği kapsayıcıya eriş.
  const cartItemsElement = document.querySelector("#cartItems");
  // Sepetteki herbir eleman için cart item render et.
  cartItemsElement.innerHTML = cart
    .map(
      (item) =>
        `
            <div class="cart-item">
                        <img src="${item.image}"
                            alt="cart-img">
                        
                        <div class="cart-item-info">
                            <h2 class="cart-item-title">${item.title}</h2>
                            <input type="number" min="1" value="${item.quantity}" class="cart-item-quantity" data-id="${item.id}">
                        </div>
                        <h2 class="cart-item-price">$${item.price}</h2>
                        <button class="remove-from-cart" data-id="${item.id}">Remove</button>
            </div>
  
  `
    )
    .join("");
  // Remove butonlarına eriş
  const removeButtons = document.querySelectorAll(".remove-from-cart");
  for (let i = 0; i < removeButtons.length; i++) {
    const removeButton = removeButtons[i];
    removeButton.addEventListener("click", removeFromCart);
  }
  // Quantity inputlarına eriş
  const quantityInputs = document.getElementsByClassName("cart-item-quantity");
  // console.log(quantityInputs);
  // Her bir inputun değişme olayını izle.
  for (let i = 1; i < quantityInputs.length; i++) {
    const quantityInput = quantityInputs[i];
    quantityInput.addEventListener("change", onQuantityChange);
  }
};

// Inputlar değiştiğinde çalışacak fonksiyon
const onQuantityChange = (event) => {
  const newQuantity = Number(event.target.value);
  // stringleri numbere çevirmek için önüne + koymak yeterli olur.
  const productId = +event.target.dataset.id;
  // console.log(productId, " id li ürünün yeni miktarı :", newQuantity);

  // yeni miktar 0'dan büyükse:
  if (newQuantity > 0) {
    // id'si bilinen elemanın bilgilerini bul
    const cartItem = cart.find((item) => item.id === productId);

    // eğerki eleman sepette bulunamadıysa fonksiyonu durdur
    if (!cartItem) return;

    // ürünün miktarını güncelle
    cartItem.quantity = newQuantity;

    // localstorage'ı güncelle
    saveToLocalStorage(cart);
    // sepet ikonunundaki değeri güncelle
    updateCartIcon(cart);
    // toplam fiyatı güncelle
    displayCartTotal();
  }
};

// Toplam miktarı ekrana basar
export const displayCartTotal = () => {
  const cartTotalElement = document.querySelector("#cartTotal");
  const total = calculateCartTotal(cart);
  cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
};
