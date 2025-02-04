// Localstorage a eleman kaydeden fonksiyon
export function saveToLocalStorage(cart) {
  // * Localstorage a cart verisini kaydet. cart bizim belirlediğimiz bir parametre.
  localStorage.setItem("cart", JSON.stringify(cart));
}
// Localstorage dan verileri alan fonksiyon
export const getFromLocalStorage = () => {
  // Localstorage dan verileri al ve JSON a çevir, eğer veri yoksa boş dizi döndür.
  const data = localStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
};

// Sepetteki ürün miktarını hesapla
export const updateCartIcon = (cart) => {
  // Sepet ikonu kapsayıcısı ve Quantity değerine eriş
  const cartIcon = document.querySelector("#cart-icon");
  const i = document.querySelector(".bxs-shopping-bag");
  // Sepette bulunan toplam ürün sayısını hesapla
  let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  // Quantity attribute ürün değerini güncelle
  i.setAttribute("data-quantity", totalQuantity);
};

//
export function calculateCartTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
