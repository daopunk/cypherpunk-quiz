const store = [
    {
      question: 'What is a Cypherpunk?',
      answers: [
        'An activist who advocates for punk-culture over social media',
        'A hacker who uses a cipher to hack governmental databases',
        'A punk who spends the majority of their time in cyberspace',
        'An activist who advocates for the widespread use of cryptography'
        ],
      correctAnswer: 'An activist who advocates for the widespread use of cryptography'
    },
    {
      question: 'When did the Cypherpunk movement emerge?',
      answers: [
        'Late 1960s',
        'Late 1970s',
        'Late 1980s',
        'Late 1990s'
        ],
      correctAnswer: 'Late 1980s'
    },
    {
      question: "Who wrote A Cypherpunk's Manifesto?",
      answers: [
        'Eric Hughes',
        'Timothy May',
        'David Chaum',
        'Richard Stallman'
        ],
      correctAnswer: 'Eric Hughes'
    },
    {
      question: "Which quote belongs in A Cypherpunk's Manifesto",
      answers: [
        "Crypto anarchy will create a liquid market for any and all material.",
        "Computerization is robbing individuals of the ability to monitor and control the ways information about them is used.",
        "Software sellers want to divide the users and conquer them.",
        "Privacy is necessary for an open society in the electronic age."
        ],
      correctAnswer: "Privacy is necessary for an open society in the electronic age."
    },
    {
      question: 'The GNU Project influenced Linus Torvalds to release which operating system in 1991?',
      answers: [
        'Windows',
        'Linux',
        'Android',
        'Mac OS'
        ],
      correctAnswer: 'Linux'
    },
    {
      question: "The rise and fall of the deep web's Silk Road was predicted in which Cyperpunk essay?",
      answers: [
        'The GNU Manifesto',
        "A Cypherpunk's Manifesto",
        'Bitcoin White Paper',
        'The Crypto-Anarchist Manifesto'
        ],
      correctAnswer: 'The Crypto-Anarchist Manifesto'
    },
    {
      question: 'Which Cyperpunk created WikiLeaks?',
      answers: [
      'Phillip Zimmerman',
      'Julian Assange',
      'Hal Finney',
      'Moxie Marlinspike'
      ],
    correctAnswer: 'Julian Assange'
    },
    {
      question: 'Which program did Phillip Zimmerman write to provide privacy to users during the Cryptowars?',
      answers: [
      'Reusabel Proof of Work (RPOW)',
      'BitTorrent',
      'Secure Socket Layer (SSL)',
      'Pretty Good Protection (PGP)'
      ],
    correctAnswer: 'Pretty Good Protection (PGP)'
    },
    {
      question: 'Written in 1985, "Security Without Identification: Transaction Systems to make Big Brother Obsolete," influenced the development of which technology?',
      answers: [
        'Cloud Computing',
        'Bitcoin Blockchain',
        'Git',
        'Facebook Libra'
      ],
    correctAnswer: 'Bitcoin Blockchain'
    },
    {
      question: 'Which anonymous developer realeased Bitcoin?',
      answers: [
        'Craig Wright',
        'Anonymous',
        'Satoshi Nakamoto',
        'Kara Kulakov'
    ],
  correctAnswer: 'Satoshi Nakamoto'
    }
];

let questionNum = 0;
let score = 0;


function quizBegin() {
  $('.beginQuiz').on('click', '.startButton', function(event) {
    $('.beginQuiz').remove();
    $('.questionAnswerForm').css('display', 'block');
    $('.questionNum').text(1);
  });
}


function renderQuestion () {
  $('.questionAnswerForm').html(generateQuestion());
}


function generateQuestion() {
  if (questionNum < store.length) {

    return `
    <form>
    <div class="question-${questionNum}">
    <h2 class='quizQuestion'>${store[questionNum].question}</h2>
    <fieldset class = 'answerOption'>

    <label for="ans1">
    <input id="ans1" type='radio' value="${store[questionNum].answers[0]}" name="option" required><span> ${store[questionNum].answers[0]}</span>
    </label><br><br>

    <label for="ans2">
    <input id="ans2" type='radio' value="${store[questionNum].answers[1]}" name="option" required><span> ${store[questionNum].answers[1]}</span>
    </label><br><br>

    <label for="ans3">
    <input id="ans3" type='radio' value="${store[questionNum].answers[2]}" name="option" required><span> ${store[questionNum].answers[2]}</span>
    </label><br><br>

    <label for="ans4">
    <input id="ans4" type='radio' value="${store[questionNum].answers[3]}" name="option" required><span> ${store[questionNum].answers[3]}</span>
    </label><br><br>

    <button type='submit' class="submitButton">Submit</button>

    </fieldset></form>`;
  }
else {
  renderResults();
  restartQuiz();
}
}


function renderNextQuestion () {
  $('main').on('click', '.nextButton', function (event) {
    questionNum = questionNum+ 1;
    renderQuestion();
    chooseAnswer();
    addQuestionNum();
  });
}


function chooseAnswer () {
  $('form').on('submit', function (event) {
    event.preventDefault();
    let correctAnswer = `${store[questionNum].correctAnswer}`;
    let selectedAnswer = $('input:checked');
    let answer = selectedAnswer.val();
    
    if (answer === correctAnswer) {
      selectedAnswer.parent().addClass('correct');
      selectCorrectAnswer();
    } 
    else {
      selectedAnswer.parent().addClass('wrong');
      selectWrongAnswer();
    }
  });
}


function selectCorrectAnswer() {
  choseCorrect();
  updateScore ();
}


function selectWrongAnswer() {
   choseWrong();
}


function choseCorrect() {
let correctAnswer = `${store[questionNum].correctAnswer}`;

  $('.questionAnswerForm').html(`<div class="correctFeedback"><p><b>That is Correct!</b></p>
  <button type=button class="nextButton">Next</button></div>`);
}


function choseWrong() {
let correctAnswer = `${store[questionNum].correctAnswer}`;

   $('.questionAnswerForm').html(`<div class="correctFeedback"><p><b>That is Incorrect</b><br>The correct answer is: <span>"${correctAnswer}"</span></p>
   <button type=button class="nextButton">Next</button></div>`);
}


function addQuestionNum() {
  if (questionNum < store.length) {
  $('.questionNum').text(questionNum+1);
  }
  else {
    $('.questionNum').text(10);
  }
}


function updateScore() {
  score++;
  $('.score').text(score);
}


function renderResults () {
  if (score >= 8) {
    $('.questionAnswerForm').html(`<div class="correctFeedback">
    <h3>Good job!</h3>
    <p>You got ${score} / 10</p><p>You must be a Cypherpunk!</p><button class="restartButton">Restart</button></div>`);
  } else if (score >= 6) {
    $('.questionAnswerForm').html(`<div class="correctFeedback">
    <h3>Not bad. Not good.</h3><p>You got ${score} / 10</p><button class="restartButton">Restart Quiz</button></div>`);
  } else 
    $('.questionAnswerForm').html(`<div class="correctFeedback">
    <h3>Looks like you don't know the Cypherpunks...</h3><p>You got ${score} / 10</p><button class="restartButton">Restart</button></div>`);
  }


function restartQuiz () {
  $('main').on('click', '.restartButton', function (event) {
    location.reload();
  });
}


function generateQuiz () {
  quizBegin();
  renderQuestion();
  chooseAnswer();
  renderNextQuestion();
}


$(generateQuiz);
