import React from 'react';
import RecipeCard from '../RecipeCard/RecipeCard';
import s from './RecipesList.module.css';
const RecipesList = ({ recipeAll }) => {
  return (
    <div className={s.containerMain}>
      <ul className={s.gridRecipes}>
        {recipeAll?.map((recipe) => (
          <li className={s.li} key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipesList;
