class Question {
    static create(question) {
      return fetch("https://podcast--app-f64b8-default-rtdb.firebaseio.com/question.json", {
       method: "POST",
       body: JSON.stringify(question),
       headers: {
        "Content-Type": "application/json"
       } 
       })
       .then(response => response.json())
       .then(response =>{
        question.id = response.name
        return question
       })
       .then(addToLocalStorage)
       .then(Question.renderList)
    }

    static fetch(token){
      if (!token) {
        return Promise.resolve(`<p class="error">You don't have tocken</p>`)
      }
      
      return fetch (`https://podcast--app-f64b8-default-rtdb.firebaseio.com/question.json?auth=${token}`)
      .then(response => response.json())
      .then(response => {
        if (response && response.error) {
          return `<p class="error">${response.error}</p>`
        }
        return response ? Object.keys(response).map(key => ({
          ...response[key],
          id: key
        })) : []
      })
    }

    static renderList() {
      const allquestions = getQuestionFromlocalStorage()

      const html = allquestions.length
      ? allquestions.map(toCard).join("")
      : `<div class="mui--text-headline">No questions for now</div>`
      const list = document.getElementById("list")
      list.innerHTML = html
    }

    static listToHTML (question) {
      return question.length
      ? `<ol>${question.map(q => `<li>${q.text}</li>`).join("")}</ol>`
      : `<p>Have no Question yet</p>`
    }
}

window.addEventListener("load", Question.renderList)

function addToLocalStorage(question) {
  const all = getQuestionFromlocalStorage()
  all.push(question)
  localStorage.setItem("question", JSON.stringify(all))
}

function getQuestionFromlocalStorage() {
  return JSON.parse(localStorage.getItem("question") || "[]")
}

function toCard(question) {
  return `
  <div class="mui--text-black-54">
  ${new Date(question.date).toLocaleDateString()}
  ${new Date(question.date).toLocaleTimeString()}
  </div>
  <div>${question.text}</div>
  <br>  
  `
}

