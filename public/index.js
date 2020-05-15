const config = {
  headers: {
    Authorization:  'Bearer 2abbf7c3-245b-404f-9473-ade729ed4653',
    'Content-Type' : 'application/json'
  },
}

function getBookmarks() {
  return fetch('/bookmarks', { method: 'get', ...config })
    .then(res => res.ok ? res.json().then(b => b.books): [])
}

function getBookmarkByTitle(title) {
  return fetch(`/bookmark?title=${title}`, { method: 'get', ...config })
    .then(res => res.ok ? res.json().then(b => b.books): [])
}

function postBookmark({ title, description, url, rating }) {
  return fetch('/bookmarks', {
    method: 'POST',
    body: JSON.stringify({ title, description, url, rating }),
    ...config
  }).then(j => j.ok)
}

function deleteBookmark(id) {
  return fetch(`/bookmark/${id}`, {
    method: 'DELETE',
    ...config
  }).then(j => j.ok)
}

function updateBookmark(id, { title, description, url, rating }) {
  return fetch(`/bookmark/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({id, title, description, url, rating }),
    ...config
  }).then(j => j.ok)
}

function createBookmark({ _id, title, description, url, rating }) {
  const el = document.createElement('li')
  el.innerHTML = `
    <a href="${url}">${title}</a>
    <p>${description}</p>
    <span>rating: ${rating}</span>
    <span>id: ${_id}</span>
  `
  return el
}

function showAllBookmarks() {
  const list = document.querySelector('#bookmark-list')
  list.innerHTML = ''

  getBookmarks().then(bookmarks => {
    const els = bookmarks.map(b => createBookmark(b))
    els.forEach(n => list.appendChild(n))
  })
}


function findBookmark(event) {
  event.preventDefault()
  const title = document.querySelector('#search-bookmark-title').value
  const list = document.querySelector('#bookmark-list')

  list.innerHTML = ''
  getBookmarkByTitle(title).then(bookmarks => {
    const els = bookmarks.map(b => createBookmark(b))
    els.forEach(n => list.appendChild(n))
  })
}

function updateABookmark(event) {
  event.preventDefault()
  const id = document.querySelector('#update-bookmark-id').value
  const title = document.querySelector('#update-bookmark-title').value
  const description = document.querySelector('#update-bookmark-description').value
  const url = document.querySelector('#update-bookmark-url').value
  const rating = document.querySelector('#update-bookmark-rating').value

  updateBookmark(id, { id, title, description, url, rating })
  .then(showAllBookmarks)
}

function createNewBookmark(event) {
  event.preventDefault()
  const title = document.querySelector('#create-bookmark-title').value
  const description = document.querySelector('#create-bookmark-description').value
  const url = document.querySelector('#create-bookmark-url').value
  const rating = document.querySelector('#create-bookmark-rating').value

  postBookmark({ title, description, url, rating })
  .then(showAllBookmarks)
}

function deleteABookmark(event) {
  event.preventDefault()
  const id = document.querySelector('#delete-bookmark-id').value

  deleteBookmark(id)
  .then(showAllBookmarks)
}

document.querySelector('#show-all').addEventListener('click', showAllBookmarks)
document.querySelector('#search-by-id-form').addEventListener('submit', findBookmark)
document.querySelector('#update-form').addEventListener('submit', updateABookmark)
document.querySelector('#create-form').addEventListener('submit', createNewBookmark)
document.querySelector('#delete-form').addEventListener('submit', deleteABookmark)
showAllBookmarks()