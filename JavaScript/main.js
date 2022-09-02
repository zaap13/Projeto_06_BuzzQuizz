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

function hiddeQuestionInputs(imagem){
  const pai = imagem.parentNode
  const avô = pai.parentNode
  const SegundoNeto = avô.children[1]
  SegundoNeto.classList.toggle('hidden')
}

function creatorQuestions(nQuestions){
  const listCreationQuestion = document.querySelector('.list-question-creator');
  listCreationQuestion.innerHTML = ''
  console.log('ja ta em outra funçao',nQuestions)
  for(let i = 0; i<nQuestions;i++){
    listCreationQuestion.innerHTML+=`
    <li class="inputs">
      <div class="question-creator-box">
      <h2 class="question-creator-tittle">Pergunta ${i+1}</h2>
      <img class="create" src="./img/create.png" onclick="hiddeQuestionInputs(this)"/>
      </div>
      <div class="hidden">
      <input class="P${i+1}" type="text" placeholder="Texto da pergunta">
      <input class="P${i+1}" type="text" placeholder="Cor de fundo da pergunta">
      <h2 class="correct-answer-creator">Resposta correta</h2>
      <input class="P${i+1}" type="text" placeholder="Resposta correta">
      <input class="P${i+1}" type="text" placeholder="URL da imagem">
      <h2 class="wrong-answer-creator">Respostas Incorretas</h2>
      <div class="incorret">
        <input class="P${i+1}" type="text" placeholder="Resposta Incorreta 1">
        <input class="P${i+1}" type="text" placeholder="URL da imagem 1">
      </div>
      <div class="incorret">
        <input class="P${i+1}" type="text" placeholder="Resposta Incorreta 2">
        <input class="P${i+1}" type="text" placeholder="URL da imagem 2">
      </div>
      <div class="incorret">
        <input class="P${i+1}" type="text" placeholder="Resposta Incorreta 3">
        <input class="P${i+1}" type="text" placeholder="URL da imagem 3">
      </div>
      </div>
    </li>
    `
  }

}
function creatorBasic(){
  let listInputsBasic = document.querySelectorAll('.quizz-basic');

  let titleQuizz = listInputsBasic[0].value;
  console.log('Titulo',titleQuizz)

  let UrlImg = listInputsBasic[1].value; // nao esta pronto

  let QtdQuestion = listInputsBasic[2].value;
  console.log('N PERGUNTAS', QtdQuestion)

  let QtdLevels = listInputsBasic[3].value;
  console.log('N LEVELS',QtdLevels)

  let titleQuizzCharacters = (20< titleQuizz.length && titleQuizz.length<65) //consertar macaquice
  
  let CheckImg = UrlImg // nao esta pronto

  let nCorrectQuestion = (parseInt(QtdQuestion) >= 3)

  let nCorrectLevels = (parseInt(QtdLevels) >= 2)

  console.log('titulo certo',titleQuizzCharacters)
  console.log(CheckImg) // nao esta pronto
  console.log('perguntas certas',nCorrectQuestion)
  console.log('levels certos',nCorrectLevels)

  /*{
    title: string
    image: string
    questions: array de obj -> {title:str,image:str, answers:arry de obj}
    levels: array de obj ->{title:str,image:str, text: str, minValue: Number}
  } */
  if(titleQuizzCharacters && nCorrectQuestion && nCorrectLevels){
    creatorQuestions(parseInt(QtdQuestion))
    alert('tudo certo')
    document.querySelector('.start').classList.add('hidden')
    document.querySelector('.creator-question').classList.remove('hidden')
  }else{
    alert(`
    Titulo deve ter mais de 20 caracteres e menos de 65.
    Perguntas deve ser maior ou igual a 3.
    Niveis devem ser maior ou igual a 2.
    `)
  }

}

function reloadQuizz(){
  setTimeout(() => 
  window.scrollTo({top: 0, behavior: "smooth"}), 1000);
}
