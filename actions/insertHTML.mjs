const insertThis = (list, user, where) => {
    list.insertAdjacentHTML(
        `${where}`,
        `
        <li class="user-profile ${user.priority}" id="${user.id}">
            <div class="material-symbols-outlined deleteBlock"> delete </div>
            ${user.done == true ? '<div class="material-symbols-outlined completeBlock"> done </div>' : '<div class="material-symbols-outlined completeBlock"> close </div>'}
            ${user.done == true ? `<p class="title">${user.title}</p>` : `<p class="title"><del>${user.title}</del></p>`}
            ${user.done == true ? `<p class="description">${user.description}</p>` : `<p class="description"><del>${user.description}</del></p>`}
            ${user.done == true ? `<p class="time">${user.dates}</p>` : `<p class="time"><del>${user.dates}</del></p>`}
        </li>
        `
    )
}

export default insertThis