// Product Data
const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 99,
    original: 149,
    discount: 34,
    rating: 4.5,
    reviews: 328,
    category: "electronics",
    emoji: "🎧",
    badge: "-34%",
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    price: 249,
    original: 399,
    discount: 38,
    rating: 4.8,
    reviews: 512,
    category: "electronics",
    emoji: "⌚",
    badge: "-38%",
  },
  {
    id: 3,
    name: "Vintage Film Camera",
    price: 199,
    original: 299,
    discount: 33,
    rating: 4.3,
    reviews: 145,
    category: "electronics",
    emoji: "📷",
    badge: "-33%",
  },
  {
    id: 4,
    name: "Ultra Laptop Bag",
    price: 59,
    original: 99,
    discount: 40,
    rating: 4.6,
    reviews: 289,
    category: "accessories",
    emoji: "🎒",
    badge: "-40%",
  },
  {
    id: 5,
    name: "Latest Smartphone",
    price: 799,
    original: 999,
    discount: 20,
    rating: 4.7,
    reviews: 1203,
    category: "electronics",
    emoji: "📱",
    badge: "-20%",
  },
  {
    id: 6,
    name: "Portable Charger 20K",
    price: 45,
    original: 75,
    discount: 40,
    rating: 4.4,
    reviews: 567,
    category: "accessories",
    emoji: "🔋",
    badge: "-40%",
  },
  {
    id: 7,
    name: "Gaming Laptop Beast",
    price: 1299,
    original: 1799,
    discount: 28,
    rating: 4.9,
    reviews: 834,
    category: "electronics",
    emoji: "💻",
    badge: "-28%",
  },
  {
    id: 8,
    name: "Premium USB-C Cable",
    price: 29,
    original: 49,
    discount: 41,
    rating: 4.5,
    reviews: 892,
    category: "accessories",
    emoji: "🔌",
    badge: "-41%",
  },
  {
    id: 9,
    name: "Wireless Charging Pad",
    price: 39,
    original: 65,
    discount: 40,
    rating: 4.3,
    reviews: 421,
    category: "accessories",
    emoji: "⚡",
    badge: "-40%",
  },
  {
    id: 10,
    name: "Bluetooth Speaker Max",
    price: 129,
    original: 199,
    discount: 35,
    rating: 4.6,
    reviews: 756,
    category: "electronics",
    emoji: "🔊",
    badge: "-35%",
  },
  {
    id: 11,
    name: "Phone Screen Protector",
    price: 15,
    original: 25,
    discount: 40,
    rating: 4.4,
    reviews: 1024,
    category: "accessories",
    emoji: "💎",
    badge: "-40%",
  },
  {
    id: 12,
    name: "Gaming Mouse RGB",
    price: 79,
    original: 129,
    discount: 39,
    rating: 4.7,
    reviews: 645,
    category: "electronics",
    emoji: "🖱️",
    badge: "-39%",
  },
];

let cart = [];
let filteredProducts = [...products];

// DOM Elements
const productsGrid = document.getElementById("productsGrid");
const cartModal = document.getElementById("cartModal");
const cartCount = document.getElementById("cartCount");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");
const searchInput = document.getElementById("searchInput");


function checkAuth() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    productsGrid.innerHTML = `
            <div style="text-align:center; padding:40px; color:#ccc;">
                <h2>Please login to view products</h2>
                <a href="../loginOutPage/index.html" style="color:#4f8be8; text-decoration:underline;">
                    Go to Login
                </a>
            </div>
        `;
    return false;
  }

  return true;
}

// Initialize App
function init() {
    
  if (!checkAuth()) return;

  renderProducts();
  setupEventListeners();
}
 

// Setup Event Listeners
function setupEventListeners() {
  categoryFilter.addEventListener("change", applyFilters);
  sortFilter.addEventListener("change", applyFilters);
  searchInput.addEventListener("input", applyFilters);
  document.addEventListener("click", (e) => {
    if (e.target === cartModal) closeCart();
  });
}

// Apply Filters
function applyFilters() {
  filteredProducts = products.filter((product) => {
    const categoryMatch =
      categoryFilter.value === "all" ||
      product.category === categoryFilter.value;
    const searchMatch =
      searchInput.value === "" ||
      product.name.toLowerCase().includes(searchInput.value.toLowerCase());
    return categoryMatch && searchMatch;
  });

  // Sort
  const sortValue = sortFilter.value;
  if (sortValue === "price-low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortValue === "price-high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortValue === "newest") {
    filteredProducts.reverse();
  }

  renderProducts();
}

// Render Products
function renderProducts() {
  productsGrid.innerHTML = filteredProducts
    .map(
      (product) => `
                <div class="product-card">
                    <div class="product-image ${
                      [
                        "cat",
                        "watch",
                        "headphones",
                        "camera",
                        "laptop",
                        "phone",
                      ][product.id % 6]
                    }">
                        ${product.emoji}
                        ${
                          product.badge
                            ? `<div class="product-badge">${product.badge}</div>`
                            : ""
                        }
                    </div>
                    <div class="product-info">
                        <div class="product-name">${product.name}</div>
                        <div class="product-rating">
                            <span class="stars">${"⭐".repeat(
                              Math.floor(product.rating)
                            )}</span>
                            <span>(${product.reviews})</span>
                        </div>
                        <div class="product-price">
                            <span class="current-price">₹${product.price}</span>
                            ${
                              product.original
                                ? `<span class="original-price">₹${product.original}</span>`
                                : ""
                            }
                        </div>
                        <button class="add-to-cart-btn" onclick="addToCart(${
                          product.id
                        })">Add to Cart</button>
                    </div>
                </div>
            `
    )
    .join("");
}

// Add to Cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartUI();
  showToast(`${product.name} added to cart!`);
}

// Remove from Cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCartUI();
}

// Update Quantity
function updateQuantity(productId, newQuantity) {
  if (newQuantity <= 0) {
    removeFromCart(productId);
  } else {
    const item = cart.find((item) => item.id === productId);
    if (item) item.quantity = newQuantity;
    updateCartUI();
  }
}

// Update Cart UI
function updateCartUI() {
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  renderCart();
}

// Render Cart
function renderCart() {
  const cartItemsList = document.getElementById("cartItemsList");

  if (cart.length === 0) {
    cartItemsList.innerHTML = `
                    <div class="empty-cart">
                        <div class="empty-cart-icon">🛒</div>
                        <p>Your cart is empty</p>
                        <p style="font-size: 14px; margin-top: var(--space-8);">Start shopping to add items!</p>
                    </div>
                `;
    return;
  }

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  cartItemsList.innerHTML = `
                <div class="cart-items-list">
                    ${cart
                      .map(
                        (item) => `
                        <div class="cart-item">
                            <div class="cart-item-image ${
                              [
                                "cat",
                                "watch",
                                "headphones",
                                "camera",
                                "laptop",
                                "phone",
                              ][item.id % 6]
                            }">
                                ${item.emoji}
                            </div>
                            <div class="cart-item-details">
                                <div>
                                    <div class="cart-item-name">${
                                      item.name
                                    }</div>
                                    <div class="cart-item-price">₹${
                                      item.price
                                    }</div>
                                </div>
                                <div class="quantity-control">
                                    <button class="quantity-btn" onclick="updateQuantity(${
                                      item.id
                                    }, ${item.quantity - 1})">−</button>
                                    <div class="quantity-display">${
                                      item.quantity
                                    }</div>
                                    <button class="quantity-btn" onclick="updateQuantity(${
                                      item.id
                                    }, ${item.quantity + 1})">+</button>
                                    <button class="remove-btn" onclick="removeFromCart(${
                                      item.id
                                    })">Remove</button>
                                </div>
                            </div>
                        </div>
                    `
                      )
                      .join("")}
                </div>

                <div class="cart-summary">
                    <div class="summary-row">
                        <span>Subtotal:</span>
                        <span>₹${cartTotal}</span>
                    </div>
                    <div class="summary-row">
                        <span>Shipping:</span>
                        <span>Free</span>
                    </div>
                    <div class="summary-row total">
                        <span>Total:</span>
                        <span>₹${cartTotal}</span>
                    </div>
                    <button class="checkout-btn" onclick="checkout()">Proceed to Checkout</button>
                </div>
            `;
}

// Open Cart
function openCart() {
  cartModal.classList.add("active");
  renderCart();
}

// Close Cart
function closeCart() {
  cartModal.classList.remove("active");
}

// Checkout
function checkout() {
  if (cart.length === 0) return;
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  showToast(`Order placed! Total: ₹${total}`);
  cart = [];
  updateCartUI();
  closeCart();
}

// Show Toast
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}


// Initialize
 init()
