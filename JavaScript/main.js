const urlQuizzes = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";
let quizzes = [];
let quizz = [];
let levels = {};
let questions = [];
let answers = [];
let count = 0;
let gameID;

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
  gameID = key;
  countCorrect = 0;
  countClicked = 0;
  const quizzTitle = document.querySelector(".container-quizz span");
  const quizzImage = document.querySelector(".container-quizz img");
  const titleQuestion = document.querySelector(".container-head");
  const promisse = axios.get(`${urlQuizzes}/${key}`);

  promisse.then((result) => {
    quizz = result.data;
    questions = quizz.questions;
    levels = quizz.levels;
    console.log(levels);

    let qtdQuestions = questions.length;

    quizzTitle.innerHTML = quizz.title;
    quizzImage.src = quizz.image;

    titleQuestion.innerHTML = "";

    for (let i = 0; i < questions.length; i++) {
      /*let headerQuestion = [];*/
      /*  console.log(questions[i]);*/
      answers = "";
      answers = questions[i].answers;
      console.log(questions[i].answers);

      answers.sort(shuffle);
      /*  console.log(questions[i].title);
      console.log(questions[i].color);*/

      title = questions[i].title;
      titleQuestion.innerHTML += `
      <ul class="container-question container-adjust">
          <div class="question-title">
            <h1>${title}</h1>
          </div>
        <ul class="container-answer${i} style-answer">
        </ul>
      </ul>`;

      /*titleQuestion.innerHTML = headerQuestion;*/

      for (let j = 0; j < answers.length; j++) {
        const spaceAnswer = document.querySelector(`.container-answer${i}`);
        /*  console.log(answers[j].isCorrectAnswer);*/

        image = answers[j].image;
        text = answers[j].text;

        console.log(answers[j].isCorrectAnswer);

        if (answers[j].isCorrectAnswer === true) {
          spaceAnswer.innerHTML += `
        <li class="answer-id${i} answer correct hidecolor" onclick="clickAnswer(this, ${qtdQuestions})">
          <img src="${image}" alt="imagem de fundo">
          <h2>${text}</h2>
        </li>`;
        } else {
          spaceAnswer.innerHTML += `
          <li class="answer-id${i} answer incorrect hidecolor" onclick="clickAnswer(this, ${qtdQuestions})">
            <img src="${image}" alt="imagem de fundo">
            <h2>${text}</h2>
          </li>`;
        }
      }
    }
  });
}

function clickAnswer(ans, qtd) {
  let qtdQuestions = qtd;
  countClicked++;
  //console.log(countClicked);
  let answer = document.querySelectorAll(`.${ans.classList[0]}`);

  if (ans.classList[2] === "correct") {
    countCorrect++;
    //console.log(countCorrect);
  }

  answer.forEach((ansid) => {
    ansid.removeAttribute("onclick");
    ansid.classList.remove("hidecolor");

    if (ansid !== ans) {
      ansid.classList.add("opacity");
    }
    //console.log(ansid);
  });

  if (countClicked === qtdQuestions) {
    finalNumber = Math.round((countCorrect / qtdQuestions) * 100);
    console.log(finalNumber);
    // aqui terminar o quizz e mostrar nível (chamar função?)
    console.log(levels);
    let printLevel;
    
    for (let i = 0; i < levels.length; i++) {
      if (finalNumber >= levels[i].minValue) {
        printLevel = levels[i];
      }
    }
    endQuizz(printLevel, finalNumber);
  }
}

function endQuizz(printLevel, finalNumber) {
  const titleQuestion = document.querySelector(".container-head");
  titleQuestion.innerHTML += `
  <div class="container-answer container-adjust">
  <ul class="container-title">
  <div><h1>${finalNumber}% de acerto: ${printLevel.title}</h1></div>
  </ul>
  <div class="container-body">
    <img src="${printLevel.image}">
    <p>${printLevel.text}</p>
  </div>
  </div>`;
}

function shuffle() {
  return Math.random() - 0.5;
}

function hiddeQuestionInputs(imagem) {
  const pai = imagem.parentNode;
  const avô = pai.parentNode;
  const SegundoNeto = avô.children[1];
  SegundoNeto.classList.toggle("hidden");
}

function creatorQuestions(nQuestions) {
  const listCreationQuestion = document.querySelector(".list-question-creator");
  listCreationQuestion.innerHTML = "";
  console.log("ja ta em outra funçao", nQuestions);
  for (let i = 0; i < nQuestions; i++) {
    listCreationQuestion.innerHTML += `
    <li class="inputs">
      <div class="question-creator-box">
      <h2 class="question-creator-tittle">Pergunta ${i + 1}</h2>
      <img class="create" src="./img/create.png" onclick="hiddeQuestionInputs(this)"/>
      </div>
      <div class="hidden">
      <input class="P${i + 1}" type="text" placeholder="Texto da pergunta">
      <input class="P${
        i + 1
      }" type="text" placeholder="Cor de fundo da pergunta">
      <h2 class="correct-answer-creator">Resposta correta</h2>
      <input class="P${i + 1}" type="text" placeholder="Resposta correta">
      <input class="P${i + 1}" type="text" placeholder="URL da imagem">
      <h2 class="wrong-answer-creator">Respostas Incorretas</h2>
      <div class="incorret">
        <input class="P${i + 1}" type="text" placeholder="Resposta Incorreta 1">
        <input class="P${i + 1}" type="text" placeholder="URL da imagem 1">
      </div>
      <div class="incorret">
        <input class="P${i + 1}" type="text" placeholder="Resposta Incorreta 2">
        <input class="P${i + 1}" type="text" placeholder="URL da imagem 2">
      </div>
      <div class="incorret">
        <input class="P${i + 1}" type="text" placeholder="Resposta Incorreta 3">
        <input class="P${i + 1}" type="text" placeholder="URL da imagem 3">
      </div>
      </div>
    </li>
    `;
  }
}
function creatorBasic() {
  let listInputsBasic = document.querySelectorAll(".quizz-basic");

  let titleQuizz = listInputsBasic[0].value;
  console.log("Titulo", titleQuizz);

  let UrlImg = listInputsBasic[1].value; // nao esta pronto

  let QtdQuestion = listInputsBasic[2].value;
  console.log("N PERGUNTAS", QtdQuestion);

  let QtdLevels = listInputsBasic[3].value;
  console.log("N LEVELS", QtdLevels);

  let titleQuizzCharacters = 20 < titleQuizz.length && titleQuizz.length < 65; //consertar macaquice

  let CheckImg = UrlImg; // nao esta pronto

  let nCorrectQuestion = parseInt(QtdQuestion) >= 3;

  let nCorrectLevels = parseInt(QtdLevels) >= 2;

  console.log("titulo certo", titleQuizzCharacters);
  console.log(CheckImg); // nao esta pronto
  console.log("perguntas certas", nCorrectQuestion);
  console.log("levels certos", nCorrectLevels);

  /*{
    title: string
    image: string
    questions: array de obj -> {title:str,image:str, answers:arry de obj}
    levels: array de obj ->{title:str,image:str, text: str, minValue: Number}
  } */
  if (titleQuizzCharacters && nCorrectQuestion && nCorrectLevels) {
    creatorQuestions(parseInt(QtdQuestion));
    alert("tudo certo");
    document.querySelector(".start").classList.add("hidden");
    document.querySelector(".creator-question").classList.remove("hidden");
  } else {
    alert(`
    Titulo deve ter mais de 20 caracteres e menos de 65.
    Perguntas deve ser maior ou igual a 3.
    Niveis devem ser maior ou igual a 2.
    `);
  }
}

function reloadQuizz() {
  setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 1000);
  loadQuizz(gameID);
}
