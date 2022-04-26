import React from 'react';
import { Link } from 'react-router-dom';
import s from './RecipeCard.module.css';
const RecipeCard = ({ recipe }) => {
  const { image, name, diets, id, score } = recipe;

  return (
    <div className={s.containerCard}>
      <img className={s.img} src={image} alt={image} />
      <div className={s.containerTextCard}>
        <div className={s.containertitleInfo}>
          <h4 className={s.titleCard}>{name}</h4>
          <Link to={`/detail/${id}`}>
            <button className={s.buttonLink}> See more</button>
          </Link>
        </div>
        <ul className={s.containerDiets}>
          {recipe.createInDb
            ? diets.map((diets) => <li className={s.li}>{diets.name}</li>)
            : diets.map((diets) => <li className={s.li}>{diets} </li>)}
        </ul>
      </div>
    </div>
  );
};

export default RecipeCard;

// {recipe.diets?.map((diets) => (
//     <li>{diets}</li>
//   ))}
