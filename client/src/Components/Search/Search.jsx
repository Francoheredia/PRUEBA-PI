import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchbyName } from '../../redux/actions';
import s from './Search.module.css';
const Search = ({ setSearchError }) => {
  const dispatch = useDispatch();
  const [erroInput, setErroInput] = useState(true);
  const [inputValue, setinputValue] = useState('');

  const handleChange = ({ target }) => {
    setinputValue(target.value);
    const isValidate = target.validity.valid;
    if (isValidate) {
      setErroInput(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    !inputValue ? setSearchError(true) : setSearchError(false);
    dispatch(searchbyName(inputValue));
    setinputValue('');
  };

  return (
    <div>
      <form className={s.formContainer} action="" onSubmit={handleSubmit}>
        <div className="">
          <input
            className={s.inpusFilter}
            type="text"
            value={inputValue}
            placeholder="Search..."
            onChange={handleChange}
            pattern="[a-zA-Z ]{2,100}"
          />
        </div>
        <button className={s.buttonCreate}>Search</button>
      </form>
    </div>
  );
};

export default Search;
