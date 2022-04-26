import React from 'react';
import s from './Paginado.module.css';
const Paginado = ({ recipesPerPage, paginado, recipeAll }) => {
  const pageNumber = [];
  for (let i = 0; i < Math.ceil(recipeAll / recipesPerPage); i++) {
    pageNumber.push(i + 1);
  }
  return (
    <div>
      <nav>
        <ul className={s.paginadoContainer}>
          {pageNumber &&
            pageNumber.map((number) => (
              <li className={s.li} key={number}>
                <a className={s.a} onClick={() => paginado(number)}>
                  {number}
                </a>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
};

export default Paginado;
