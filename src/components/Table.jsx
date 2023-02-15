import React from "react";

const Table = ({ tableColumns, data }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {tableColumns.map((col) => (
            <th scope="col" key={col}>
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td colspan="2">Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
