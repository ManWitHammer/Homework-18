import deleteData from './actions/deleteData.mjs'
import getData from './actions/getData.mjs'
import postData from './actions/postData.mjs'
import patchData from './actions/patchData.mjs'

const URL = 'http://localhost:3000/USERS'
const form = document.querySelector('form')
const buttonPost = document.querySelector('#buttonPost')
const list = document.querySelector('.list')
const ascending = document.querySelector('.ascending')
const descending = document.querySelector('.descending')
const completed = document.querySelector('.completed')
const uncompleted = document.querySelector('.uncompleted')
const all = document.querySelector('.all')

ascending.addEventListener('click', async e => {
	e.preventDefault()
	try {
		let data1 = []
		const data = await getData(URL)
		const uName = document.querySelectorAll('.list .user-profile')
		uName.forEach(user => {
			data.forEach(user1 => {
				if (user1.id == user.id) {
					data1.push(user1)
				}
			})
		})
		list.innerHTML = ''
		data1.forEach(user => {
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
	} catch (error) {
		console.error(error)
	}
})

descending.addEventListener('click', async e => {
	e.preventDefault()
	try {
		let data1 = []
		const data = await getData(URL)
		const uName = document.querySelectorAll('.list .user-profile')
		uName.forEach(user => {
			data.forEach(user1 => {
				if (user1.id == user.id) {
					data1.push(user1)
				}
			})
		})
		list.innerHTML = ''
		data1.forEach(user => {
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
	} catch (error) {
		console.error(error)
	}
})

completed.addEventListener('click', async e => {
	e.preventDefault()
	
	try {
		const data = await getData(URL)
		list.innerHTML = ''
		data.forEach(user => {
			if (user.done == true) {
				list.insertAdjacentHTML(
					`beforeend`,
					`
					<li class="user-profile ${user.priority}" id="${user.id}">
						<div class="material-symbols-outlined deleteBlock"> delete </div>
						${user.done == true ? '<div class="material-symbols-outlined completeBlock"> done </div>' : '<div class="material-symbols-outlined completeBlock"> close </div>'}
						${user.done == true ? `<p class="title">${user.title}</p>` : `<p class="title"><del>${user.title}</del></p>`}
						${user.done == true ? `<p class="description">${user.description}</p>` : `<p class="description"><del>${user.description}</del></p>`}
					</li>
					`
				)
			}
		})
		//удаление задач
	} catch (error) {
		console.error(error)
	}
})

uncompleted.addEventListener('click', async e => {
	e.preventDefault()
	try {
		const data = await getData(URL)
		list.innerHTML = ''
		data.forEach(user => {
			if (user.done == false) {
				list.insertAdjacentHTML(
					`beforeend`,
					`
					<li class="user-profile ${user.priority}" id="${user.id}">
						<div class="material-symbols-outlined deleteBlock"> delete </div>
						${user.done == true ? '<div class="material-symbols-outlined completeBlock"> done </div>' : '<div class="material-symbols-outlined completeBlock"> close </div>'}
						${user.done == true ? `<p class="title">${user.title}</p>` : `<p class="title"><del>${user.title}</del></p>`}
						${user.done == true ? `<p class="description">${user.description}</p>` : `<p class="description"><del>${user.description}</del></p>`}
					</li>
					`
				)
			}
		})
		//удаление задач
	} catch (error) {
		console.error(error)
	}
})

all.addEventListener('click', async e => {
	e.preventDefault()
	try {
		const data = await getData(URL)
		list.innerHTML = ''
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
	} catch (error) {
		console.error(error)
	}
})

//добавление задач
buttonPost.addEventListener('click', async e => {
	e.preventDefault()
	try {
		const data = new FormData(form)
		const user = {
			id: data.get('title'),
			title: data.get('title'),
			description: data.get('details'),
			priority: data.get('priority'),
			done: true
		}
		await postData(URL, user)
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
					await deleteData(`http://localhost:3000/USERS/${id}`).then(response => {
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