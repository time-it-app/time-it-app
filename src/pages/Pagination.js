import React from 'react';
import { Link } from 'react-router-dom';

export default function Pagination({ rowsPerPage, totalRows, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRows / rowsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="Pagination">
      <ul>
        {pageNumbers.map((number) => (
          <li key={number}>
            <a onClick={() => paginate(number)}>{number}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
