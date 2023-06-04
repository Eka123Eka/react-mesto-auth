class Auth {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  register({ email, password }) {
    return fetch(`${this._baseUrl}/signup`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({ email, password })
    })
      .then(res => this._checkResponse(res, `POST ${email}, "and input password" - `))
  }

  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
    })
      .then(res => this._checkResponse(res, `POST ${token} - `))
  }

  signIn({ email, password }) {
    return fetch(`${this._baseUrl}/signin`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({ email, password })
    })
      .then(res => this._checkResponse(res, `POST ${email}, "and input password" - `))
  }

  _checkResponse(res, sourceError) {
    return res.ok
      ? res.json()
      : Promise.reject(`${sourceError}${res.status}(${res.statusText})`)
  }
}

const auth = new Auth({
  baseUrl: 'https://auth.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default auth;
