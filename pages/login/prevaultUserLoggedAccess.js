const hasUserInLocalStorage = window.localStorage.getItem('username');

window.addEventListener('DOMContentLoaded', () => {
    if(hasUserInLocalStorage){
        window.location = 'http://localhost:5500/'
    }
})
