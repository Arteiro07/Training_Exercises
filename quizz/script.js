function loadQuizz(){
    deSelect();

    questionData=quizzData[currentQuizz];
    questionEL.innerText = questionData.question;
    a_text.innerText=questionData.a;
    b_text.innerText=questionData.b;
    c_text.innerText=questionData.c;
    d_text.innerText=questionData.d;
}

function getSelected(){
    let answer = undefined;
    answerEls.forEach((answerEl)=>{
        if (answerEl.checked){
            answer = answerEl.id;
        }
    });

    return answer;
}

function deSelect(){
    answerEls.forEach((answerEl)=>{
        if (answerEl.checked){
            answerEl.checked=false;
        }
    });

}
const answerEls = document.querySelectorAll(".answer")
const quizzEl = document.getElementById('quizz')
const questionEL = document.getElementById('question-El');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');

const quizzData = [
    {
        question : "What's the best sold album of the four",
        a : '"Back in Black" by AC/DC',
        b : '"Dark Side of the Moon" by Pink Floyd',
        c : '"Hotel California" by Eagles',
        d : '"Rumours" by Fleetwood Mac',
        correct : 'a'
    },
    {
        question : "Where are the AC/DC from",
        a : 'United Kingdom',
        b : 'United States',
        c : 'Ireland',
        d : 'Australia',
        correct : 'd'
    },
    {
        question : "Who isn't a member of The Beatles",
        a : 'Ringo Starr',
        b : 'Eric Clapton',
        c : 'George Harrison',
        d : 'Paul McCartney',
        correct : 'b'
    },
    {
        question : "In which continent is Portugal",
        a : 'Asia',
        b : 'Africa',
        c : 'Europe',
        d : 'North-America',
        correct : 'c'
    },
];

let currentQuizz = 0;
let score = 0;

loadQuizz();

submitBtn.addEventListener("click",()=>{
    const answer = getSelected();
    if (answer)
    {
        /// Checks if it's the correct answer
        if(answer === quizzData[currentQuizz].correct){
            score++;
            alert("Correct Answer");
        }
        else{
            alert("Wrong Answer");
        }

        /// Proceeds to the next question
        currentQuizz++
        if(currentQuizz<quizzData.length){
            loadQuizz();
        }
        else{
           quizzEl.innerHTML=`
            <h2> You answered correctly at ${score}/${quizzData.length} questions. </h2> 
            <button onclick="location.reload()">Reload</button>
            `;
        }
    }        
});