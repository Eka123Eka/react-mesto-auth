class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  getUserInfoServer() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers })
      .then(res => this._checkResponse(res, `getUserInfo - `))
  }
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers })
      .then(res => this._checkResponse(res, `getInitialCards - `))
  }
  sendUserInfo(dataUser) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify(dataUser)
    })
      .then(res => this._checkResponse(res, `PATCH ${dataUser.name}, ${dataUser.about} - `))
  }
  addNewCardServer(dataCard) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(dataCard)
    })
      .then(res => this._checkResponse(res, `POST ${dataCard.link} - `))
  }
  deleteCardServer(idCard) {
    return fetch(`${this._baseUrl}/cards/${idCard}`, {
      headers: this._headers,
      method: 'DELETE',
    })
      .then(res => this._checkResponse(res, `DELETE ${idCard} - `))
  }
  toogleLikeServer(idCard, isLike) {
    return fetch(`${this._baseUrl}/cards/${idCard}/likes`, {
      headers: this._headers,
      method: isLike ? 'DELETE' : 'PUT'
    })
      .then(res => this._checkResponse(res, `TOGGLE like ${idCard} isLike = ${isLike} - `))
  }
  sendAvatar(urlAvatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({ avatar: urlAvatar })
    })
      .then(res => this._checkResponse(res, `PATCH Avatar ${urlAvatar} - `))
  }
  _checkResponse(res, sourceError) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`${sourceError}${res.status}(${res.statusText})`)
    }
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: '78fa951e-0cae-4fbe-aca5-f0de42ec035a',
    'Content-Type': 'application/json'
  }
});
