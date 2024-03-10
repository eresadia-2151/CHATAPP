const lecturerSelectorBtn = document.querySelector('#Lecturer-selector')
const studentSelectorBtn = document.querySelector('#Student-selector')
const chatHeader = document.querySelector('.chat-header')
const chatMessages = document.querySelector('.chat-messages')
const chatInputForm = document.querySelector('.chat-input-form')
const chatInput = document.querySelector('.chat-input')
const clearChatBtn = document.querySelector('.clear-chat-button')

const messages = JSON.parse(localStorage.getItem('messages')) || []

const createChatMessageElement = (message) => `
<div class="message ${message.sender === 'Lecturer' ? 'blue-bg' : 'gray-bg'}">
 <div class="message-sender">${message.sender}</div>
 <div class="message-text">${message.text}</div>
 <div class="message-timestamp">${message.timestamp}</div>
</div>
`

window.onload = () =>{
    messages.forEach((message) => {
        chatMessages.innerHTML += createChatMessageElement(message)
    })
}

let messageSender = 'Student'

const updateMessageSender = (name) => {
    messageSender = name
    chatHeader.innerText = `${messageSender} chatting...`
    chatInput.placeholder = `Type here, ${messageSender}...`

    if (name === 'Lecturer') {
        lecturerSelectorBtn.classList.add('active-person')
        studentSelectorBtn.classList.remove('active-person')
    }
    if (name === 'Student') {
        studentSelectorBtn.classList.add('active-person')
        lecturerSelectorBtn.classList.remove('active-person')
    }

    chatInput.focus()
}

lecturerSelectorBtn.onclick = () => updateMessageSender('Lecturer')
studentSelectorBtn.onclick = () => updateMessageSender('Student')

const sendMessage = (e) => {
    e.preventDefault()

    const timestamp = new Date().toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})
    const message = {
        sender: '',
        text: chatInput.value,
        timestamp,
    }

    messages.push(message)
    localStorage.setItem('messages', JSON.stringify(message))
    chatMessages.innerHTML += createChatMessageElement(message)

    chatInputForm.reset()
    chatMessages.scrollTop = chatMessages.scrollHeight
}

chatInputForm.addEventListener('submit', sendMessage)

clearChatBtn.addEventListener('click', () => {
    localStorage.clear()
    chatMessages.innerHTML = ''
})