import { state } from "./state.js";
import { loadData } from "./dataService.js";

import {
  getFilteredOrders,
  getCategories,
  getIndicators,
  getOrderDetails
} from "./selectors.js";

import {
  renderIndicators,
  renderCategories,
  renderOrders,
  renderDetails,
  clearDetails,
  renderError
} from "./view.js";

function showDetails(orderId) {
  const order = state.orders.find(order => order.id === orderId);
  renderDetails(getOrderDetails(order));
}

function render() {
  renderIndicators(getIndicators());

  const orders = getFilteredOrders().map(order =>
    getOrderDetails(order)
  );

  renderOrders(orders, showDetails);
}

function setupEvents() {
  const search = document.getElementById("search");
  const status = document.getElementById("status");
  const category = document.getElementById("category");

  search.addEventListener("input", event => {
    state.search = event.target.value;
    clearDetails();
    render();
  });

  status.addEventListener("change", event => {
    state.status = event.target.value;
    clearDetails();
    render();
  });

  category.addEventListener("change", event => {
    state.category = event.target.value;
    clearDetails();
    render();
  });
}

async function init() {
  try {
    const data = await loadData();

    state.customers = data.customers;
    state.products = data.products;
    state.orders = data.orders;

    renderCategories(getCategories());
    setupEvents();
    render();
  } catch (error) {
    console.error("Initialisation impossible :", error);

    renderError(
      "Impossible de charger les données. Vérifiez les fichiers JSON et rechargez la page."
    );
  }
}

init();