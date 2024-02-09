import deleteData from './actions/deleteData.mjs'
import getData from './actions/getData.mjs'
import postData from './actions/postData.mjs'
import patchData from './actions/patchData.mjs'
import insertHTML from './actions/insertHTML.mjs'
import adjustHeight from './actions/adjustHeight.mjs'

const URL = 'http://localhost:3000/USERS'
const form = document.querySelector('form')
const buttonPost = document.querySelector('#buttonPost')
const list = document.querySelector('.list')
const ascending = document.querySelector('.ascending')
const completed = document.querySelector('.completed')
const uncompleted = document.querySelector('.uncompleted')
const all = document.querySelector('.all')
const textarea = document.querySelector('textarea');

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
			insertHTML(list, user, 'afterbegin')
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
				insertHTML(list, user, 'beforeend')
			}
		})
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
				insertHTML(list, user, 'beforeend')
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
			insertHTML(list, user, 'afterbegin')
		})
	} catch (error) {
		console.error(error)
	}
})

//добавление задач
buttonPost.addEventListener('click', async e => {
	e.preventDefault()
	try {
		const now = new Date()
		const data = new FormData(form)
		const user = {
			id: data.get('title'),
			title: data.get('title'),
			description: data.get('details'),
			priority: data.get('priority'),
			done: true,
			dates: `${now.getDate().length == 1 ? '0' + now.getDate() : now.getDate()}-${(now.getMonth() + 1).length == 1 ? '0' + now.getMonth() + 1 : now.getMonth()}
			/${now.getHours().length == 1 ? '0' + now.getHours() : now.getHours()}:${now.getMinutes().length == 1 ? '0' + now.getMinutes() : now.getMinutes()}`
		}
		await postData(URL, user)
		form.reset()
	} catch (error) {
		console.error(error)
	}
})
  
textarea.addEventListener('input', () => {
	adjustHeight(textarea);
});

//просмотр задач
document.addEventListener('DOMContentLoaded', async (e) => {
	e.preventDefault()
	try {
		const data = await getData(URL)
		data.forEach(user => {
			insertHTML(list, user, 'afterbegin')
		})
		//удаление задач
		const deleteButtons = document.querySelectorAll('.deleteBlock')
		deleteButtons.forEach(delButton => {
			delButton.addEventListener('click', async e => {
				e.preventDefault()
				const id = delButton.parentElement.id
				try {
					await deleteData(`http://localhost:3000/USERS/${id}`)
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
				try {
					await patchData(`http://localhost:3000/USERS/${id}`, userPatch)
				} catch (error) {
					console.error(error, 'не получилось обновить данные')
				}
			})
		})
		const profiles = document.querySelectorAll('.user-profile')
		profiles.forEach(profile => {
			profile.addEventListener('dblclick', async e => {
				e.preventDefault()
				try {
					const user = await getData(`http://localhost:3000/USERS/${profile.id}`)
					profile.innerHTML = ''
					profile.insertAdjacentHTML(
						'beforeend', 
						`
						<div class="material-symbols-outlined deleteBlock"> delete </div>
						${user.done == true ? '<div class="material-symbols-outlined completeBlock"> done </div>' : '<div class="material-symbols-outlined completeBlock"> close </div>'}
						<form>
							<label for="title"></label>
								<input class="thisShit" type="text" id="name" name="titleLi" value="${user.title}"/>
							</label>
							<label for="priority">
								<input class="yahoo" type="text" id="name" name="priorityLi" value="${user.priority}"/>
							</label>
							<label for="discription">
								<textarea class="thisText" type="text" id="name" name="descriptionLi">${user.description}</textarea>
							</label>
							<button type="button" id="buttonPost1">Post</button>
						</form> 
						`
					)
					const buttonPost1 = document.querySelector('#buttonPost1')
					buttonPost1.addEventListener('click', async e => {
						e.preventDefault()
						const redact = {
							title: document.querySelector('.thisShit').value,
							description: document.querySelector('.thisText').value,
							priority: document.querySelector('.yahoo').value,
						}
						await patchData(`http://localhost:3000/USERS/${profile.id}`, redact)
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