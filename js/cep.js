const cepInput = document.querySelector('#cep');
const registerForm = document.querySelector('#register-form');
const aditionalInputsContainer = document.querySelectorAll('.aditional');
const streetInput = document.querySelector('#street');
const neighborhoodInput = document.querySelector('#neighborhood');
const stateInput = document.querySelector('#state');

export let city = '';

// Adicionar os inputs de rua, estado, número e bairro
cepInput.addEventListener('input', async () => {
    let inputValue = cepInput.value;
    let onlyNumbers = inputValue.replace(/[^0-9]/g, "");
    cepInput.value = onlyNumbers;
    if(inputValue.length === 8){
        fetch('https://brasilapi.com.br/api/cep/v1/' + inputValue)
        .then(response => response.json())
        .then(data => {
            if(data){
                registerForm.classList.add('cep-complete')
                aditionalInputsContainer.forEach(input => {
                    input.classList.remove('hide');
                })
                stateInput.value = data.state;
                streetInput.value = data.street;
                neighborhoodInput.value = data.neighborhood;
                city = data.city;
            }
        })
        .catch(error => console.log(error))
    }
})