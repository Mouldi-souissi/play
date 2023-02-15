import React from "react";
import Table from "../../Table";

const tableColumns = [
  "jeux",
  "Total matches",
  "Durée du match",
  "Début",
  "Fin",
  "Durée de la session",
  "Total",
];

const today = new Date();

const data = [
  {
    game: "FIFA",
    matches: 3,
    matchType: 15,
    dateStart: today,
    dateEnd: today.setHours(today.getHours() + 1),
    duration: 45,
    total: 6,
  },
];

const Checkout = () => {
  return (
    <div>
      <Table tableColumns={tableColumns} data={data} />
    </div>
  );
};

export default Checkout;
