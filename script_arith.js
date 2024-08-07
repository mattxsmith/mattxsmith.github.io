let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft;

const difficultyLevels = {
    easy: { max: 10, min: 1 },
    medium: { max: 50, min: 1 },
    hard: { max: 100, min: 1 }
};

function startTest() {
    document.getElementById('config').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    document.getElementById('result').style.display = 'none';

    const difficulty = document.getElementById('difficulty').value;
    const { max, min } = difficultyLevels[difficulty];
    
    generateQuestions(max, min);
    displayQuestion();
    startTimer();
}

function generateQuestions(max, min) {
    questions = [];
    for (let i = 0; i < 10; i++) {
        const num1 = Math.floor(Math.random() * (max - min + 1)) + min;
        const num2 = Math.floor(Math.random() * (max - min + 1)) + min;
        const operation = ['+', '-', '*'][Math.floor(Math.random() * 3)];
        const questionText = `${num1} ${operation} ${num2}`;
        const answer = eval(questionText);
        
        questions.push({ questionText, answer });
    }
}

function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
        document.getElementById('question').innerText = questions[currentQuestionIndex].questionText;
        document.getElementById('answer').value = '';
        // Focus on the input field whenever a new question is displayed
        document.getElementById('answer').focus();
    } else {
        endTest();
    }
}

function submitAnswer() {
    const userAnswer = parseFloat(document.getElementById('answer').value);
    if (userAnswer === questions[currentQuestionIndex].answer) {
        score++;
    }
    currentQuestionIndex++;
    displayQuestion();
}

function startTimer() {
    timeLeft = 60;
    document.getElementById('time').innerText = timeLeft;
    
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time').innerText = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            endTest();
        }
    }, 1000);
}

function endTest() {
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    document.getElementById('score').innerText = `Your score: ${score} out of 10`;
}

function resetTest() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('config').style.display = 'block';
}
