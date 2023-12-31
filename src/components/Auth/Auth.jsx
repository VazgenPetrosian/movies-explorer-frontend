import "./Auth.css";
import Form from "../Main/Form/Form";
import Input from "../Main/Input/Input";
import Main from "../Main/Main";
import { Link, useLocation } from "react-router-dom";
import { formForRegister, formForLogin } from "../../utils/formList";
import { useState } from "react";

const Auth = ({ value, setIsValue, onLogin, onRegister }) => {
  const { pathname } = useLocation();
  const [firstTime, setFirstTime] = useState(true);

  const handleOnRegister = () => {
    onRegister();
  };

  const handleOnLogin = () => {
    onLogin();
  };

  let formsInfo;
  switch (pathname) {
    case "/signup":
      formsInfo = {
        form: formForRegister,
        link: "/signin",
        linkText: "Войти",
        text: "Уже зарегистрированы?",
        onSubmit: handleOnRegister,
      };
      break;
    case "/signin":
      formsInfo = {
        form: formForLogin,
        link: "/signup",
        linkText: "Регистрация",
        text: "Еще не зарегистриированы?",
        onSubmit: handleOnLogin,
      };
      break;
    default:
      formsInfo = {
        form: "",
        link: "",
        linkText: "",
        text: "",
        onSubmit: "",
      };
      break;
  }
  const { validate, name, title, inputs, buttonTextDefault } = formsInfo.form;

  function handleChange(evt) {
    setFirstTime(false);
    setIsValue({ ...value, [evt.target.name]: evt.target.value });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    formsInfo.onSubmit();
  }
  return (
    <Main>
      <section className="auth">
        <h1 className="auth__title">{title}</h1>
        <Form
          validate={validate}
          name={name}
          onSubmit={handleSubmit}
          buttonText={buttonTextDefault}
        >
          <ul className={`form__list form__list_type_${name}`}>
            {inputs.map((input) => (
              <li
                className={`form__item form__item_type_${name}`}
                key={input.name}
              >
                <Input
                  value={value[`${input.name}`]}
                  input={input}
                  handleChange={handleChange}
                  validate={firstTime ? false : validate}
                  form={name}
                />
              </li>
            ))}
          </ul>
        </Form>
        <div className="auth__wrapper">
          <p className="auth__text">{formsInfo.text}</p>
          <Link className="auth__link" to={formsInfo.link}>
            {formsInfo.linkText}
          </Link>
        </div>
      </section>
    </Main>
  );
};

export default Auth;
