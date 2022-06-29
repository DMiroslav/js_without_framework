const form = document.getElementById("form")
const modalBtn = document.getElementById("modal-btn")
const input = form.querySelector("#question-input")
const submitBtn = form.querySelector("#submit")

form.addEventListener("submit", submitFormHandler)
modalBtn.addEventListener("click", openModal)
input.addEventListener("input", () =>{
     submitBtn.disabled = !isValid(input.value)
})

function submitFormHandler(event){
     event.preventDefault()
     
     if (isValid(input.value)){
          const question = {
               text: input.value.trim(),
               date: new Date().toJSON()
          }
          submitBtn.disabled = true
          Question.create(question).then(() => {
               input.value = ""
               input.className = ""
               submitBtn.disabled = false
          })
     }    
}


function isValid (value){
     return value.length >= 10 
}

function openModal () {
 createModal("authorization", getAutorization())
 document
 .getElementById("auth-form")
 .addEventListener("submit", authFormHandler, {once: true})
}

function authFormHandler (event) {
     event.preventDefault()
     const btn = event.target.querySelector("button")
     const email =  event.target.querySelector("#email").value
     const password = event.target.querySelector("#password").value
     btn.disabled = true
     authWithEmailAndPassword(email, password)
    .then(Question.fetch)
    .then(renderModalAfterAuth)
    .then(() => btn.disabled = false)
}

function renderModalAfterAuth (content) {
     if (typeof content === "string") {
          createModal ("Error", content)
     } else {
          createModal("Question List", Question.listToHTML(content))
     }
}

function createModal (title, content) {
     const modal = document.createElement("div")
     modal.classList.add("modal")
     const html = `
     <h1>${title}</h1>
     <div class="modal-content">${content}</div>
     `
     modal.innerHTML = html
     mui.overlay("on", modal)

 }
// podcast-youtube-app , firebase.google.com 
// https://podcast--app-f64b8-default-rtdb.firebaseio.com/

