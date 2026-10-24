export function renderIndicators(indicators) {
  const container = document.getElementById("indicators");
  container.innerHTML = "";

  indicators.forEach(indicator => {
    const column = document.createElement("div");
    column.className = "col-6 col-lg-3";

    const card = document.createElement("div");
    card.className = "card h-100 shadow-sm";

    const body = document.createElement("div");
    body.className = "card-body";

    const label = document.createElement("h2");
    label.className = "h6 text-secondary";
    label.textContent = indicator.label;

    const value = document.createElement("p");
    value.className = "h4 mb-0";
    value.textContent = indicator.value;

    body.append(label, value);
    card.append(body);
    column.append(card);
    container.append(column);
  });
}
export function renderCategories(categories) {
  const select = document.getElementById("category");
  select.innerHTML = '<option value="">Toutes les catégories</option>';

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    select.append(option);
  });
}

export function renderOrders(orders, onDetails) {
  const container = document.getElementById("orders");
  container.innerHTML = "";

  if (orders.length === 0) {
    container.textContent = "Aucune commande ne correspond aux filtres.";
    return;
  }

  orders.forEach(order => {
    const column = document.createElement("div");
    column.className = "col-md-6 col-lg-4";

    const card = document.createElement("div");
    card.className = "card h-100 shadow-sm";

    const body = document.createElement("div");
    body.className = "card-body";

    const title = document.createElement("h3");
    title.className = "h5";
    title.textContent = "Commande #" + order.id;

    const client = document.createElement("p");
    client.textContent = "Client : " + order.customer.name;

    const date = document.createElement("p");
    date.textContent = "Date : " + order.date;

    const status = document.createElement("p");
    status.textContent = "Statut : " + order.status;

    const total = document.createElement("p");
    total.className = "fw-bold";
    total.textContent = "Total : " + order.total.toFixed(2) + " MAD";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn btn-primary";
    button.textContent = "Voir les détails";
    button.addEventListener("click", () => onDetails(order.id));

    body.append(title, client, date, status, total, button);
    card.append(body);
    column.append(card);
    container.append(column);
  });
}
export function clearDetails() {
  document.getElementById("details").innerHTML = "";
}

export function renderDetails(order) {
  const container = document.getElementById("details");
  container.innerHTML = "";

  const card = document.createElement("div");
  card.className = "card border-primary";

  const body = document.createElement("div");
  body.className = "card-body";

  const title = document.createElement("h2");
  title.className = "h4";
  title.textContent = "Détail de la commande #" + order.id;
  body.append(title);

  const information = [
    "Client : " + order.customer.name,
    "Ville : " + order.customer.city,
    "Date : " + order.date,
    "Statut : " + order.status
  ];

  information.forEach(text => {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    body.append(paragraph);
  });

  const wrapper = document.createElement("div");
  wrapper.className = "table-responsive";

  const table = document.createElement("table");
  table.className = "table table-striped";
  table.innerHTML = `
    <thead>
      <tr>
        <th scope="col">Produit</th>
        <th scope="col">Prix unitaire</th>
        <th scope="col">Quantité</th>
        <th scope="col">Montant</th>
      </tr>
    </thead>
  `;

  const tbody = document.createElement("tbody");

  order.lines.forEach(line => {
    const row = document.createElement("tr");

    const values = [
      line.name,
      line.price.toFixed(2) + " MAD",
      line.quantity,
      line.total.toFixed(2) + " MAD"
    ];

    values.forEach(value => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.append(cell);
    });

    tbody.append(row);
  });

  table.append(tbody);
  wrapper.append(table);

  const total = document.createElement("p");
  total.className = "fw-bold";
  total.textContent = "Total : " + order.total.toFixed(2) + " MAD";

  const close = document.createElement("button");
  close.type = "button";
  close.className = "btn btn-outline-secondary";
  close.textContent = "Fermer les détails";
  close.addEventListener("click", clearDetails);

  body.append(wrapper, total, close);
  card.append(body);
  container.append(card);
}
export function renderError(message) {
  const container = document.getElementById("error");
  container.textContent = message;
  container.classList.remove("d-none");
}