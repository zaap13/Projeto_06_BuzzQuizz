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
    reloadMenu();
    quizzList.classList.remove("hidden");
    quizzCreator.classList.add("hidden");
    quizzPage.classList.add("hidden");
  } else if (page === "quizz-creator") {
    reloadMenu();
    quizzCreator.classList.remove("hidden");
    quizzPage.classList.add("hidden");
    quizzList.classList.add("hidden");
  } else {
    reloadMenu();
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
      /*  console.log(questions[i].title);*/
      color = questions[i].color;

      title = questions[i].title;
      titleQuestion.innerHTML += `
      <ul class="container-question container-adjust">
          <div class="question-title" style="background-color: ${color}">
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
          <li class="answer-id${i} answer incorrectAnswer hidecolor" onclick="clickAnswer(this, ${qtdQuestions})">
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


let PostToSend = {title:'',image:'',questions:[],levels:[]}

function printCreatorQuestions() {
  //Funcao que printa as caixas de perguntas dependendo da resposta do usuario na tela 3.1
  const listCreationQuestion = document.querySelector(".list-question-creator");
  listCreationQuestion.innerHTML = "";
  console.log("ja ta em outra funçao", QtdQuestionCreator);
  for (let i = 0; i < QtdQuestionCreator; i++) {
    listCreationQuestion.innerHTML += `
    <li class="inputs">
      <div class="question-creator-box">
      <h2 class="question-creator-tittle">Pergunta ${i + 1}</h2>
      <img class="create" src="./img/create.png" onclick="hiddeQuestionInputs(this)"/>
      </div>
      <div class="info-question-creator hidden">
      <input class="P${i + 1} tittle-question-creator" type="text" placeholder="Texto da pergunta">
      <input class="P${i + 1} color-question-creator" type="color" placeholder="Cor de fundo da pergunta">
      <h2 class="correct-answer-creator">Resposta correta</h2>
      <input class="P${i + 1} tittle-correct-answer" type="text" placeholder="Resposta correta">
      <input class="P${i + 1} URL" type="text" placeholder="URL da imagem">
      <h2 class="wrong-answer-creator">Respostas Incorretas</h2>
      <div class="incorrect">
        <input class="P${i + 1} tittle-wrong-answer" type="text" placeholder="Resposta Incorreta 1">
        <input class="P${i + 1} URL" type="text" placeholder="URL da imagem 1">
      </div>
      <div class="incorrect">
        <input class="P${i + 1} tittle-wrong-answer" type="text" placeholder="Resposta Incorreta 2">
        <input class="P${i + 1} URL" type="text" placeholder="URL da imagem 2">
      </div>
      <div class="incorrect">
        <input class="P${i + 1} tittle-wrong-answer" type="text" placeholder="Resposta Incorreta 3">
        <input class="P${i + 1} URL" type="text" placeholder="URL da imagem 3">
      </div>
      </div>
    </li>
    `;
  }
}

function printCreatorLevel(){
  //Funcao que printa as caixas de levels dependendo da resposta do usuario na tela 3.1
  const listCreationLevel = document.querySelector(".list-level-creator");
  listCreationLevel.innerHTML ="";

  for(let i = 0; i< QtdLevelsCreator;i++){
    listCreationLevel.innerHTML+=`
    <li class="inputs">
      <h2>Nivel ${i+1}</h2>
      <input class="N${i+1} tittle-level-creator" type="text" placeholder="Titulo do nível" />
      <input class="N${i+1} percent-level-creator" type="text" placeholder="% de acertos" />
      <input class="N${i+1} URL-level-creator" type="text" placeholder="URL da imagem do nível" />
      <input class="N${i+1} description-level-creator" type="text" placeholder="Descrição do nível" />
    </li>
    `
  }
}


function isImage(url) {
  const TypeList =['.jpg','.jpeg','.png','.webp','.avif','.gif','.svg'];
  for(let i = 0; i < TypeList.length; i++){
    if(url.includes(TypeList[i])){
      return true;
    }
  }
  return false
}

let QtdQuestionCreator;
let QtdLevelsCreator;
function creatorBasic() {
  let listInputsBasic = document.querySelectorAll(".quizz-basic");

  let titleQuizz = listInputsBasic[0].value;
  console.log("Titulo", titleQuizz);

  let UrlImg = listInputsBasic[1].value; // nao esta pronto

  QtdQuestionCreator = parseInt(listInputsBasic[2].value);
  console.log("N PERGUNTAS", QtdQuestionCreator);

  QtdLevelsCreator = parseInt(listInputsBasic[3].value);
  console.log("N LEVELS", QtdLevelsCreator);

  let titleQuizzCharacters = 20 < titleQuizz.length && titleQuizz.length < 65; //consertar macaquice

  let checkImg = isImage(UrlImg);
  console.log('AQUI',UrlImg)
  console.log('AQUI',checkImg)

  let nCorrectQuestion = QtdQuestionCreator >= 3;

  let nCorrectLevels = QtdLevelsCreator >= 2;

  console.log("titulo certo", titleQuizzCharacters);
  console.log('imagem é url? ',checkImg); 
  console.log("perguntas certas", nCorrectQuestion);
  console.log("levels certos", nCorrectLevels);


  if (titleQuizzCharacters && nCorrectQuestion && nCorrectLevels && checkImg) {
    printCreatorQuestions();
    printCreatorLevel();
    PostToSend.title = titleQuizz
    PostToSend.image = UrlImg
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
function storeQuestions(){
  const listQuestions =[];
  for(let i = 0; i < QtdQuestionCreator; i++){
    let listInputQuestions = document.querySelectorAll(`.P${i+1}`);
    let objQuestion = {title:'',color:'',answers:[]};
    console.log(listInputQuestions);
    let listAnswers =[];
    for(let j = 0; j < listInputQuestions.length; j++){
      let text = listInputQuestions[j].value;
      let strEmpty = (text !== '');
      if(strEmpty && j === 0){
        let backcolor = listInputQuestions[j+1].value;
        console.log(text, backcolor);
        objQuestion = {
          title:text,
          color: backcolor,
          answers: objQuestion.answers
        }
      }else if(text && j === 2){
        let answerUrl = listInputQuestions[j+1].value;
        console.log(text, answerUrl);
        let obj ={text: text, image: answerUrl, isCorrectAnswer: true};
        listAnswers.push(obj);
      }else if(strEmpty && (3<j<9) && j%2 === 0){
        let answerUrl = listInputQuestions[j+1].value;
        console.log(text, answerUrl);
        let obj ={text: text, image: answerUrl, isCorrectAnswer: false};
        listAnswers.push(obj);
      }
    }
    objQuestion = {title: objQuestion.title,color:objQuestion.color,answers:listAnswers}
    listQuestions.push(objQuestion)
    console.log(objQuestion)    
  }
  console.log(listQuestions)
  PostToSend.questions = listQuestions
}
  
function creatorQuestion(){
  const AllTittles = document.querySelectorAll('.tittle-question-creator');
  let compareTittle;
  const titleList = []
  for(let i = 0; i < AllTittles.length; i++){
    //For que checa se os titulos tem mais de 20 caracteres
    let text = AllTittles[i].value;
    if(text.length < 20){
      compareTittle = false;
      break
    }else{
      compareTittle = true;
      titleList.push(text)
    }
  }
  
  const AllCorrectAnswer = document.querySelectorAll('.tittle-correct-answer');
  let compareCorrectAnswer;
  for(let i = 0; i < AllCorrectAnswer.length; i++){
    //For que checa as perguntas certas
    let text = AllCorrectAnswer[i].value;
    if(text === ''){
      compareCorrectAnswer = false;
      break
    }else{
      compareCorrectAnswer = true;
    }
  }

  //const AllWrongAnswer = document.querySelectorAll('.tittle-wrong-answer');
  let compareWrongAnswer;
  for(let i = 0; i < QtdQuestionCreator; i++){
    let listIncorrect = document.querySelectorAll(`.incorrect .P${i+1}`);
    if(listIncorrect[0].value === ''){             
      compareWrongAnswer = false;
      break
    }else{
      compareWrongAnswer = true;
    }
    if(listIncorrect[4].value !== '' && listIncorrect[2].value === ''){
      //condiçao para se preencher a resposta incorreta 3 nao deixar a 2 em branco
      compareWrongAnswer = false
      break
    }
  }

  
  let listUrlAnswer =[];
  //For que checa as URL 
  for(i = 0; i < QtdQuestionCreator; i++){
    let listInputs = document.querySelectorAll(`.P${i+1}`);

    for(let j = 0; j<listInputs.length; j++){
      let text = listInputs[j].value
      
      if(j%2 === 0 && text !== '' && j !== 0){
        let Url = listInputs[j+1].value
        
        listUrlAnswer.push(isImage(Url))
      }
    }
  }
  console.log(compareCorrectAnswer)
  console.log(compareWrongAnswer)
  console.log(compareTittle)
  console.log(listUrlAnswer)
  let compareUrlAnswer;
  if(listUrlAnswer.length === 0){
    compareUrlAnswer = false
  }else{
    compareUrlAnswer = !listUrlAnswer.includes(false)
  }

  if(compareCorrectAnswer && compareWrongAnswer && compareTittle && compareUrlAnswer){
    storeQuestions();
    document.querySelector('.creator-question').classList.add('hidden')
    document.querySelector('.level').classList.remove('hidden')
  }else{
    alert('Por favor, preeencha todos os dados corretamentes!')
  }
}

function reloadMenu() {
  setTimeout(() => window.scrollTo({ top: 0, behavior: "auto" }), 0);
}

function reloadQuizz(){  
  setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 2000);
  loadQuizz(gameID);
}
