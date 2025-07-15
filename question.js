// 예시 문제.txt 기반 문제 데이터
const questions = [
    {
        question: "1. 다음 단어의 뜻을 구별해 주는 요소로 알맞지 않은 것은?",
        choices: [
            "① 곰, 솜 - 자음",
            "② 종, 공 - 자음",
            "③ 돌, 돈 - 모음",
            "④ 산, 선 - 모음",
            "⑤ 밥, 법 - 모음"
        ],
        answer: 4
    },
    {
        question: "2. 국어의 음운에 대한 설명으로 적절하지 않은 것은?",
        choices: [
            "① 음운의 종류에는 자음과 모음이 있다.",
            "② 말의 뜻을 구별해 주는 소리의 단위이다.",
            "③ 모음은 공기가 그대로 흘러나오는 소리이다.",
            "④ 자음은 모음 없이 홀로 소리 낼 수 있는 음운이다.",
            "⑤ 음운에 따라 소리 낼 때의 느낌이 달라질 수 있다."
        ],
        answer: 3
    },
    {
        question: "3. 말의 뜻을 구별해 주는 소리의 가장 작은 단위는?",
        choices: [
            "① 음운",
            "② 음절",
            "③ 단어",
            "④ 문장",
            "⑤ 형태소"
        ],
        answer: 0
    },
    {
        question: "4. ‘돌’의 음운 중 하나를 골라 다른 음운으로 바꾼 단어가 아닌 것은?",
        choices: [
            "① 솔",
            "② 달",
            "③ 덕",
            "④ 돈",
            "⑤ 독"
        ],
        answer: 2
    },
    {
        question: "5. 음운에 대한 설명으로 알맞지 않은 것은?",
        choices: [
            "① 단어의 음운을 바꾸어 쓰면 의미가 달라진다.",
            "② 우리말의 음운은 자음과 모음으로 이루어진다.",
            "③ 자음은 공기가 방해를 받으며 나오는 소리이다.",
            "④ 말의 뜻을 구별해 주는 소리의 가장 작은 단위이다.",
            "⑤ 모음은 홀로 소리 낼 수 없어 자음을 만나야만 소리를 낼 수 있다."
        ],
        answer: 4
    }
];

let quizOrder = [];
let current = 0;
let score = 0;
let wrongs = [];
let retryMode = false;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startQuiz() {
    quizOrder = Array.from(questions.keys());
    shuffle(quizOrder);
    current = 0;
    score = 0;
    wrongs = [];
    retryMode = false;
    document.getElementById('score').textContent = '점수: 0';
    document.getElementById('result').textContent = '';
    document.getElementById('restart-btn').style.display = 'none';
    showQuestion();
}

function showQuestion() {
    let idx = retryMode ? wrongs[current] : quizOrder[current];
    let q = questions[idx];
    // 현재 문제 번호를 1번부터 표시
    let displayNum = (retryMode ? current : current) + 1;
    document.getElementById('question').textContent = `${displayNum}. ${q.question}`;
    const choicesUl = document.getElementById('choices');
    choicesUl.innerHTML = '';
    q.choices.forEach((choice, i) => {
        const li = document.createElement('li');
        li.innerHTML = `<label><input type="radio" name="choice" value="${i}"> ${choice}</label>`;
        choicesUl.appendChild(li);
    });
}

document.getElementById('submit-btn').onclick = function() {
    const checked = document.querySelector('input[name="choice"]:checked');
    if (!checked) {
        document.getElementById('result').textContent = '선택지를 골라주세요.';
        return;
    }
    let idx = retryMode ? wrongs[current] : quizOrder[current];
    let q = questions[idx];
    if (parseInt(checked.value) === q.answer) {
        score++;
        document.getElementById('result').textContent = '정답입니다!';
    } else {
        document.getElementById('result').textContent = '오답입니다.';
        if (!retryMode) wrongs.push(idx);
    }
    document.getElementById('score').textContent = `점수: ${score}`;
    current++;
    setTimeout(() => {
        document.getElementById('result').textContent = '';
        if ((retryMode && current < wrongs.length) || (!retryMode && current < quizOrder.length)) {
            showQuestion();
        } else if (!retryMode && wrongs.length > 0) {
            // 오답 재풀이 시작
            retryMode = true;
            current = 0;
            document.getElementById('result').textContent = '틀린 문제를 다시 풀어봅시다!';
            setTimeout(() => {
                document.getElementById('result').textContent = '';
                showQuestion();
            }, 1200);
        } else {
            document.getElementById('question').textContent = '퀴즈가 끝났습니다!';
            document.getElementById('choices').innerHTML = '';
            document.getElementById('restart-btn').style.display = 'inline-block';
        }
    }, 800);
};

document.getElementById('restart-btn').onclick = startQuiz;

window.onload = function() {
    document.getElementById('restart-btn').style.display = 'none';
    startQuiz();
};
