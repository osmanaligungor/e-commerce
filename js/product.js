// * Burada db.json adı altında kendi yaptığımız bir api dosyasından verileri çekip main js dosyamıza verileri aktardık. Bu işlemi yaparken öncelikle bir fonksiyon yazarak bu verileri istediğimiz formatta dışarıya çıkaracağız. Bu fonksiyon da asekron fonksiyon olduğundan dolayı async-awaiti kullanacağız. Çünkü main js de çalıştırdığımıda buradan gelecek verileri ve verilerin dönüşümünü beklemesi gerekiyor. Bu verileri dönüştürürken try-catch fonksiyonuyla verileri döndürmemiz gerekiyor ki apiden aldığımız verilerde bir sorun olup olmadığını bilebilelim.
// ! Burada önemli birkaç nokta var. Birincisi oluşturduğumuz fake api dosyasının bizim html,css dizinimizle aynı yerde olması lazım. Diğeri ise dosyamızın isminin yanlış yazılmaması gerekiyor. Bir de export etmemiz gerekiyor.

export const fetchProducts = async () => {
  try {
    // Api a istek at
    const response = await fetch("db.json");
    // console.log(response);
    // Hata durumunu kontrol et
    if (!response.ok) {
      // Hata varsa hata fırlat
      throw new Error("URL Yanlış");
    }
    // Hata yoksa veriyi return et
    return await response.json();
  } catch (error) {
    // Hata varsa bunu console a yazdır.
    console.error(error);
    return [];
  }
};

// Ürünleri render eden fonksiyon
export const renderProducts = (products, addToCartCallBack) => {
  // * Html de ürünlerin listeleneceği kısımı seç
  const productList = document.querySelector("#productList");
  // * Ürünleri ekrana bas
  // console.log(products);
  // * Html deki productList id li yapının içeriğini dön
  productList.innerHTML = products
    .map(
      (product) => `
          <div class="product">
                <img width="200" class="product-img"
                    src="${product.image}"
                    alt="product-1">
                <div class="product-info">
                    <h2 class="product-title">${product.title}</h2>
                    <p class="product-price">$${product.price}</p>
                    <button class="add-to-cart" data-id="${product.id}">Add to cart</button>
                </div>
          </div>
  `
    )
    .join("");
  // virgülle ayırıyordu biz virgül olmasını istemiyoruz. Dolayısıyla .join("") ile boşluk ile ayırmasını sağladık. Dizilerin default değeri elemanlarını virgülle ayırmasıdır.
  // Add to cart butonlarını seç
  const addToCartButtons = document.getElementsByClassName("add-to-cart");
  // console.log(addToCartButtons);
  // * Her bir add to cart butonuna tıklanma olayı ekleniyor.
  for (let i = 0; i < addToCartButtons.length; i++) {
    const addToCartButton = addToCartButtons[i];
    addToCartButton.addEventListener("click", addToCartCallBack);
  }
};
