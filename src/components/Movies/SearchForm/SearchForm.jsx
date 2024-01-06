import "./SearchForm.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { formForSearch } from "../../../utils/formList";
import Form from "../../Main/Form/Form";
import Input from "../../Main/Input/Input";

const SearchForm = ({
  setIsShortSaveFilmsQuery,
  setSearchQuery,
  isShortFilms,
  setIsShortFilms,
}) => {
  const { name, validate } = formForSearch;
  const [valueSearch, setValueSearch] = useState({});
  let location = useLocation();
  const [search, setSearch] = useState(
    location.pathname === "/movies"
      ? localStorage.getItem("searchQuery") || ""
      : ""
  );

  function handleChange(evt, inputName) {
    setValueSearch({ ...valueSearch, [evt.target.name]: evt.target.value });

    inputName === "search"
      ? handleChangeSearchQuery(evt)
      : handleChangeTumbler();
  }

  const handleChangeTumbler = () => {
    if (location.pathname === "/movies") {
      localStorage.setItem("checkbox", !isShortFilms);
      setIsShortFilms(!isShortFilms);
    } else {
      setIsShortFilms(!isShortFilms);
    }
  };

  const handleChangeSearchQuery = (evt) => {
    location.pathname === "/movies"
      ? localStorage.setItem("searchQuery", evt.target.value)
      : localStorage.setItem("saveSearchQuery", evt.target.value);
    setSearch(evt.target.value);
  };

  const handleSearch = (evt) => {
    evt.preventDefault();
    setSearchQuery(search);
    if (location.pathname === "/saved-movies") {
      setIsShortSaveFilmsQuery(search);
    }
    location.pathname === "/movies"
      ? localStorage.setItem("searchQuery", search)
      : localStorage.setItem("saveSearchQuery", search);
  };

  return (
    <Form validate={validate} name={name} onSubmit={handleSearch}>
      {formForSearch.inputs.map((input) => (
        <Input
          key={input.name}
          value={search || valueSearch[`${input.name}`]}
          input={input}
          handleChange={(evt) => handleChange(evt, input.name)}
          validate={validate}
          isChecked={isShortFilms}
        />
      ))}
    </Form>
  );
};

export default SearchForm;
