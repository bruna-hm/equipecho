const quizData = [
    {
        question: "Qual é o principal papel do Product Owner (P.O.) no Scrum?",
        a: "Desenvolver código de Software",
        b: "Facilitar reuniões diárias",
        c: "Maximizar o valor do produto",
        d: "Gerenciar a equipe de desenvolvimento",
        correct: "c"
    },
    {
        question: "Qual evento Scrum é dedicado a revisar o que foi feito durante a Sprint com os stakeholders?",
        a: "Sprint Planning",
        b: "Sprint Review",
        c: "Daily Scrum",
        d: "Sprint Restropective",
        correct: "b"
    },
    {
        question: "O que é o Increment no Scrum?",
        a: "Um planejamento futuro do projeto",
        b: "Uma lista de melhorias a serem feitas",
        c: "Um produto funcional e potencialmente liberável ao fim de uma Sprint",
        d: "Um conjunto de regras para o projeto",
        correct: "c"
    },
    {
        question: "Qual artefato no Scrum contém tudo o que precisa ser feito para o produto?",
        a: "Sprint Backlog",
        b: "Product Backlog",
        c: "Incremento",
        d: "Brundown Chart",
        correct: "b"
    },
    {
        question: "Quem é responsável por remover impedimentos no progresso da equipe Scrum?",
        a: "Product Owner",
        b: "Desenvolvedores",
        c: "Scrum Master",
        d: "Stakeholders",
        correct: "c"
    }
];
const quiz = document.getElementById("quiz");
const submitButton = document.getElementById("submit");
const results = document.getElementById("results");
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let hasAnswered = false;
function loadQuiz() {
    const currentQuizData = quizData[currentQuestion];
    hasAnswered = false;
    quiz.innerHTML = `
        <div class="question">${currentQuizData.question}</div>
        <button class="alternative-button" data-answer="a">${currentQuizData.a}</button>
        <button class="alternative-button" data-answer="b">${currentQuizData.b}</button>
        <button class="alternative-button" data-answer="c">${currentQuizData.c}</button>
        <button class="alternative-button" data-answer="d">${currentQuizData.d}</button>
    `;
    document.querySelectorAll('.alternative-button').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.alternative-button').forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            selectedAnswer = button.getAttribute('data-answer');
        });
    });
}
function highlightAnswers() {
    const correctAnswer = quizData[currentQuestion].correct;

    document.querySelectorAll('.alternative-button').forEach(button => {
        const answer = button.getAttribute('data-answer');
        if (answer === correctAnswer) {
            button.classList.add('correct');
        }
        if (answer === selectedAnswer && answer !== correctAnswer) {
            button.classList.add('wrong');
        }
    });
}
function showResults() {
    quiz.innerHTML = '';
    results.innerHTML = `Você acertou ${score} de ${quizData.length} questões.`;
    submitButton.style.display = 'none';
    const restartButton = document.createElement('button');
    restartButton.innerText = 'Reiniciar Quiz';
    restartButton.classList.add('restart-button');
    quiz.appendChild(restartButton);
    restartButton.addEventListener('click', restartQuiz);
}
function restartQuiz() {
    score = 0;
    currentQuestion = 0;
    selectedAnswer = null;
    results.innerHTML = '';
    submitButton.style.display = 'block';
    loadQuiz();
}
submitButton.addEventListener("click", () => {
    if (!hasAnswered) {
        if (selectedAnswer) {
            highlightAnswers();
            if (selectedAnswer === quizData[currentQuestion].correct) {
                score++;
            }
            hasAnswered = true;
            setTimeout(() => {
                currentQuestion++;
                selectedAnswer = null;
                if (currentQuestion < quizData.length) {
                    loadQuiz();
                } else {
                    showResults();
                }
            }, 1000);
        } else {
            alert("Por favor, selecione uma resposta!");
        }
    }
});
loadQuiz();