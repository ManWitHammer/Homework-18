import changeLikes from './actions/changeLikes.mjs'
import getData from './actions/getData.mjs'
import postData from './actions/postData.mjs'

const URL = 'http://localhost:3000/USERS'
// const buttonPost = document.querySelector('.post')
// const buttonGet = document.querySelector('.get')
// const form = document.querySelector('form')
const list = document.querySelector('.list')

// отправка данных
// buttonPost.addEventListener('click', e => {
// 	// отмена стандартного поведения кнопки
// 	e.preventDefault()
// 	try {
// 		// сбор данных из формы
// 		const data = new FormData(form)
// 		// собираем объект для отправки
// 		const user = {
// 			color: data.get('color'),
// 			figure: data.get('figure'),
// 		}
// 		console.log(user)
// 		// отправка данных на сервер
// 		postData(URL, user)
// 		// очистка формы
// 		form.reset()
// 	} catch (error) {
// 		console.error(error)
// 	}
// })


document.addEventListener('DOMContentLoaded', async (e) => {
	e.preventDefault()
	try {
		const data = await getData(URL)
		data.forEach(user => {
			list.insertAdjacentHTML(
				`beforeend`,
				`
				<li class="user-profile" id="${user.id}">
					<p class="${user.figure}" style="background: ${user.color};"></p>
				</li>
				`
			)
		})

		// обработка лайков, на данных, которые мы только что получили
		const likes = document.querySelectorAll('.likes')
		likes.forEach(like => {
			like.addEventListener('click', () => {
				const id = like.parentNode.id
				let likesNumber = like.textContent
				likesNumber++
				like.textContent = likesNumber
				changeLikes(URL, id, { likes: likesNumber })
			})
		})
	} catch (error) {
		console.error(error)
	}
})