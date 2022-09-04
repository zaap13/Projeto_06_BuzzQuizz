const urlQuizzes = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";
let quizzes = [];
let quizz = [];
let levels = {};
let questions = [];
let answers = [];
let count = 0;

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

      for (let j = 0; j < answers.length; j++) {
        const spaceAnswer = document.querySelector(`.container-answer${i}`);
        /*  console.log(answers[j].isCorrectAnswer);*/

        image = answers[j].image;
        text = answers[j].text;

        console.log(answers[j].isCorrectAnswer);

        //EMBARALHAR AQUI
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
    // aqui terminar o quizz e mostrar nível (chamar função?)
    console.log(levels);
    let printLevel;
    
    for (let i = 0; i < levels.length; i++) {
      if (finalNumber > levels[i].minValue) {
        printLevel = levels[i];
      }
    }
    endQuizz(printLevel);
  }
}

function endQuizz(level) {
  let printLevel = level;
  console.log(printLevel);
  const titleQuestion = document.querySelector(".container-head");
  titleQuestion.innerHTML += ` 
  <ul class="container-title">
    <h1>${printLevel.title}</h1>
  </ul>
  <div class="container-body">
    <img src="${printLevel.image}">
    <p>${printLevel.text}</p>
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


let mandandoPost = {title:'',image:'',questions:[],levels:[]}
function printCreatorQuestions(nQuestions) {
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

function printCreatorLevel(nLevels){
  const listCreationLevel = document.querySelector(".list-level-creator");
  listCreationLevel.innerHTML ="";

  for(let i = 0; i<nLevels;i++){
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

function creatorBasic() {
  let listInputsBasic = document.querySelectorAll(".quizz-basic");

  let titleQuizz = listInputsBasic[0].value;
  console.log("Titulo", titleQuizz);

  let UrlImg = listInputsBasic[1].value; // nao esta pronto

  let QtdQuestion = parseInt(listInputsBasic[2].value);
  console.log("N PERGUNTAS", QtdQuestion);

  let QtdLevels = parseInt(listInputsBasic[3].value);
  console.log("N LEVELS", QtdLevels);

  let titleQuizzCharacters = 20 < titleQuizz.length && titleQuizz.length < 65; //consertar macaquice

  let checkImg = isImage(UrlImg);
  console.log('AQUI',UrlImg)
  console.log('AQUI',checkImg)

  let nCorrectQuestion = QtdQuestion >= 3;

  let nCorrectLevels = QtdLevels >= 2;

  console.log("titulo certo", titleQuizzCharacters);
  console.log('imagem é url? ',checkImg); // nao esta pronto
  console.log("perguntas certas", nCorrectQuestion);
  console.log("levels certos", nCorrectLevels);

  /*{
    title: string
    image: string
    questions: array de obj -> {title:str,image:str, answers:arry de obj}
    levels: array de obj ->{title:str,image:str, text: str, minValue: Number}
  } */
  if (titleQuizzCharacters && nCorrectQuestion && nCorrectLevels && checkImg) {
    printCreatorQuestions(QtdQuestion);
    printCreatorLevel(QtdLevels);
    mandandoPost.title = titleQuizz
    mandandoPost.image = UrlImg
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
function storeQuestions(qtdeQuestions){
  const listQuestions =[]
  /* {titulo:in 1, cor:in 2, resposta:[{text: in3, url:in4, bool:true},{text: in5, url:in6, bool:false},{text: in7, url:in8, bool:false},{text: in9, url:in10, bool:false}]} */
  /* {
			title: "Título da pergunta 1",
			color: "#123456",
			answers: [
				{
					text: "Texto da resposta 1",
					image: "https://http.cat/411.jpg",
					isCorrectAnswer: true
				},
				{
					text: "Texto da resposta 2",
					image: "https://http.cat/412.jpg",
					isCorrectAnswer: false
				}
			]
		} */
  for(let i = 0; i < qtdeQuestions; i++){
    let listInputQuestions = document.querySelectorAll(`.P${i+1}`)
    let question = {
      title:listInputQuestions[0].value,
      color:listInputQuestions[1].value,
      answer:[{
        text:listInputQuestions[2].value,
        image:listInputQuestions[3].value,
        isCorrectAnswer: true
      }]

    }
  }
  
}
function creatorQuestion(qtdeQuestions){
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
  for(let i = 0; i < qtdeQuestions; i++){
    let listIncorrect = document.querySelectorAll(`.incorrect .P${i+1}`);
    if(listIncorrect[0].value === ''){             
      compareWrongAnswer = false;
      break
    }else{
      compareWrongAnswer = true;
    }
    /* if(text === ''){
      compareWrongAnswer = false;
      break
    }else{
      compareWrongAnswer = true;
    } */
  }

  /* const AllUrlQuestion = document.querySelectorAll('.list-question-creator .URL'); */
  let listUrlAnswer =[];
  //For que checa as URL 
  for(i = 0; i < qtdeQuestions; i++){
    let listInputs = document.querySelectorAll(`.P${i+1}`);

    for(let j = 0; j<listInputs.length; j++){
      let text = listInputs[j].value
      
      if(j%2 === 0 && text !== '' && j !== 0){
        let Url = listInputs[j+1].value
        
        listUrlAnswer.push(isImage(Url))
      }
      /* let text = AllUrlQuestion[i].value
      if(isImage(text)){
        compareUrlAnswer = true;
      }else{
        compareUrlAnswer = false;
        break;
      } */
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
    document.querySelector('.creator-question').classList.add('hidden')
    document.querySelector('.level').classList.remove('hidden')
  }else{
    alert('Por favor, preeencha todos os dados corretamentes!')
  }
}

function reloadQuizz() {
  setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 1000);
}
