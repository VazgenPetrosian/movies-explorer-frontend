import "./Input.css";

const Input = ({ value, handleChange, input, form, validate, isChecked }) => {
  const {
    required,
    name,
    placeholder,
    label,
    type,
    minLength,
    maxLength,
  } = input;

  const classInputForm = form ? `form__input_type_${form}` : "";
  const classLabelForm = form ? `form__label_type_${form}` : "";
  const classInput = `form__input form__input_type_${name} ${classInputForm}`;

  let inputType;
  switch (type) {
    case "checkbox":
      inputType = (
        <input
          className={classInput}
          type={type}
          name={name}
          defaultChecked={isChecked}
          required={required}
          onChange={handleChange}
        />
      );
      break;
    case "search":
      inputType = (
        <input
          className={classInput}
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value ?? ""}
          onChange={handleChange}
        />
      );
      break;
    default:
      inputType = (
        <input
          className={classInput}
          type={type}
          name={name}
          placeholder={placeholder}
          minLength={minLength ?? ""}
          maxLength={maxLength ?? ""}
          required={required}
          value={value ?? ""}
          onChange={handleChange}
        />
      );
      break;
  }

  return (
    <label className={`form__label form__label_type_${name} ${classLabelForm}`}>
      {label && `${label}`}
      {inputType}
      {type === "checkbox" && <span>{label ? label : placeholder}</span>}
      {validate && <span className={`form__error ${name}-error`} />}
    </label>
  );
};

export default Input;
