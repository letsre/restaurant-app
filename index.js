import { menuArray } from "/data.js";
const items = document.getElementById("items");

const paymentForm = document.getElementById("payment-form");
const orderArr = [];

paymentForm.addEventListener("submit", (e) => {
  e.preventDefault();
});
document.addEventListener("click", function (e) {
  menuArray[e.target.id] && addOrderClick(e.target.id);
  e.target.id === "completeOrder" && payment();
  e.target.id === "pay" && getFormValue(e);
  e.target.id === "icon" && closeBtn();
});

render();

function render() {
  const itemArray = menuArray
    .map((menu) => {
      return `
  <li class = "item">
   <div class = "flex-container">
    <h3>${menu.emoji}</h3>
    <div class = "description">
     <h4>${menu.name}</h4>
     <p>${menu.ingredients}</p>
     <h5>$${menu.price}</h5>
    </div>
    <button id= "${menu.id}">+</button
   </div>
  </li>`;
    })
    .join("");

  items.innerHTML = itemArray;
}

function addOrderClick(id) {
  const order = menuArray.filter((menu) => menu.id == id)[0];
  order.count || (order.count = 1);
  order.incrementCount = function () {
    order.count++;
  };

  if (orderArr.includes(order)) {
    order.incrementCount();
  } else {
    orderArr.push(order);
  }
  showOrders(orderArr);
}

function showOrders(arr) {
  const orders = document.getElementById("orders");
  let totalPrice = 0;
  const ordersItem = arr
    .map((order) => {
      totalPrice += order.price * order.count;
      return `
    <div class="order">
     <span id="name">${order.name} </span>
     <span id="price">$${order.price} x ${order.count}</span>
   </div>`;
    })
    .join("");
  document.getElementById("hidden").classList.remove("hidden");
  document.getElementById("totalPrice").textContent = `$${totalPrice}.00`;
  orders.innerHTML = ordersItem;
  console.log(totalPrice);
}
function payment() {
  document.querySelector(".paymentMethod").classList.remove("hidden");
  document.querySelector(".container").classList.add("blur");
}
function getFormValue(e) {
  const message = document.querySelector(".span-message");
  const paymentFormData = new FormData(paymentForm);
  const name = paymentFormData.get("name");
  message.textContent = `Thanks, ${name}! Your order is on its way!`;
  document.querySelector(".container").classList.remove("blur");
  document.querySelector(".paymentMethod").classList.add("hidden");
  document.querySelector(".message").classList.remove("hidden");
  document.getElementById("hidden").classList.add("hidden");
  setTimeout(function () {
    location.reload();
  }, 5000);
}
function closeBtn() {
  document.querySelector(".paymentMethod").classList.add("hidden");
  document.querySelector(".container").classList.remove("blur");
}
