import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import { formForProfile } from '../../utils/formList';
import Form from '../Main/Form/Form';
import Input from '../Main/Input/Input';


const Profile = ({ onSubmit, setIsLoggedIn }) => {
  const { validate, name, buttonTextDefault, inputs } = formForProfile;
  const [value, setIsValue] = useState({});
  const navigate = useNavigate();

  const onSignOut = () => {
    setIsLoggedIn(false);
    navigate('/', { replace: true });
  };

  function handleChange(evt) {
    setIsValue({ ...value, [evt.target.name]: evt.target.value });
  }

  return (
    <main className='main'>
      <section className='profile'>
        <h1 className='profile__title'>Привет, Вазген!</h1>
        <Form
          validate={validate}
          name={name}
          buttonText={buttonTextDefault}
        >
          <ul className={`form__list form__list_type_${name}`}>
            {inputs.map((input) => (
              <li
                className={`form__item form__item_type_${name}`}
                key={input.name + name}
              >
                <Input
                  value={value[`${input.name}`] ?? input.placeholder}
                  input={input}
                  handleChange={handleChange}
                  form={name}
                  validate={validate}
                />
              </li>
            ))}
          </ul>
        </Form>
        <button type='button' className='profile__button-exit' onClick={onSignOut}>
          Выйти из аккаунта
        </button>
      </section>
    </main>
  );
};

export default Profile;