/* --- DEFAULT DATA --- */
const defaultFoodItems = [
  {
    id: 1,
    name: "Zinger Burger",
    desc: "Crispy chicken fillet with cheese and mayo.",
    price: 450,
    category: "Fast Food",
    img: "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    name: "Chicken Biryani",
    desc: "Authentic Sindhi biryani with spicy potatoes.",
    price: 350,
    category: "Desi Cuisine",
    img: "https://images.pexels.com/photos/7394819/pexels-photo-7394819.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    name: "Chicken Karhai",
    desc: "Special desi ghee Karhai (Half/Full).",
    price: 1200,
    category: "Desi Cuisine",
    img: "https://images.pexels.com/photos/5419336/pexels-photo-5419336.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 4,
    name: "BBQ Tikka",
    desc: "Spicy marinated chicken piece grilled on coal.",
    price: 300,
    category: "BBQ",
    img: "https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 5,
    name: "Chicken Khushk",
    desc: "Special dry fry chicken piece.",
    price: 250,
    category: "Desi Cuisine",
    img: "https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 6,
    name: "Roghni Naan",
    desc: "Soft clay oven bread with sesame seeds.",
    price: 60,
    category: "Sides",
    img: "https://images.pexels.com/photos/9980758/pexels-photo-9980758.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 7,
    name: "Lacha Paratha",
    desc: "Crispy layered whole wheat paratha.",
    price: 80,
    category: "Sides",
    img: "https://images.pexels.com/photos/12737808/pexels-photo-12737808.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 8,
    name: "Masala Fries",
    desc: "Large portion of fries with chaat masala.",
    price: 200,
    category: "Fast Food",
    img: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 9,
    name: "Special Kulfa",
    desc: "Traditional creamy Kulfa with nuts.",
    price: 150,
    category: "Dessert",
    img: "https://images.pexels.com/photos/5060281/pexels-photo-5060281.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 10,
    name: "Sprite (500ml)",
    desc: "Chilled lemon-lime sparkling drink.",
    price: 100,
    category: "Drinks",
    img: "https://images.pexels.com/photos/1282273/pexels-photo-1282273.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 11,
    name: "Fanta (500ml)",
    desc: "Chilled orange sparkling drink.",
    price: 100,
    category: "Drinks",
    img: "https://images.pexels.com/photos/5947019/pexels-photo-5947019.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 12,
    name: "Mountain Dew",
    desc: "Chilled citrus flavored drink.",
    price: 100,
    category: "Drinks",
    img: "https://images.pexels.com/photos/1282276/pexels-photo-1282276.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

/* --- INITIALIZATION --- */
let foodItems =
  JSON.parse(localStorage.getItem("marqazMenu")) || defaultFoodItems;
if (!localStorage.getItem("marqazMenu")) {
  localStorage.setItem("marqazMenu", JSON.stringify(defaultFoodItems));
}

let cart = [];
let orderData = JSON.parse(localStorage.getItem("marqazOrders")) || [];

/* --- PAGINATION STATE --- */
let currentPage = 1;
const itemsPerPage = 6;
let currentCategory = "All"; // Track active category

/* --- RENDER MENU --- */
const menuGrid = document.getElementById("menuGrid");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageIndicator = document.getElementById("pageIndicator");

function renderMenu() {
  menuGrid.innerHTML = "";

  // 1. Filter Items
  const filteredItems =
    currentCategory === "All"
      ? foodItems
      : foodItems.filter((item) => item.category === currentCategory);

  // 2. Calculate Pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Safety check: if current page is greater than total pages, reset to last page
  if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  // 3. Slice Items for Current Page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToShow = filteredItems.slice(startIndex, endIndex);

  // 4. Render Cards
  if (itemsToShow.length === 0) {
    menuGrid.innerHTML =
      '<p style="text-align:center; color:#777;">No items found in this category.</p>';
  } else {
    itemsToShow.forEach((item) => {
      const card = document.createElement("div");
      card.className = "food-card";
      card.innerHTML = `
        <img src="${item.img}" alt="${item.name}" class="card-image">
        <div class="card-content">
          <h3 class="card-title">${item.name}</h3>
          <p class="card-desc">${item.desc}</p>
          <div class="card-footer">
            <span class="price">Rs ${item.price}</span>
            <button class="add-btn" onclick="addToCart(${item.id})">Add to Cart</button>
          </div>
        </div>
      `;
      menuGrid.appendChild(card);
    });
  }

  // 5. Update Buttons
  pageIndicator.innerText = `Page ${currentPage} of ${totalPages || 1}`;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages || totalPages === 0;
}

/* --- FILTER FUNCTION --- */
function filterMenu(category) {
  currentCategory = category;
  currentPage = 1; // Reset to page 1 when filter changes
  renderMenu();

  // Update Active Button Style
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.textContent.trim() === category) {
      btn.classList.add("active");
    }
  });
}

/* --- PAGINATION FUNCTION --- */
function changePage(direction) {
  currentPage += direction;
  renderMenu();
  // Scroll slightly up to menu start for better UX
  document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
}

/* --- CART LOGIC --- */
function addToCart(id) {
  const item = foodItems.find((p) => p.id === id);
  if (!item) return;
  const existingItem = cart.find((i) => i.id === id);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  updateCartCount();
  renderCartItems();
  showToast(item.name);
}

function increaseQty(index) {
  cart[index].quantity++;
  updateCartCount();
  renderCartItems();
}

function decreaseQty(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    removeItem(index);
  }
  updateCartCount();
  renderCartItems();
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCartCount();
  renderCartItems();
}

function clearCart() {
  if (cart.length === 0) {
    showWarning("Your cart is already empty.");
    return;
  }
  showConfirm("Clear Cart?", "Remove all items?", () => {
    cart = [];
    updateCartCount();
    renderCartItems();
  });
}

function updateCartCount() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById("cartCount").innerText = count;
}

function toggleCart() {
  document.getElementById("cartModal").classList.toggle("show");
}

function renderCartItems() {
  const cartList = document.getElementById("cartItemsList");
  const totalEl = document.getElementById("cartTotal");
  cartList.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartList.innerHTML =
      '<p style="text-align: center; color: #777">Your cart is empty.</p>';
  } else {
    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      const itemDiv = document.createElement("div");
      itemDiv.className = "cart-item";
      itemDiv.innerHTML = `
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>Rs ${item.price} x ${item.quantity} = Rs ${itemTotal}</p>
        </div>
        <div class="qty-controls">
          <button class="qty-btn" onclick="decreaseQty(${index})">-</button>
          <span class="qty-number">${item.quantity}</span>
          <button class="qty-btn" onclick="increaseQty(${index})">+</button>
        </div>
        <button class="remove-item-btn" onclick="removeItem(${index})">Remove</button>
      `;
      cartList.appendChild(itemDiv);
    });
  }
  totalEl.innerText = `Rs ${total}`;
}

/* --- ALERTS & TOASTS --- */
function showToast(itemName) {
  const toast = document.getElementById("toastBox");
  const msg = document.getElementById("toastItemName");
  msg.innerText = `${itemName} added to cart!`;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

function showWarning(message) {
  const toast = document.getElementById("warningToast");
  const msg = document.getElementById("warningMsg");
  msg.innerText = message;
  toast.classList.remove("show", "shake");
  void toast.offsetWidth;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

let pendingAction = null;
function showConfirm(title, message, callback) {
  const modal = document.getElementById("customConfirmModal");
  document.getElementById("confirmTitle").innerText = title;
  document.getElementById("confirmMessage").innerText = message;
  modal.classList.add("open");
  pendingAction = callback;
}
function closeConfirm() {
  document.getElementById("customConfirmModal").classList.remove("open");
  pendingAction = null;
}
document.getElementById("confirmYesBtn").addEventListener("click", () => {
  if (pendingAction) pendingAction();
  closeConfirm();
});

/* --- CHECKOUT --- */
/* --- SMART CHECKOUT LOGIC --- */

/* --- SMART CHECKOUT & EMAIL LOGIC --- */

function openCheckoutChoice() {
  if (cart.length === 0) {
    showWarning("Your cart is empty!");
    return;
  }

  // Close Cart & Open Checkout
  document.getElementById("cartModal").classList.remove("show");
  document.getElementById("checkoutModal").classList.add("show");

  // Auto-Fill Customer Data
  const saved = JSON.parse(localStorage.getItem("marqazCustomer"));
  if (saved) {
    document.getElementById("custName").value = saved.name || "";
    document.getElementById("custPhone").value = saved.phone || "";
    document.getElementById("custAddress").value = saved.address || "";
  }
}

function closeCheckoutModal() {
  document.getElementById("checkoutModal").classList.remove("show");
}

function processOrder(method) {
  // 1. Get & Validate Inputs
  const name = document.getElementById("custName").value.trim();
  const phone = document.getElementById("custPhone").value.trim();
  const address = document.getElementById("custAddress").value.trim();

  if (!name || !phone || !address) {
    showWarning("Please fill in Name, Phone, and Address.");
    return;
  }

  // 2. Save Customer Info
  localStorage.setItem(
    "marqazCustomer",
    JSON.stringify({ name, phone, address }),
  );

  // 3. Calculate Total & Prepare Items
  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  // 4. Handle Email Method
  if (method === "email") {
    // Format items for Email (using %0D%0A for new lines)
    const itemsListEmail = cart
      .map((i) => `- ${i.quantity}x ${i.name} (Rs ${i.price * i.quantity})`)
      .join("%0D%0A");

    const subject = `New Order from ${name}`;
    const body =
      `Hello Marqaz E Zaiqa,%0D%0A%0D%0A` +
      `I would like to place an order.%0D%0A%0D%0A` +
      `CUSTOMER DETAILS:%0D%0A` +
      `Name: ${name}%0D%0A` +
      `Phone: ${phone}%0D%0A` +
      `Address: ${address}%0D%0A%0D%0A` +
      `ORDER SUMMARY:%0D%0A` +
      `${itemsListEmail}%0D%0A` +
      `-----------------------------------%0D%0A` +
      `TOTAL BILL: Rs ${total}%0D%0A%0D%0A` +
      `Please confirm my order.`;

    // Opens the user's default email client
    window.location.href = `mailto:abdulrazakb63@gmail.com?subject=${subject}&body=${body}`;
  }

  // 5. Handle WhatsApp Method
  else if (method === "whatsapp") {
    const itemsListWA = cart.map((i) => `${i.quantity}x ${i.name}`).join("%0A");
    const msg =
      `*Hurray! New Order from Markaz E Zaiqa* %0A%0A` +
      `*Name:* ${name}%0A` +
      `*Phone:* ${phone}%0A` +
      `*Address:* ${address}%0A` +
      `------------------%0A` +
      `*Order:*%0A${itemsListWA}%0A` +
      `------------------%0A` +
      `*Total Bill:* Rs ${total}`;

    window.open(`https://wa.me/923090609391?text=${msg}`, "_blank");
  }

  // 6. Save Order to History & Cleanup
  const order = {
    id: Date.now(),
    date: new Date().toLocaleString(),
    items: cart.map((i) => ({ name: i.name, quantity: i.quantity })),
    total: total,
    status: method === "email" ? "Email" : "WhatsApp",
  };

  const history = JSON.parse(localStorage.getItem("marqazOrders")) || [];
  history.push(order);
  localStorage.setItem("marqazOrders", JSON.stringify(history));

  cart = [];
  updateCartCount();
  renderCartItems();
  closeCheckoutModal();
  showToast("Order placed successfully!");
}

function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

/* --- SCROLL ANIMATION OBSERVER --- */
// This triggers animations when elements come into view
const observerOptions = {
  threshold: 0.2,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Select elements to animate
const aboutImage = document.querySelector(".about-image-wrapper");
const aboutTextElements = document.querySelectorAll(".animate-text");

if (aboutImage) observer.observe(aboutImage);
aboutTextElements.forEach((el) => observer.observe(el));

/* --- REVIEWS / COMMENTS LOGIC --- */

// 1. Initial Data (Dummy reviews for new users)
const defaultReviews = [
  {
    name: "Ali Khan",
    email: "ali@test.com",
    msg: "Best Zinger in Daharki! The cheese was perfect.",
    date: "10/24/2025",
    hidden: false,
    pinned: false,
  },
  {
    name: "Sara Ahmed",
    email: "sara@test.com",
    msg: "Loved the Biryani. Very authentic taste.",
    date: "10/23/2025",
    hidden: false,
    pinned: false,
  },
  {
    name: "Bilal",
    email: "bilal@test.com",
    msg: "Service was great and food was hot.",
    date: "10/22/2025",
    hidden: false,
    pinned: false,
  },
  {
    name: "Usman",
    email: "usman@test.com",
    msg: "The Karhai is a must-try. Highly recommended.",
    date: "10/20/2025",
    hidden: false,
    pinned: false,
  },
  {
    name: "Hassan",
    email: "hassan@test.com",
    msg: "Good fries, very crispy.",
    date: "10/19/2025",
    hidden: false,
    pinned: false,
  },
  {
    name: "Zainab",
    email: "zainab@test.com",
    msg: "Tea was fantastic.",
    date: "10/18/2025",
    hidden: false,
    pinned: false,
  },
];

// Load from LocalStorage or use Default
let reviews =
  JSON.parse(localStorage.getItem("marqazReviews")) || defaultReviews;
if (!localStorage.getItem("marqazReviews")) {
  localStorage.setItem("marqazReviews", JSON.stringify(defaultReviews));
}

/* --- REVIEWS / COMMENTS LOGIC --- */

// ... (previous code for loading reviews) ...

let commCurrentPage = 1;
const commPerPage = 4; // CHANGED: Show only 4 comments per page

// 2. Function to Render Reviews
function renderReviews() {
  const list = document.getElementById("commentsList");
  list.innerHTML = "";

  // Filter & Sort
  const activeReviews = reviews
    .filter((r) => !r.hidden)
    .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  // Calculate Pages
  const totalPages = Math.ceil(activeReviews.length / commPerPage);

  // Safety Checks
  if (commCurrentPage > totalPages && totalPages > 0)
    commCurrentPage = totalPages;
  if (commCurrentPage < 1) commCurrentPage = 1;

  // Slice Data for Current Page
  const start = (commCurrentPage - 1) * commPerPage;
  const end = start + commPerPage;
  const reviewsToShow = activeReviews.slice(start, end);

  // Render
  if (reviewsToShow.length === 0) {
    list.innerHTML =
      '<p class="empty-msg">No reviews yet. Be the first to leave a comment!</p>';
  } else {
    reviewsToShow.forEach((r) => {
      const pinIcon = r.pinned
        ? '<i class="fas fa-thumbtack" style="color:#ff9f43; margin-right:5px;"></i>'
        : "";
      const pinStyle = r.pinned
        ? "border-left: 3px solid #ff9f43; background:#252525;"
        : "";

      const card = document.createElement("div");
      card.className = "comment-card";
      if (r.pinned) card.style = pinStyle;

      card.innerHTML = `
        <div class="comment-header">
          <span class="c-name">${pinIcon} ${r.name}</span>
          <span class="c-date">${r.date}</span>
        </div>
        <div class="comment-body">
          <p>${r.msg}</p>
        </div>
      `;
      list.appendChild(card);
    });
  }

  // Update Pagination Controls
  const pagination = document.getElementById("commentPagination");
  pagination.innerHTML = `
    <button class="page-btn small" onclick="changeCommentPage(-1)" ${commCurrentPage === 1 ? "disabled" : ""}>
      <i class="fas fa-chevron-left"></i>
    </button>
    <span id="commPageIndicator" class="page-indicator">${commCurrentPage} / ${totalPages || 1}</span>
    <button class="page-btn small" onclick="changeCommentPage(1)" ${commCurrentPage === totalPages || totalPages === 0 ? "disabled" : ""}>
      <i class="fas fa-chevron-right"></i>
    </button>
  `;
}

// 3. Handle Form Submit
function handleCommentSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.querySelector('input[name="name"]').value.trim();
  const email = form.querySelector('input[name="email"]').value.trim();
  const msg = form.querySelector('textarea[name="msg"]').value.trim();
  if (!name || !email || !msg) {
    showWarning("Please fill in all fields.");
    return;
  }
  const newReview = {
    name,
    email,
    msg,
    date: new Date().toLocaleDateString(),
    hidden: false,
    pinned: false,
  };
  reviews.push(newReview);
  localStorage.setItem("marqazReviews", JSON.stringify(reviews));
  form.reset();
  renderReviews();
  showToast("Review submitted!");
}

// 4. Change Page
function changeCommentPage(direction) {
  commCurrentPage += direction;
  renderReviews();
}

/* --- MOBILE MENU LOGIC --- */
function toggleMobileMenu() {
  const navLinks = document.getElementById("navLinks");
  navLinks.classList.toggle("active");
}

function closeMobileMenu() {
  const navLinks = document.getElementById("navLinks");
  navLinks.classList.remove("active");
}

// Initialize Reviews
renderReviews();
// Init
renderMenu();

// Back to top: /* --- BACK TO TOP LOGIC --- */
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  // Show button if scrolled down more than 300px
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", () => {
  // Smooth scroll to top
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
