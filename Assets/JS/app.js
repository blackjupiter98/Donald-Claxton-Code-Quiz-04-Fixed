const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true 
let score = 0 
let questionCounter = 0 
let availableQuestions = []

let questions = [
    {
        question: 'Which kind of quotes does javascript accept ?',
        choice1: 'single',
        choice2: 'double',
        choice3: 'alan watts',
        choice4: 'single & double',
        answer: 4, 
    },
    {
        question: 'In HTML, JavaScript code is inserted between which kind of tags ? ',
        choice1: 'div',
        choice2: 'style',
        choice3: 'script',
        choice4: 'world of warcraft clan tags',
        answer: 3, 
    },
    {
        question: ' A JavaScript ________ is a block of JavaScript code, that can be executed when "called" for',
        choice1: 'Runescape fishing bot',
        choice2: 'function',
        choice3: 'event',
        choice4: 'id class',
        answer: 2, 
    },
    {
        question: 'For debugging purposes, you can call the ____________ method in the browser to display data',
        choice1: 'console log',
        choice2: 'country fried Apple ipod nano steak',
        choice3: 'right click',
        choice4: 'window',
        answer: 1, 
    },
    {
        question: 'what separates JavaScript statements?',
        choice1: 'periods',
        choice2: 'semicolons',
        choice3: 'bread',
        choice4: 'exclamation points',
        answer: 2, 
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5 

startGame = () => {
    questionCounter = 0 
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    questionCounter++
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location='end.html'
    }

    
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice =>{
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
      if(!acceptingAnswers) return
      
      acceptingAnswers = false
      const selectedChoice = e.target
      const selectedAnswer = selectedChoice.dataset['number']
        console.log(selectedAnswer) 
      let classToApply = parseInt(selectedAnswer )=== currentQuestion.answer ? "correct" :
      "incorrect"


      if(classToApply === 'correct') {
          incrementScore(SCORE_POINTS)
      }
      
      selectedChoice.parentElement.classList.add(classToApply)

      setTimeout(() => {
          selectedChoice.parentElement.classList.remove(classToApply)
          getNewQuestion()

      }, 1000) 
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()