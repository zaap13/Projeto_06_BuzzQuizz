const urlQuizzes = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";
let quizzes = [];
let quizz = [];
let putAnswer = [];
let headerQuestion = [];

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
    ul.innerHTML += `<li class="quizz-box" onclick="loadPage(${quizz.id})">
    <img class="quizz-img" src="${quizz.image}" alt="Imagem do quizz">
    <p class="quizz-title">${quizz.title}</p>
</li>
        `;
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
  const titleQuestion = document.querySelector(".title-quizz");
/*  const spaceAnswer = document.querySelector(".container-answer");*/
  const promisse = axios.get(`${urlQuizzes}/${key}`);
  
  promisse.then((result) => {
    quizz = result.data;

    quizzTitle.innerHTML = quizz.title;
    quizzImage.src = quizz.image;
    console.log(quizz);
  });

 headerQuestion = `<div class="question-title">
    <h1>Titulo da questão</h1>
  </div>`;

  titleQuestion.innerHTML = headerQuestion;

/*  for(let i = 1; i < 5; i++){
    putAnswer += `<li class="answer">
      <img src="https://blog.portalpos.com.br/app/uploads/2021/08/cores-768x511.jpg" alt="imagem de fundo">
      <h2>Resposta ${[i]}</h2>
      </li>`;
    }
  spaceAnswer.innerHTML = putAnswer;*/
}

function reloadQuizz(){
  setTimeout(() => 
  window.scrollTo({top: 0, behavior: "smooth"}), 1000);
}
