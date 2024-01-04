import { useEffect, useState } from "react";
import "./Profile.css";
import { formForProfile } from "../../utils/formList";
import Form from "../Main/Form/Form";
import Input from "../Main/Input/Input";

const Profile = ({ onSignOut, currentUser, onSubmit, isLoading }) => {
  const { validate, name, buttonTextDefault, inputs } = formForProfile;
  const [value, setIsValue] = useState({
    name: currentUser.name || "",
    email: currentUser.email || "",
  });

  const [isDisabled, setIsDisabled] = useState(true);
  const [isValid, setIsValid] = useState(true);

  function handleChange(evt) {
    setIsValue({ ...value, [evt.target.name]: evt.target.value });
  }

  useEffect(() => {
    setIsValue({
      name: currentUser.name || "",
      email: currentUser.email || "",
    });
  }, [currentUser]);

  useEffect(() => {
    if (currentUser.name !== value.name || currentUser.email !== value.email) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [value, currentUser]);

  return (
    <main className="main">
      <section className="profile">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <Form
          validate={validate}
          name={name}
          buttonText={buttonTextDefault}
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(value);
          }}
        >
          <ul className={`form__list form__list_type_${name}`}>
            {inputs.map((input) => (
              <li
                className={`form__item form__item_type_${name}`}
                key={input.name + name}
              >
                <Input
                  value={value[`${input.name}`] ?? currentUser[input.name]}
                  input={input}
                  handleChange={handleChange}
                  form={name}
                  validate={validate}
                />
              </li>
            ))}
          </ul>
        </Form>
        <button
          type="button"
          className={`profile__button-exit ${
            (!isValid || isDisabled || isLoading) &&
            "profile__button-exit_disabled"
          }`}
          onClick={onSignOut}
        >
          Выйти из аккаунта
        </button>
      </section>
    </main>
  );
};

export default Profile;
