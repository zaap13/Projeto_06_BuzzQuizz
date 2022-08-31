const urlQuizzes = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";
let quizzes = [];

quizzList = document.querySelector(".quizz-list");
quizzPage = document.querySelector(".quizz-page");
quizzCreator = document.querySelector(".quizz-creator");

window.onload = () => {
  getQuizzes();
};

function loadQuizzes() {
  const ul = document.querySelector(".all-quizzes-list");
  ul.innerHTML = "";

  quizzes.forEach((quizz) => {
    ul.innerHTML += `<li class="quizz-box" onclick="loadQuizz(${quizz.id})">
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

function loadQuizz(key) {
  quizzList.classList.add("hidden");
  quizzPage.classList.remove("hidden");
  console.log(key);
}

function loadCreateQuizz() {
  quizzList.classList.add("hidden");
  quizzCreator.classList.remove("hidden");
}

function loadList() {
  quizzList.classList.remove("hidden");
  quizzCreator.classList.add("hidden");
  quizzPage.classList.add("hidden");
}
