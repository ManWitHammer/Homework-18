const deleteData = url => {
    return new Promise((resolve, reject) =>
        fetch(url, { method: 'DELETE' })
            .then(response => response.json())
            .then(json => resolve(json))
            .catch(error => reject(error))
    )
}

export default deleteData