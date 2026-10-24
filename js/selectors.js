import { state } from "./state.js";

// 7.1 : retrouver le client d'une commande
export function getCustomer(order) {
  return state.customers.find(
    customer => customer.id === order.customerId
  );
}

// 7.2 : retrouver un produit par son identifiant
export function getProduct(productId) {
  return state.products.find(
    product => product.id === productId
  );
}

// 7.3 : calculer le montant d'une ligne
export function getLineTotal(item) {
  const product = getProduct(item.productId);
  return product.price * item.quantity;
}

// 7.4 : calculer le total d'une commande
export function getOrderTotal(order) {
  let total = 0;

  order.items.forEach(item => {
    total += getLineTotal(item);
  });

  return total;
}
export function getFilteredOrders() {
  const search = state.search.trim().toLowerCase();

  return state.orders.filter(order => {
    const customer = getCustomer(order);

    const matchesSearch = customer.name
      .toLowerCase()
      .includes(search);

    const matchesStatus =
      state.status === "" || order.status === state.status;

    const matchesCategory =
      state.category === "" ||
      order.items.some(item => {
        const product = getProduct(item.productId);
        return product.category === state.category;
      });

    return matchesSearch && matchesStatus && matchesCategory;
  });
}

export function getCategories() {
  const categories = state.products.map(
    product => product.category
  );

  return [...new Set(categories)];
}
export function getIndicators() {
  let totalAmount = 0;

  state.orders.forEach(order => {
    totalAmount += getOrderTotal(order);
  });

  return [
    { label: "Clients", value: state.customers.length },
    { label: "Produits", value: state.products.length },
    { label: "Commandes", value: state.orders.length },
    {
      label: "Montant cumulé",
      value: totalAmount.toFixed(2) + " MAD"
    }
  ];
}
export function getOrderDetails(order) {
  const lines = order.items.map(item => {
    const product = getProduct(item.productId);

    return {
      name: product.name,
      price: product.price,
      quantity: item.quantity,
      total: getLineTotal(item)
    };
  });

  return {
    ...order,
    customer: getCustomer(order),
    lines: lines,
    total: getOrderTotal(order)
  };
}