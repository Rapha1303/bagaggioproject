const user = window.localStorage.getItem('username');
const avatar = window.localStorage.getItem('avatarUrl');
const userImage = document.querySelector('.user-avatar');
const username = document.querySelector('.username');
const logoutButton = document.querySelector('.logout-button');
const createUserButton = document.querySelector('.create-users');
const closeModalButton = document.querySelector('.close-modal-button');
const modal = document.querySelector('.register-modal');
const modalTitle = document.querySelector('.register-modal .container > span');
const modalSubmitButton = document.querySelector('#modal-submit-button');
const registerForm = document.querySelector('#register-form');
const aditionalInputsContainer = document.querySelectorAll('.aditional');

// Carregar informações do usuário
window.addEventListener('DOMContentLoaded', () => {
    userImage.src = avatar;
    username.innerHTML = user;
})


// Fazer logout da conta
logoutButton.addEventListener('click', () => {
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('avatarUrl');

    window.location = 'http://localhost:5500/pages/login/login.html'
});

// Abrir modal e fechar modal
createUserButton.addEventListener('click', () => {
    openAndCloseModal('register')
})
closeModalButton.addEventListener('click', openAndCloseModal)

// Abrir e fechar modal function
export function openAndCloseModal(type){
    modal.classList.toggle('active');
    if(type === 'register'){
        modalTitle.innerHTML = 'Cadastrar usuário'
        modalSubmitButton.classList.add('register-user-button')
        modalSubmitButton.innerHTML = 'Registrar'
        modalSubmitButton.dataset.type = 'register'
    }
    if(type === 'edit'){
        modalTitle.innerHTML = 'Editar usuário'
        registerForm.classList.add('cep-complete')
        aditionalInputsContainer.forEach(input => {
            input.classList.remove('hide');
        })
        modalSubmitButton.classList.add('edit-user-button')
        modalSubmitButton.innerHTML = 'Atualizar'
        modalSubmitButton.dataset.type = 'edit'
    }
}

