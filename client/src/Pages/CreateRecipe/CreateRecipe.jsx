import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getDiets, postRecipe, selecDiets } from '../../redux/actions';
import { validate } from '../../Helpers/validate';
import s from './CreateRecipe.module.css';

const CreateRecipe = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dietsAllCreate = useSelector((state) => state.dietsAll);
  const [formValue, setFormValue] = useState({
    name: '',
    score: '',
    image: '',
    summary: '',
    healthScore: '',
    steps: '',
    diets: [],
  });
  const [errors, setErrors] = useState(validate(formValue));

  const { name, score, image, summary, steps, diets, healthScore } = formValue;

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  const handleChange = ({ target }) => {
    if (target.name === 'diets') {
      if (!diets?.includes(target.value)) {
        dispatch(selecDiets(target.value));
        setFormValue({
          ...formValue,
          diets: [...formValue.diets, target.value],
        });
      }
    } else {
      setFormValue({ ...formValue, [target.name]: target.value });
    }
    setErrors(validate({ ...formValue, [target.name]: target.value }));
  };

  // const handleChange = ({ target }) => {
  //   setFormValue({
  //     ...formValue,
  //     [target.name]: target.value,
  //   });
  //   setErrors(validate({ ...formValue, [target.name]: target.value }));
  // };

  const handleSelecDiets = (e) => {
    if (!formValue.diets.includes(e.target.value)) {
      setFormValue({
        ...formValue,
        diets: [...formValue.diets, e.target.value],
      });
    }
  };
  const handleDelete = (e) => {
    setFormValue({
      ...formValue,
      diets: formValue.diets.filter((diet) => diet !== e),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postRecipe(formValue));
    navigate('/home');
  };

  console.log(diets);
  return (
    <div className={s.backgroundAll}>
      <div className={s.contaimerTitle}>
        <Link to="/home">
          <h2 className={s.titleLogo}>
            FOOD<span className={s.spanTitleLogo}>FELL</span>
          </h2>
        </Link>
      </div>
      <div className={s.containerMain}>
        <div className={s.containerImage}></div>
        <div className={s.containerFormText}>
          <h2 className={s.titleCreate}>Create your recipe</h2>
          <form className={s.form} action="" onSubmit={handleSubmit}>
            <div className={s.containerInputLabe}>
              <label htmlFor="name">Name</label>
              {errors.name && (
                <spantrue className={s.span}>{errors.name}</spantrue>
              )}
              <input
                className={errors.name ? s.inputsError : s.inputs}
                type="text"
                value={name}
                name="name"
                onChange={handleChange}
              />
            </div>
            <div className={s.containerInputLabe}>
              <label htmlFor="">Summary</label>
              {errors.summary && (
                <span className={s.span}>{errors.summary}</span>
              )}
              <input
                className={errors.summary ? s.inputsError : s.inputs}
                type="text"
                value={summary}
                name="summary"
                onChange={handleChange}
              />
            </div>
            <div className={s.containerInputLabe}>
              <label htmlFor="">Steps</label>
              {errors.steps && <span className={s.span}>{errors.steps}</span>}
              <input
                className={errors.steps ? s.inputsError : s.inputs}
                type="text"
                value={steps}
                name="steps"
                onChange={handleChange}
              />
            </div>
            <div className={s.containerInputLabe}>
              <label htmlFor="">Score</label>
              {errors.score && <span className={s.span}>{errors.score}</span>}
              <input
                className={errors.score ? s.inputsError : s.inputs}
                type="number"
                value={score}
                name="score"
                onChange={handleChange}
              />
            </div>
            <div className={s.containerInputLabe}>
              <label htmlFor="">Health Score </label>
              {errors.healthScore && (
                <span className={s.span}>{errors.healthScore}</span>
              )}
              <input
                className={errors.healthScore ? s.inputsError : s.inputs}
                type="number"
                value={healthScore}
                name="healthScore"
                onChange={handleChange}
              />
            </div>
            <div className={s.containerInputLabe}>
              <label htmlFor="">Image URL</label>
              {errors.image && <span className={s.span}>{errors.image}</span>}
              <input
                className={errors.image ? s.inputsError : s.inputs}
                type="text"
                value={image}
                name="image"
                onChange={handleChange}
              />
            </div>
            <div className={s.containerInputLabe}>
              <label htmlFor="">Diets</label>
              <select
                className={s.inputs}
                name="diets"
                onChange={handleSelecDiets}
              >
                <option value="">Seleccionar Dietas</option>
                {dietsAllCreate?.map((diet, index) => (
                  <option key={index} value={diet.name}>
                    {diet.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={s.containerInputLabe}>
              {formValue.diets == 0 && (
                <span className={s.span}>{errors.diets}</span>
              )}
              <div className={s.containerDiets}>
                {diets?.map((diet, index) => (
                  <div className={s.diets} key={index}>
                    <p>{diet}</p>
                    <button
                      className={s.buttonX}
                      onClick={() => handleDelete(diet)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {formValue.diets.length ? (
              <input
                className={s.buttondisableTrue}
                type="submit"
                disabled={false}
              />
            ) : (
              <input
                className={s.buttondisableFalse}
                type="submit"
                disabled={true}
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRecipe;
