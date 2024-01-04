const formForSearch = {
  validate: false,
  name: 'search',
  title: 'Найти',
  buttonTextDefault: 'Найти',
  buttonTextLoading: 'Поиск...',
  inputs: [
    {
      type: 'search',
      name: 'search',
      placeholder: 'Фильм',
      required: true,
    },
    {
      type: 'checkbox',
      name: 'shorts',
      placeholder: 'Короткометражки',
      required: false,
      checked: false,
    },
  ]
};
const formForRegister = {
  validate: true,
  name: 'register',
  title: 'Добро пожаловать!',
  buttonTextDefault: 'Зарегистрироваться',
  buttonTextLoading: 'Регистрация...',
  inputs: [
    {
      type: 'text',
      name: 'name',
      label: 'Имя',
      placeholder: 'Вазген',
      minLength: '2',
      maxLength: '40',
      required: true,
    },
    {
      type: 'email',
      name: 'email',
      label: 'E-mail',
      placeholder: 'pochta@yandex.ru',
      minLength: '4',
      maxLength: '40',
      required: true,
    },
    {
      type: 'password',
      name: 'password',
      label: 'Пароль',
      placeholder: '••••••••••••••',
      minLength: '4',
      maxLength: '40',
      required: true,
    },
  ]
};

const formForLogin = {
  validate: true,
  name: 'login',
  title: 'Рады видеть!',
  buttonTextDefault: 'Войти',
  buttonTextLoading: 'Вход...',
  inputs: [
    {
      type: 'email',
      name: 'email',
      label: 'E-mail',
      placeholder: 'pochta@yandex.ru',
      minLength: '4',
      maxLength: '40',
      required: true,
    },
    {
      type: 'password',
      name: 'password',
      label: 'Пароль',
      placeholder: 'Пароль',
      minLength: '4',
      maxLength: '40',
      required: true,
    },
  ]
};

const formForProfile = {
  validate: false,
  name: 'profile',
  title: 'Привет, Виталий!',
  buttonTextDefault: 'Редактировать',
  buttonTextLoading: 'Редактировать',
  inputs: [
    {
      type: 'text',
      name: 'name',
      label: 'Имя',
      placeholder: '-',
      minLength: '2',
      maxLength: '40',
      required: true,
    },
    {
      type: 'email',
      name: 'email',
      label: 'E-mail',
      placeholder: '-@-.ru',
      minLength: '4',
      maxLength: '40',
      required: true,
    },
  ]
}

export { formForSearch, formForLogin, formForRegister, formForProfile };