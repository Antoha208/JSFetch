
  let url = window.location.search;

let preloader = document.getElementById('loading');
  setTimeout(() => preloader.classList.add('hidden'), 2000)


function getUserName(url) {
	let getUrl = url.split('=');
	let name = getUrl[1];
	if(name === undefined) {
	name = 'Antoha208';
	}
	return name;
}

let user = `https://api.github.com/users/${getUserName(url)}`;
const getUrl = new Promise((resolve, reject) => {
  setTimeout(() => user ? resolve(user) : reject('Ссылка не найдена'), 2000);
});
let date = new Date();
const getDate = new Promise((resolve, reject) => {
  setTimeout(() => date ? resolve(date) : reject('Дата неопределена'), 2000);
});

Promise.all([getUrl], [date])
  .then(([user,date]) => fetch(user))
  .then(res => res.json())
  .then(json => {
  console.log(json.avatar_url);
  console.log(json.bio);
  console.log(json.name);
  console.log(json.html_url);
  let avatar = document.createElement('img');
    avatar.src = json.avatar_url;
  document.body.append(avatar);
  let link = document.createElement('a');
  if (json.name == null) {
    document.body.innerHTML = ('Пользователь не найден')
  } else {
    link.href = json.html_url;
    link.text = json.name;
  }
  document.body.append(link);
  let description = document.createElement('p');
  if (json.name == null) {
    document.body.innerHTML = ('Пользователь не найден')
  } else {
    description.innerHTML = json.bio;
  }
  document.body.append(description);

  let today = document.createElement('p');
    today.innerHTML = date;
  document.body.append(today);
})
  .catch(err => document.body.innerHTML = ('Информация о пользователе недоступна'));
