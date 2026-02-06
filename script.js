const products = [
    {
        id: 1,
        title: "MSI Optix G27C4",
        image: "image/110187406.webp",
        category: "Монітори",
        price: 8999,
        discount: false,
        inStock: true,
        description: "Найкращі монітори компанії MSI. Найліпша картинка за свої кошти.",
        delivery: "Нова пошта",
        isTop: true
    },

    {
        id: 2,
        title: "MSI Oddysey Ark G97NB",
        image: "image/ddd.avif",
        category: "Монітори",
        price: 72000,
        discount: false,
        inStock: true,
        description: "Найкращий монітор своєї лінійки. 4K, 55\", 180Гц.",
        delivery: "Кур'єрська доставка",
        isTop: false
    },

    {
        id: 3,
        title: "Logitech G Pro X Superlight 2",
        image: "image/594807023.webp",
        category: "Мишки",
        price: 4999,
        discount: true,
        inStock: true,
        description: "Надлегка ігрова миша вагою лише 60 грамів, сенсор нового покоління HERO.",
        delivery: "Нова пошта",
        isTop: true
    },

    {
        id: 4,
        title: "HyperX Alloy Origins",
        image: "image/317638085.webp",
        category: "Клавіатури",
        price: 2999,
        discount: false,
        inStock: false,
        description: "Механічна клавіатура з надійними перемикачами HyperX Red. Повністю алюмінієвий корпус.",
        delivery: "Кур'єрська доставка",
        isTop: false
    },

    {
        id: 5,
        title: "Razer BlackShark V2",
        image: "image/nausnuki.webp",
        category: "Гарнітури",
        price: 3999,
        discount: true,
        inStock: true,
        description: "Легкі ігрові навушники з потужним мікрофоном та хорошою шумоізоляцією.",
        delivery: "Нова пошта",
        isTop: true
    },

    {
        id: 6,
        title: "iPad 10 (2022) 10.9 10th Gen Cellular",
        image: "image/wasya.jpg",
        category: "Планшети",
        price: 14999,
        discount: false,
        inStock: true,
        description: "Надійний планшет із чіпом A13 Bionic. Підходить для навчання та роботи.",
        delivery: "Самовивіз",
        isTop: false
    },

    {
        id: 7,
        title: "Samsung Galaxy A54",
        image: "image/523604275.webp",
        category: "Смартфони",
        price: 15499,
        discount: true,
        inStock: true,
        description: "Яскравий AMOLED-дисплей, потужна камера та великий час автономної роботи.",
        delivery: "Кур'єрська доставка",
        isTop: false
    },

    {
        id: 8,
        title: "Xiaomi Mi Band 8",
        image: "image/518860822.webp",
        category: "Розумні годинники",
        price: 1499,
        discount: false,
        inStock: true,
        description: "Новітній фітнес-браслет з поліпшеним екраном та точним датчиком пульсу.",
        delivery: "Нова пошта",
        isTop: false
    }

    
    
];

let cart = []
const cartInfo = document.getElementById("cart-info");
const productsContainer = document.getElementById("products-container");
const clearCartBtn = document.getElementById("clear-cart-btn");
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");



// Завантаження кошика з локал сторейдж
function loadCart(){
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        try {
            const parsed = JSON.parse(savedCart);
            if(Array.isArray(parsed)) {
                cart = parsed;
            } else{
                cart = [];
            }
        } catch(error){
            cart  = [];
        }
    } else {
        cart = [];
    }

}





//Збереження кошика в локал сторейдж
function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
}




 // Оновлення числа товарів в кошику
function updateCartCounter(){
    cartInfo.textContent = `Товарів у кошику: ${cart.length}`
}







function renderProducts(productsArray) {
    productsArray.forEach(function(product){
        const card = document.createElement("div")
        card.classList.add("product-card")

        card.innerHTML = ` 
            <h3>${product.title}</h3>
            <img src="${product.image}">
            <p>Категорія: ${product.category}</p>
             <p>${product.description}</p>
            <p class="yoga">Ціна: ${product.price}грн</p>
            <button class="add-to-cart-btn">Додати до кошику</button>

        `;

        const addButton = card.querySelector(".add-to-cart-btn");
        addButton.addEventListener("click", function(){
            cart.push(product.id);
            saveCart();
            updateCartCounter();
            console.log(`Ваш кошик: ${cart}`);
        });




        productsContainer.appendChild(card);
    });
}






function filterAndRender(){
    const searchText = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;

    const filteredProducts = products.filter(function (product){
        const title = product.title.toLowerCase();
        const description = product.description.toLowerCase();

  
        const matchesText = searchText === "" || title.includes(searchText) || description.includes(searchText);
        const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;

       return matchesText && matchesCategory 
    });

    productsContainer.innerHTML = ""
    renderProducts(filteredProducts);


}















loadCart();
updateCartCounter();
filterAndRender()

//Оновити каталог під час Пошуку 
searchInput.addEventListener("input", filterAndRender)


// Оновити каталог під час фільтру
categoryFilter.addEventListener("change", filterAndRender)


function clearCart() {
    cart = []; // очищаем массив
    localStorage.removeItem("cart"); // удаляем из LocalStorage
    updateCartCounter(); // обновляем счётчик
}


clearCartBtn.addEventListener("click", function () {
    clearCart();
});
