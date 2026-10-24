async function loadJSON(path) {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(
      `Impossible de charger ${path} : erreur ${response.status}`
    );
  }

  return await response.json();
}

export async function loadData() {
  try {
    const customers = await loadJSON("./data/customers.json");
    const products = await loadJSON("./data/products.json");
    const orders = await loadJSON("./data/orders.json");

    return { customers, products, orders };
  } catch (error) {
    console.error("Erreur de chargement :", error);
    throw error;
  }
}