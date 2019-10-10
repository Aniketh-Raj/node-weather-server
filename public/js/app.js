const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageError = document.querySelector('#message-error')
const messageSuccess = document.querySelector('#message-success')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageSuccess.textContent = 'Fetching Weather ...'
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageError.textContent = ''
                messageSuccess.textContent = data.error
            } else {
                messageError.textContent = 'Location : ' + data.location
                messageSuccess.textContent = 'Forecast :' + data.forecast
            }
        })
    })
})