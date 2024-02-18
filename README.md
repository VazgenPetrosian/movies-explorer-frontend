Проект является дипломной работой на курсе веб-разработчик Яндекс.Практикума.
Бэкэнд часть проекта располагается [тут](https://github.com/VazgenPetrosian/movies-explorer-api).
## Функциональность проекта
* Защищённость роутов (нельзя перейти к приложению-поисковику, если не выполнен вход)
* Реализована "живая" **валидация** всех форм/полей ввода с использованием регулярных выражений и сторонних библиотек
* Использование собственных **хуков** (универсальный обработчик полей, валидация, контроль разрешения экрана)
* Возможность **поиска** фильмов со стороннего API
* Сохранение/удаление найденных фильмов к себе в аккаунт
* Реализован **фильтр** короткометражных фильмов
* Запоминание состояния полей ввода (в форме поиска фильмов), фильтра и найденных фильмов (при обновлении страницы данные не будут утеряны)
* Поиск фильмов как на русском, так и английском языке
* Реализован **попап** для демонcтрации ошибок сервера или некорректных введённых данных
* При загрузке данных показывается прелоадер. По окончанию загрузки он скрывается
* Полноценый **респонсив** для всех популярных разрешений экрана
* Бургерное меню для мобильной и планшетной версии
* Реализовано закрытие попапа и бургерного меню по **оверлею** или по клавише **Esc**
* Переход к показу трейлера фильма при нажатии на постер
* Показ данных о фильме при наведении курсора на постер
* Все нужные кнопки подсвечиваются **outline**, им привязанно невидимое, но слышимое описание, для людей с **ограниченными** возможностями
* Приложение свёрстано по **BEM(БЭМ)**, соблюдается **семантичность**
* На странице поиска фильмов по клику на кнопку **"Ещё"** - показываются дополнительные фильмы (на роуте с сохранёнными фильмами показываются сразу **все** фильмы)
* Утилитарные функции, константы, функции обращения к серверу вынесены в отдельный файл
* Запросы к серверу написаны с использованием парадигмы **ООП**
* Возможность редактирования своего профиля (почты и имени)
* Запоминание **состояния** входа пользователя (при обновлении страницы будет выполнен автоматический вход)
* Реализована **микроанимация** всех ссылок и кнопок
* Для создания сеток используется **flex** и **grid**
* Все данные хранятся на сервере, использовано сторонее и собственное API
## *Используемые технологии:*

* React 17
* JS
* HTML 5
* CSS 3

#frontend https://vazgenmovies.nomoredomainsmonster.ru

#backend https://project.byvazgen.nomoredomainsmonster.ru

#pullrequest https://github.com/VazgenPetrosian/movies-explorer-frontend/pull/2

#IP 158.160.112.31
