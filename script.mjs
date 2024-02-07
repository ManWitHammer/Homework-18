import deleteData from './actions/deleteData.mjs'
import getData from './actions/getData.mjs'
import postData from './actions/postData.mjs'
import patchData from './actions/patchData.mjs'

const URL = 'http://localhost:3000/USERS'
const form = document.querySelector('form')
const buttonPost = document.querySelector('#buttonPost')
const list = document.querySelector('.list')

//добавление задач
buttonPost.addEventListener('click', e => {
	e.preventDefault()
	try {
		const data = new FormData(form)
		const user = {
			id: data.get('title'),
			title: data.get('title'),
			description: data.get('details'),
			priority: data.get('priority'),
			done: false
		}
		postData(URL, user)
		form.reset()
	} catch (error) {
		console.error(error)
	}
})

function adjustHeight(textarea) {
	textarea.style.height = "30px";
	textarea.style.height = (textarea.scrollHeight) + "px";
  }
  
  var textarea = document.querySelector('textarea');
  textarea.addEventListener('input', function() {
	adjustHeight(textarea);
  });

//просмотр задач
document.addEventListener('DOMContentLoaded', async (e) => {
	e.preventDefault()
	try {
		const data = await getData(URL)
		data.forEach(user => {
			list.insertAdjacentHTML(
				`afterbegin`,
				`
				<li class="user-profile ${user.priority}" id="${user.id}">
					<div class="material-symbols-outlined deleteBlock"> delete </div>
					${user.done == true ? '<div class="material-symbols-outlined completeBlock"> done </div>' : '<div class="material-symbols-outlined completeBlock"> close </div>'}
					${user.done == true ? `<p class="title">${user.title}</p>` : `<p class="title"><del>${user.title}</del></p>`}
					${user.done == true ? `<p class="description">${user.description}</p>` : `<p class="description"><del>${user.description}</del></p>`}
				</li>
				`
			)
		})
		//удаление задач
		const deleteButtons = document.querySelectorAll('.deleteBlock')
		deleteButtons.forEach(delButton => {
			delButton.addEventListener('click', async e => {
				e.preventDefault()
				const id = delButton.parentElement.id
				try {
					deleteData(`http://localhost:3000/USERS/${id}`).then(response => {
						console.log(response, `пользователь с id = ${id} успешно удалён`)
					})
				} catch (err) {
					console.error(err, 'ошибка при удалении')
				}
			})
		})
		//выпоненные или невыполненные задачи
		const completeButtons = document.querySelectorAll('.completeBlock')
		completeButtons.forEach(comButton => {
			comButton.addEventListener('click', async e => {
				e.preventDefault()
				const id = comButton.parentElement.id
				const user = await getData(`http://localhost:3000/USERS/${id}`)
				let userPatch
				if (user.done) {
					userPatch = {
						done: false
					}
				} else {
					userPatch = {
						done: true
					}
				}
				console.log(userPatch, id)
				try {
					await patchData(`http://localhost:3000/USERS/${id}`, userPatch).then(response => {
						console.log(response, `пользователь с id = ${id} успешно удалён`)
					})
				} catch (error) {
					console.error(error, 'не получилось обновить данные')
				}
			})
		})
	} catch (error) {
		console.error(error)
	}
})