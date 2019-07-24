import React from 'react';
import { Link } from 'react-router-dom';

function Pagination({ perPage, total, paginate, page }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination">
      <ul>
        {pageNumbers.map(p => (
          <li
            key={p}
            // onClick={() => paginate(p)}
          >
            <Link
              className={p === page ? 'btn btn-primary' : 'btn'}
              to={paginate + p}
            >
              {p}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
