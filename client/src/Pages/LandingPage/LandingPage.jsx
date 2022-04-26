import React, { useState } from 'react';
import s from './LandingPage.module.css';
import videoLanding from './assets/ultimate.mp4';
import { Link } from 'react-router-dom';
import { nameUser } from '../../redux/actions';
import { useDispatch } from 'react-redux';
const LandingPage = () => {
  const [userName, setUserName] = useState('');
  const dispacth = useDispatch();

  const handleChange = ({ target }) => {
    setUserName(target.value);
  };

  const handleSubmit = () => {
    dispacth(nameUser(userName));
  };

  return (
    <div className={s.containerGenera}>
      <header className={s.headerMain}>
        <div className={`${s.textAbsolute} ${s.overlay}`}>
          <h2 className={s.title}>Welcome to the Healthy Food Recipes App</h2>
          <p className={s.text}>
            "When the food is bad, the medicine doesn't work. When food is good,
            medicine is not necessary."
          </p>
          <div className={s.containerLanding}>
            <label className={s.nameUser} htmlFor="">
              What's your name?
            </label>
            <input
              className={s.inputLanding}
              type="text"
              value={userName}
              onChange={handleChange}
            />
          </div>

          <Link to="/home">
            <button onClick={handleSubmit} className={s.LinkButton}>
              Learn more
            </button>
          </Link>
        </div>

        <video className={s.video} autoPlay loop muted>
          <source src={videoLanding} type="video/mp4" />
        </video>
      </header>
    </div>
  );
};

export default LandingPage;
