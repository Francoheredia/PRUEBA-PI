import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../../Pages/Loader/Loader';
import dish from './assets/PngItem_1519875.png';
import s from './Home.module.css';
import {
  filterByDiets,
  getDiets,
  getRecipesAll,
  orderByName,
  orderByScore,
} from '../../redux/actions';
import Paginado from '../Paginado/Paginado';
import RecipesList from '../RecipesList/RecipesList';
import Search from '../Search/Search';

const Home = () => {
  const dispatch = useDispatch();
  const recipeAll = useSelector((state) => state.recipesAll);
  console.log(recipeAll);
  const dietAll = useSelector((state) => state.dietsAll);
  const [currenPage, setcurrenPage] = useState(1);
  const [recipesPerPage, setrecipesPerPage] = useState(9);
  const indexOfLastRecipe = currenPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipeAll.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const [orden, setOrden] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchError, setSearchError] = useState(false);
  const [filterActive, setFilterActive] = useState(false);

  const name = useSelector((state) => state.nameUser);
  console.log(name);
  const paginado = (pageNumber) => {
    setcurrenPage(pageNumber);
  };
  useEffect(() => {
    dispatch(getRecipesAll());
    dispatch(getDiets());
    setLoading(false);
    setTimeout(() => {
      setLoading(true);
    }, 900);
  }, [dispatch]);

  const validationFilters = () => {
    if (filterActive && currentRecipes.length === 0) {
      return (
        <h3 className={s.messageError}>
          {' There are no recipes with those filters '}
        </h3>
      );
    }
  };

  const handleSort = (e) => {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    dispatch(orderByScore(e.target.value));
    setcurrenPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  };

  const handleDiets = (e) => {
    e.preventDefault();
    dispatch(filterByDiets(e.target.value));
    setFilterActive(true);
    setcurrenPage(1);
    setSearchError(false);
  };

  return (
    <div className={s.divGeneral}>
      <header className={s.headerS}>
        <picture>
          <img className={s.dish} src={dish} alt={dish} />
        </picture>
        <nav>
          <div className="">
            <picture>
              <h1 className={s.titleLogo}>
                FOOD<span className={s.spanTitleLogo}>FELL</span>
              </h1>
            </picture>
          </div>
          <div className="">
            <Link to="/create">
              <button className={s.buttonCreate}>Create now</button>
            </Link>
          </div>
        </nav>
        <div className={s.containerTitleText}>
          <h1 className={s.h1}>
            Hi <span className={s.h1Span}>{name}</span> This Is The Healthy Food
            Site For <span className={s.h1Span}>Walthy Mood</span>
          </h1>
          <p className={s.pSubTitle}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod quo
            ratione quas iure dolores laboriosam sequi accusantium consequuntur
            provident tempore? Explicabo temporibus enim dolor autem, placeat
            quae iusto veritatis eos.
          </p>
        </div>
      </header>
      <div className={s.containerNavFilter}>
        <div className="">
          <label className={s.labelFilter} htmlFor="">
            Order by Name{' '}
          </label>
          <select
            className={s.inpusFilter}
            onChange={(e) => handleSort(e)}
            name=""
            id=""
          >
            <option value="asc">A Z</option>
            <option value="dsc">Z A</option>
          </select>
        </div>
        <div className="">
          <label className={s.labelFilter} htmlFor="">
            Score{' '}
          </label>
          <select
            className={s.inpusFilter}
            onChange={(e) => handleSort(e)}
            name=""
            id=""
          >
            <option value="low">Low Score </option>
            <option value="high">High Scrore</option>
          </select>
        </div>
        <div className="">
          <label className={s.labelFilter} htmlFor="">
            Diets
          </label>
          <select
            className={s.inpusFilter}
            onChange={(e) => handleDiets(e)}
            name=""
            id=""
          >
            <option value="All">All</option>
            {dietAll?.map((diet) => (
              <option value={diet.name}>{diet.name}</option>
            ))}
          </select>
        </div>
        <Search setSearchError={setSearchError} />
      </div>
      {searchError && (
        <h3 className={s.messageError}>
          {'No recipe with this name was found'}
        </h3>
      )}
      {loading ? (
        <>
          <div className={s.paginadoContainer}>
            <Paginado
              recipesPerPage={recipesPerPage}
              paginado={paginado}
              recipeAll={recipeAll.length}
            />
          </div>
          <RecipesList recipeAll={currentRecipes} />
        </>
      ) : (
        <Loader />
      )}
      {validationFilters()}
    </div>
  );
};

export default Home;
// {currentRecipes.length === 0 && (
//   <h3 className={s.messageError}>
//     {' There are no recipes with those filters '}
//   </h3>
// )}
