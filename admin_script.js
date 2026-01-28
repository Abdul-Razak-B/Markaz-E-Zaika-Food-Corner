/* --- DEFAULT DATA (Reliable Source of Truth) --- */
const defaultData = [
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
// Load data from LocalStorage or fall back to defaultData
let menuData = JSON.parse(localStorage.getItem("marqazMenu")) || defaultData;
let orderData = JSON.parse(localStorage.getItem("marqazOrders")) || [];
let reviewsData = JSON.parse(localStorage.getItem("marqazReviews")) || [];

// Ensure localStorage is populated on first load
if (!localStorage.getItem("marqazMenu")) {
  localStorage.setItem("marqazMenu", JSON.stringify(defaultData));
}

/* --- DASHBOARD STATS --- */
function updateDashboardStats() {
  const totalRevenue = orderData.reduce(
    (sum, order) => sum + (order.total || 0),
    0,
  );

  document.getElementById("totalOrdersCount").innerText = orderData.length;
  document.getElementById("totalRevenueCount").innerText =
    `Rs ${totalRevenue.toLocaleString()}`;
  document.getElementById("totalMenuCount").innerText = menuData.length;
  document.getElementById("totalReviewsCount").innerText = reviewsData.length;
}

/* --- MENU TAB FUNCTIONS --- */
function updateItem(index, field, value) {
  if (field === "price") {
    menuData[index][field] = parseInt(value) || 0;
  } else {
    menuData[index][field] = value;
  }
}

function renderMenuTable() {
  const tbody = document.getElementById("menuBody");
  tbody.innerHTML = "";

  menuData.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${item.id}</td>
            
            <td><input type="text" class="input-field" value="${item.name}" onchange="updateItem(${index}, 'name', this.value)"></td>
            
            <td>
                <select class="input-field" onchange="updateItem(${index}, 'category', this.value)">
                    <option value="Fast Food" ${item.category === "Fast Food" ? "selected" : ""}>Fast Food</option>
                    <option value="Desi Cuisine" ${item.category === "Desi Cuisine" ? "selected" : ""}>Desi Cuisine</option>
                    <option value="BBQ" ${item.category === "BBQ" ? "selected" : ""}>BBQ</option>
                    <option value="Sides" ${item.category === "Sides" ? "selected" : ""}>Sides</option>
                    <option value="Dessert" ${item.category === "Dessert" ? "selected" : ""}>Dessert</option>
                    <option value="Drinks" ${item.category === "Drinks" ? "selected" : ""}>Drinks</option>
                </select>
            </td>
            
            <td><input type="text" class="input-field" value="${item.img}" onchange="updateItem(${index}, 'img', this.value)"></td>
            <td><input type="text" class="input-field" value="${item.desc}" onchange="updateItem(${index}, 'desc', this.value)"></td>
            <td><input type="number" class="input-field" value="${item.price}" onchange="updateItem(${index}, 'price', this.value)"></td>
            
            <td style="text-align: center;">
                <button class="action-btn delete" onclick="deleteItem(${index})" title="Delete Item">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
    tbody.appendChild(row);
  });
}

function saveMenuChanges() {
  localStorage.setItem("marqazMenu", JSON.stringify(menuData));
  updateDashboardStats();
  showCustomAlert();
}

function resetToDefault() {
  if (
    confirm(
      "WARNING: This will delete ALL menu changes and restore defaults. Are you sure?",
    )
  ) {
    localStorage.setItem("marqazMenu", JSON.stringify(defaultData));
    location.reload(); // Reload page to reflect changes immediately
  }
}

function deleteItem(index) {
  if (confirm(`Are you sure you want to delete "${menuData[index].name}"?`)) {
    menuData.splice(index, 1);
    localStorage.setItem("marqazMenu", JSON.stringify(menuData));
    renderMenuTable();
    updateDashboardStats();
  }
}

/* --- ORDER TAB FUNCTIONS --- */
function renderOrderTable() {
  const tbody = document.getElementById("orderBody");
  tbody.innerHTML = "";

  if (orderData.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="4" style="text-align:center; color:#777;">No orders found.</td></tr>';
    return;
  }

  orderData.forEach((order) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${order.date || "N/A"}</td>
      <td>${order.items ? order.items.map((i) => i.name + " (x" + i.quantity + ")").join(", ") : "N/A"}</td>
      <td>Rs ${order.total || 0}</td>
      <td>${order.status || "Pending"}</td>
    `;
    tbody.appendChild(row);
  });
}

function clearOrders() {
  if (confirm("Delete entire order history?")) {
    orderData = [];
    localStorage.setItem("marqazOrders", JSON.stringify(orderData));
    renderOrderTable();
    updateDashboardStats();
  }
}

/* --- REVIEWS TAB FUNCTIONS --- */
function renderReviewsTable() {
  const tbody = document.getElementById("reviewsBody");
  tbody.innerHTML = "";

  if (reviewsData.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="5" style="text-align:center; color:#777;">No reviews found.</td></tr>';
    return;
  }

  reviewsData.forEach((r, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${r.name}</td>
      <td>${r.msg}</td>
      <td>${r.date}</td>
      <td>${r.pinned ? "Pinned" : r.hidden ? "Hidden" : "Visible"}</td>
      <td>
        <button onclick="toggleReviewProp(${index}, 'pinned')" class="action-btn">${r.pinned ? "Unpin" : "Pin"}</button>
        <button onclick="toggleReviewProp(${index}, 'hidden')" class="action-btn">${r.hidden ? "Show" : "Hide"}</button>
        <button onclick="deleteReview(${index})" class="action-btn delete">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function toggleReviewProp(index, prop) {
  reviewsData[index][prop] = !reviewsData[index][prop];
  localStorage.setItem("marqazReviews", JSON.stringify(reviewsData));
  renderReviewsTable();
}

function deleteReview(index) {
  if (confirm("Delete this review?")) {
    reviewsData.splice(index, 1);
    localStorage.setItem("marqazReviews", JSON.stringify(reviewsData));
    renderReviewsTable();
    updateDashboardStats();
  }
}

function clearAllReviews() {
  if (confirm("Delete ALL reviews?")) {
    reviewsData = [];
    localStorage.setItem("marqazReviews", JSON.stringify(reviewsData));
    renderReviewsTable();
    updateDashboardStats();
  }
}

/* --- UTILITIES --- */
function showTab(tabId) {
  document
    .querySelectorAll(".section")
    .forEach((s) => s.classList.remove("active"));
  document
    .querySelectorAll(".tab-btn")
    .forEach((b) => b.classList.remove("active"));

  document.getElementById(tabId).classList.add("active");

  // Highlight correct button
  const index = tabId === "menu-tab" ? 0 : tabId === "orders-tab" ? 1 : 2;
  document.querySelectorAll(".tab-btn")[index].classList.add("active");

  // Refresh data when switching tabs
  if (tabId === "menu-tab") {
    renderMenuTable();
  } else if (tabId === "orders-tab") {
    orderData = JSON.parse(localStorage.getItem("marqazOrders")) || [];
    renderOrderTable();
  } else if (tabId === "reviews-tab") {
    reviewsData = JSON.parse(localStorage.getItem("marqazReviews")) || [];
    renderReviewsTable();
  }
}

function showCustomAlert(msg) {
  const alertBox = document.getElementById("customAlert");
  alertBox.innerHTML = `<i class="fas fa-check-circle"></i> ${msg || "Changes Saved!"}`;
  alertBox.classList.add("show");
  setTimeout(() => alertBox.classList.remove("show"), 3000);
}

// Initialize on Load
document.addEventListener("DOMContentLoaded", () => {
  renderMenuTable();
  renderOrderTable();
  renderReviewsTable();
  updateDashboardStats();
});

/* --- ADD ITEM POPUP LOGIC --- */

// 1. Open the Modal
function addMenuItem() {
  const modal = document.getElementById("addItemModal");
  modal.classList.add("show");

  // Clear previous values
  document.getElementById("newItemName").value = "";
  document.getElementById("newItemImg").value = "";
  document.getElementById("newItemDesc").value = "";
  document.getElementById("newItemPrice").value = "";
  document.getElementById("newItemCategory").value = "Fast Food";
}

// 2. Close the Modal
function closeAddModal() {
  document.getElementById("addItemModal").classList.remove("show");
}

// 3. Confirm and Add the Item
function confirmAddItem() {
  // Get values
  const name = document.getElementById("newItemName").value.trim();
  const category = document.getElementById("newItemCategory").value;
  const img = document.getElementById("newItemImg").value.trim();
  const desc = document.getElementById("newItemDesc").value.trim();
  const price = document.getElementById("newItemPrice").value.trim();

  // Validation
  if (!name || !price) {
    showCustomAlert("Please enter at least a Name and Price.");
    return;
  }

  // Generate New ID
  const newId =
    menuData.length > 0 ? Math.max(...menuData.map((i) => i.id)) + 1 : 1;

  // Create New Item Object
  const newItem = {
    id: newId,
    name: name,
    category: category,
    img: img || "https://cdn-icons-png.flaticon.com/512/1377/1377137.png", // Default icon if empty
    desc: desc || "Delicious fresh food.",
    price: Number(price),
  };

  // Add to Array
  menuData.push(newItem);

  // Refresh Table
  renderMenuTable();

  // Close Modal
  closeAddModal();

  // Scroll to bottom
  const tableContainer = document.querySelector(".table-container");
  setTimeout(() => {
    tableContainer.scrollTop = tableContainer.scrollHeight;
  }, 100);

  showCustomAlert("Item Added Successfully! Remember to Save.");
}
