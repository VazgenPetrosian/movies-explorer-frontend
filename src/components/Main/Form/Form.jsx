import "./Form.css";
import React, { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Form({ children, validate, name, onSubmit, buttonText, isDisabled }) {
  const [isValidForm, setIsValidForm] = useState(false);
  const formRef = useRef(0);
  const { pathname } = useLocation();

  useEffect(() => {
    validate &&
      !pathname.includes("movies") &&
      Array.from(formRef.current)
        .filter((item) => {
          return item.localName !== "button";
        })
        .forEach((item) => {
          item.classList.toggle(
            "form__input_type_error",
            item.validationMessage
          );
          if (item && item.nextSibling) {
            item.nextSibling.textContent = item.validationMessage;
          }
        });

    function validation() {
      if (children === undefined) {
        return true;
      }
      return formRef.current.checkValidity();
    }
    setIsValidForm(validation());
  }, [children, validate]);

  function forSubmit(evt) {
    evt.preventDefault();
    validate &&
      pathname.includes("movies") &&
      Array.from(formRef.current)
        .filter((item) => {
          return item.localName !== "button";
        })
        .forEach((item) => {
          item.classList.toggle(
            "form__input_type_error",
            item.validationMessage
          );
          item.nextSibling.textContent = item.validationMessage;
        });

    function validation() {
      if (children === undefined) {
        return true;
      }
      return formRef.current.checkValidity();
    }
    setIsValidForm(validation());
    let valid = validation();
    if (valid) {
      onSubmit(evt);
    }
  }

  return (
    <form
      className={`form form_type_${name}`}
      name={name}
      noValidate
      onSubmit={pathname.includes("movies") ? forSubmit : onSubmit}
      ref={formRef}
    >
      {" "}
      {children}
      <button
        className={`form__button-save form__button-save_type_${name}`}
        type="submit"
        disabled={
          pathname.includes("movies")
            ? false
            : pathname.includes("profile")
            ? isDisabled || !isValidForm
            : !isValidForm
        }
      >
        {buttonText}
      </button>
    </form>
  );
}

export default Form;
