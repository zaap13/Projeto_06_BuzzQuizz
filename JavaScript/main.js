const urlQuizzes = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";
let quizzes = [];
let quizz = [];
let levels = [];
let questions = [];
let answers = [];

window.onload = () => {
  getQuizzes();

  let local = localStorage;
  if (local.length !== 0) {
    loadUserQuizzes();
  }
};

function loadUserQuizzes() {
  userQuizz = document.querySelector(".user-quizzes");
  firstQuizz = document.querySelector(".create-first-quizz");

  userQuizz.classList.remove("hidden");
  firstQuizz.classList.add("hidden");

  // Preencher UL com dados de localStorage
}

function loadQuizzes() {
  const ul = document.querySelector(".all-quizzes-list");
  ul.innerHTML = "";

  quizzes.forEach((quizz) => {
    ul.innerHTML += `
    <li class="quizz-box" onclick="loadPage(${quizz.id})">
      <img class="quizz-img" src="${quizz.image}" alt="Imagem do quizz">
      <p class="quizz-title">${quizz.title}</p>
    </li>`;
  });
}

function getQuizzes() {
  const promisse = axios.get(urlQuizzes);
  promisse.then((result) => {
    quizzes = result.data;
    loadQuizzes();
  });
}

function loadPage(page) {
  quizzList = document.querySelector(".quizz-list");
  quizzPage = document.querySelector(".quizz-page");
  quizzCreator = document.querySelector(".quizz-creator");

  if (page === "quizz-list") {
    quizzList.classList.remove("hidden");
    quizzCreator.classList.add("hidden");
    quizzPage.classList.add("hidden");
  } else if (page === "quizz-creator") {
    quizzCreator.classList.remove("hidden");
    quizzPage.classList.add("hidden");
    quizzList.classList.add("hidden");
  } else {
    quizzPage.classList.remove("hidden");
    quizzCreator.classList.add("hidden");
    quizzList.classList.add("hidden");

    loadQuizz(page);
  }
}

function loadQuizz(key) {
  const quizzTitle = document.querySelector(".container-quizz span");
  const quizzImage = document.querySelector(".container-quizz img");
  const titleQuestion = document.querySelector(".container-head");
  const promisse = axios.get(`${urlQuizzes}/${key}`);

  promisse.then((result) => {
    quizz = result.data;

    questions = quizz.questions;
    levels = quizz.levels;

    quizzTitle.innerHTML = quizz.title;
    quizzImage.src = quizz.image;

    titleQuestion.innerHTML = "";

    for (let i = 0; i < questions.length; i++) {
      /*let headerQuestion = [];*/
      /*  console.log(questions[i]);*/
      answers = questions[i].answers;
      console.log(questions[i].answers);

      answers.sort(shuffle);
      /*  console.log(questions[i].title);
      console.log(questions[i].color);*/

      title = questions[i].title;
      titleQuestion.innerHTML += `
      <ul class="container-question">
        <div class="title-quizz">
          <div class="question-title">
            <h1>${title}</h1>
          </div>
        </div>
        <ul class="container-answer${i} style-answer">
        </ul>
      </ul>`;

      /*titleQuestion.innerHTML = headerQuestion;*/

      for(let j = 0; j < answers.length; j++) {
        const spaceAnswer = document.querySelector(`.container-answer${i}`);
        /*  console.log(answers[j].isCorrectAnswer);*/

        image = answers[j].image;
        text = answers[j].text;
        console.log(spaceAnswer);
        spaceAnswer.innerHTML += `
        <li class="answer answer-id${i}">
          <img src="${image}" alt="imagem de fundo">
          <h2>${text}</h2>
        </li>`;
      }
    }
    /*console.log(quizz);*/
  });
}

function shuffle() {
  return Math.random() - 0.5;
}

function reloadQuizz() {
  setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 1000);
}
