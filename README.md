# TP4 — Gestion des commandes

Application frontend réalisée avec HTML, Bootstrap, CSS personnalisé
et JavaScript. Elle utilise trois fichiers JSON liés pour consulter
des commandes et retrouver les informations des clients et des produits.

## Organisation du projet

- index.html : structure de la page et chargement du module principal.
- css/style.css : personnalisation de l'interface.
- data/customers.json : données des 6 clients.
- data/products.json : données des 8 produits, répartis en 3 catégories.
- data/orders.json : données des 10 commandes.
- js/state.js : données chargées et valeurs des filtres.
- js/dataService.js : chargement des fichiers JSON avec fetch.
- js/selectors.js : relations, calculs et filtrage des données.
- js/view.js : affichage et mise à jour du DOM.
- js/app.js : initialisation, événements et coordination de l'application.

## Fonctionnalités

- Affichage des commandes avec le nom du client et le total calculé.
- Indicateurs : nombre de clients, produits, commandes et montant cumulé.
- Recherche par nom du client.
- Filtres combinés par statut et catégorie de produit.
- Détail d'une commande avec les produits, prix, quantités et montants.
- Message visible et erreur dans la console en cas d'échec du chargement.
- Interface responsive avec Bootstrap et CSS personnalisé.

Le montant cumulé comprend toutes les commandes, y compris les commandes
annulées. Le filtre par catégorie conserve une commande si au moins
un de ses produits appartient à cette catégorie. Son total reste celui
de la commande complète.

## Lancer le projet

1. Cloner le dépôt :
   git clone https://github.com/bassma-ctrl/tp4-commandes.git
2. Ouvrir le dossier obtenu dans Visual Studio Code.
3. Installer l'extension Live Server si nécessaire.
4. Faire un clic droit sur index.html et choisir Open with Live Server.

Le projet doit être lancé avec un serveur HTTP local pour charger
les fichiers JSON et les modules JavaScript.
Une connexion Internet permet de charger Bootstrap depuis son CDN.

## Vérifications réalisées

- Recherche de Sara : commandes 101 et 107.
- Recherche Sara avec le statut En attente : commande 107.
- Ajout de la catégorie Papeterie : commande 107 conservée.
- Détail de la commande 107 : total de 145 MAD.
- Catégorie Maison avec ces critères : aucun résultat.
- Chemin JSON temporairement incorrect : erreur 404 dans Network,
  erreur dans la console et message dans l'interface.
- Rétablissement du chemin correct après le test.