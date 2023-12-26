import './SearchForm.css';
import { useState } from 'react';
import { formForSearch } from '../../../utils/formList';
import Form from '../../Main/Form/Form';
import Input from '../../Main/Input/Input';

const SearchForm = ({ isLoading }) => {
  const { name, buttonTextLoading, buttonTextDefault, validate } = formForSearch;
  const [valueSearch, setValueSearch] = useState({});

  function handleChange(evt) {
    setValueSearch({ ...valueSearch, [evt.target.name]: evt.target.value });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
  }

  return (
    <Form
      validate={validate}
      name={name}
      onSubmit={handleSubmit}
    >
      {formForSearch.inputs.map((input) => (
        <Input
          key={input.name}
          value={valueSearch[`${input.name}`]}
          input={input}
          handleChange={handleChange}
          validate={validate}
        />
      ))}
    </Form>
  );
};

export default SearchForm;