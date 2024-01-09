function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}

export const BASE_URL = "https://vazgenmovies.nomoredomainsmonster.ru/api";

export function apiRegister({name, email, password}) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({name, email, password}),
  }).then(checkResponse);
}

export function apiLogin({ email, password }) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email, password}),
  }).then(checkResponse);
}

export function checkToken(jwt) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then(checkResponse);
}
