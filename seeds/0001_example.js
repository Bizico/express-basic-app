exports.seed = function(knex, Promise) {
  const data = [
    { id: 1, name: "Eggs", price: 0.5, qty: 10, barcode: "EGG432141" },
    { id: 2, name: "Milk", price: 2.5, qty: 2, barcode: "MLK957212" },
    { id: 3, name: "Bread", price: 2, qty: 1, barcode: "BRD226943" },
    { id: 4, name: "Apple", price: 1, qty: 3, barcode: "APL230010" },
    { id: 5, name: "Banana", price: 1.5, qty: 2, barcode: "BNA715315" },
    { id: 6, name: "Spam", price: 5, qty: 1, barcode: "SPM239742" },
    { id: 7, name: "Salt", price: 2.78, qty: 1, barcode: "SLT110023" }
  ];

  return Promise.all([
    knex("shopping_list")
      .del()
      .then(() => {
        return knex("shopping_list").insert(data);
      })
  ]);
};
