const closeModalButton = document.querySelector('.info-modal-button');
const informationsModal = document.querySelector('.informations-modal');

const topics = document.querySelectorAll('.informations-modal .container .content span');

closeModalButton.addEventListener('click', () => {
    informationsModal.classList.toggle('active')
})

const topicsArray = [...topics]
const initialInnerHTML = topicsArray.map(topic => topic.innerHTML)

export function setInformations(user){
    topics.forEach((topic, index) => {
        const className = topic.getAttribute("class");
        topic.innerHTML = initialInnerHTML[index];
        topic.textContent += " " + user[className];
    })
    informationsModal.classList.toggle('active')
}
