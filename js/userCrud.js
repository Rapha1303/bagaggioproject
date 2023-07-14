import { city } from './cep.js'
import { openAndCloseModal } from './events.js'
import { setInformations } from './informationsModal.js';
const registerForm = document.querySelector('#register-form');

const nameInput = document.querySelector('#name');
const surnameInput = document.querySelector('#surname');
const emailInput = document.querySelector('#email');
const phoneInput = document.querySelector('#phone');
const streetInput = document.querySelector('#street');
const neighborhoodInput = document.querySelector('#neighborhood');
const stateInput = document.querySelector('#state');
const cepInput = document.querySelector('#cep');
const numberInput = document.querySelector('#number');
const abilititesInput = document.querySelector('#abilitites');
const mainContainer = document.querySelector('main .container');
const registerUserInputs = document.querySelectorAll('.register-user-inputs');
const modalSubmitButton = document.querySelector('#modal-submit-button')
const aditionalInputsContainer = document.querySelectorAll('.aditional');

let personArray = []
let userId = null;
let userInfoObject = {}

window.addEventListener('DOMContentLoaded', () => {
    updateUserList();
})

registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if(modalSubmitButton.dataset.type === 'edit') {
        editUser()
    }
    if(modalSubmitButton.dataset.type === 'register'){
        createNewUser();
        createUsersTable(personArray);
    }
    registerUserInputs.forEach(input => {
        input.value = ""
        
        aditionalInputsContainer.forEach(input => {
            input.classList.add('hide');
        })
    })
    registerForm.classList.remove('cep-complete')
    openAndCloseModal()
})

document.addEventListener('click', (e) => {
    const target = e.target;
    if(target.id == 'delete-user'){
        confirmDelete(target)
    }
    if(target.id == 'edit-user'){
        editUserOpenModal(target)
    }
    if(target.id == 'info-user'){
        getUserInfo(target);
        setInformations(userInfoObject);
    }
})

function updateUserList(){
        const users = getExistingUsersFromLocalStorage();
        personArray = users;
        createUsersTable(users);
}


function createNewUser(){
    const person = {
        id: personArray.length + 1,
        name: nameInput.value,
        surname: surnameInput.value,
        number: numberInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        street: streetInput.value,
        neighborhood: neighborhoodInput.value,
        state: stateInput.value,
        city: city,
        cep: cepInput.value.replace(/(\d{5})(\d{3})/, '$1-$2'),
        abilitites: abilititesInput.value
    }
    personArray.push(person);
    window.localStorage.setItem('users', JSON.stringify(personArray));
}

function createUsersTable(array){
    if(personArray.length > 0){
        let newLine = array.map(person => 
            `<tr>
                <td>${person.name} ${person.surname}</td>
                <td>${person.email}</td>
                <td>${person.phone}</td>
                <td>${person.street}</td>
                <td>${person.neighborhood}</td>
                <td>${person.city}</td>
                <td>${person.state}</td>
                <td>${person.cep}</td>
                <td class="actions">
                    <button type="button" title="Editar usuário" class="edit-user"><i id="edit-user" data-user-id=${person.id} class="ph ph-pencil-simple"></i></button>
                    <button type="button" title="Informações do usuário" class="user-info"><i id="info-user" data-user-id=${person.id} class="ph ph-info"></i></button> 
                    <button title="Deletar usuário" class="delete-user"><i id="delete-user" data-user-id=${person.id} class="ph ph-trash"></i></button>
                </td>
            </tr>`);
        
            mainContainer.innerHTML = `<table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Rua</th>
                <th>Bairro</th>
                <th>Cidade</th>
                <th>UF</th>
                <th>CEP</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
                ${newLine.join('')}
            </tbody>
          </table>
        `
    }
    
}

function getExistingUsersFromLocalStorage(){
    if(!JSON.parse(window.localStorage.getItem('users'))) return personArray;
    
    return JSON.parse(window.localStorage.getItem('users'));       
}

function deleteUser(target){
    const newArray = personArray.filter(person => person.id != Number(target.getAttribute('data-user-id')))
    personArray = newArray;
    window.localStorage.setItem('users', JSON.stringify(personArray));
    if(personArray.length <= 0){
        return mainContainer.innerHTML = '<span>Não há usuários cadastrados</span>'
    }
    createUsersTable(personArray);
}

function confirmDelete(target){
    if(window.confirm('Tem certeza que deseja excluir o usuário?')){
        deleteUser(target);
        alert('Usuário removido com sucesso!')
    } else {
        alert('Operação de remoção cancelada')
    }
}

function editUserOpenModal(target){
    const userToEdit = personArray.filter(person => person.id == Number(target.getAttribute('data-user-id')));
    userToEdit.forEach(user => {
        nameInput.value = user.name;
        surnameInput.value = user.surname;
        emailInput.value = user.email;
        phoneInput.value = user.phone;
        cepInput.value = user.cep;
        streetInput.value = user.street;
        stateInput.value = user.state;
        neighborhoodInput.value = user.neighborhood;
        stateInput.value = user.state;
        numberInput.value = user.number;
        abilititesInput.value = user.abilitites;
        userId = user.id
    })
    openAndCloseModal('edit')
}

function editUser(){
    const userToEdit = personArray.filter(person => person.id == userId);
    userToEdit.forEach((user) => {
        user.name = nameInput.value;
        user.surname = surnameInput.value;
        user.street = streetInput.value;
        user.state = stateInput.value;
        user.number = numberInput.value;
        user.neighborhood = neighborhoodInput.value;
        user.cep = cepInput.value;
        user.email = emailInput.value;
        user.phone = phoneInput.value;
        user.abilitites = abilititesInput.value;
        user.city = city;
        if(userId == user.id){
            personArray[userId - 1] = user
            window.localStorage.setItem('users', JSON.stringify(personArray))
        }
    })
    updateUserList();
}

function getUserInfo(target){
    const foundUser = personArray.filter(user => user.id === Number(target.getAttribute('data-user-id')));
    foundUser.forEach(user => {
        userInfoObject = {
            id: user.id,
            name: user.name,
            surname: user.surname,
            number: user.number,
            email: user.email,
            phone: user.phone,
            street: user.street,
            neighborhood: user.neighborhood,
            state: user.state,
            city: user.city,
            cep: user.cep,
            abilitites: user.abilitites
        }
    })
}