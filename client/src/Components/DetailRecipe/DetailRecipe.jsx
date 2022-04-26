import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Loader from '../../Pages/Loader/Loader';
import { getClean, getDetail } from '../../redux/actions';
import s from './DetailRecipe.module.css';

const DetailRecipe = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
    return () => {
      dispatch(getClean());
    };
  }, []);
  const detailAllRecipe = useSelector((state) => state.detail[0]);

  return (
    <main>
      <div className={s.contaimerTitle}>
        <Link to="/home">
          <h2 className={s.titleLogo}>
            FOOD<span className={s.spanTitleLogo}>FELL</span>
          </h2>
        </Link>
      </div>
      <div className={s.containerPrincipal}>
        <div className={s.containerDetail}>
          <div className={s.containerLeft}>
            <picture className={s.picture}>
              {detailAllRecipe && (
                <img
                  className={s.imgDetail}
                  src={detailAllRecipe.image}
                  alt={detailAllRecipe.image}
                />
              )}
            </picture>
          </div>
          <div className={s.containerRigth}>
            {detailAllRecipe ? (
              <div className="">
                <h2 className={s.titleDetail}>{detailAllRecipe.name}</h2>
                <div
                  className={s.textSummary}
                  dangerouslySetInnerHTML={{ __html: detailAllRecipe.summary }}
                />

                <div className={s.containerNumrbes}>
                  <div className={s.containerScore}>
                    <p className={s.numberScoreAndHealt}>
                      {detailAllRecipe.score}
                    </p>
                    <span>Score</span>
                  </div>
                  <div className={s.containerScore}>
                    <p className={s.numberScoreAndHealt}>
                      {detailAllRecipe.healthScore}
                    </p>{' '}
                    <span>Health Score</span>
                  </div>
                </div>
                <ul>
                  <h4 className={s.titleDiets}>Diets</h4>
                  {detailAllRecipe.createInDb
                    ? detailAllRecipe.diets.map((diets) => (
                        <li className={s.li}>{diets.name}</li>
                      ))
                    : detailAllRecipe.diets.map((diets) => (
                        <li className={s.li}>{diets} </li>
                      ))}
                </ul>
                <h4 className={s.titleDiets}>Steps:</h4>
                {detailAllRecipe.createInDb ? (
                  <div className={s.containerSteps}>
                    <li className={s.liSteptsStep}>{detailAllRecipe.steps}</li>
                  </div>
                ) : (
                  detailAllRecipe.steps?.map((step, index) => (
                    <div key={index} className={s.containerSteps}>
                      <li className={s.liSteptsNumber}>{step.number}</li>
                      <li className={s.liSteptsStep}>{step.step}</li>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className={s.divcontainerLoader}>
                <Loader />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
export default DetailRecipe;
