var quizAnswers = [];
var currentStep = 0;


function sendRequest() {
    let xhr = new XMLHttpRequest();
    let request = JSON.stringify(quizAnswers);
    xhr.open('POST', 'quiz.php');
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(request);
	console.log(request);

    xhr.onload = function () {
        console.log(xhr.response);
        if(xhr.status==200) 
            showResultPage(xhr.response);
        else showResultPage('error');
    }
}


//записываем след пользователя

function QuizAnswer(question, answer) {
    this.step = currentStep;
    this.question = question;
    this.answer = answer;
};

function addAnswer() {
    let question = document.querySelector('.form__header').innerText;
    let answer = (document.querySelector('input:checked') || document.querySelector('input[type="text"]')).value;
    let newAnswer = new QuizAnswer(question, answer);
    quizAnswers.push(newAnswer);
}

function goFinalPage() {
    document.querySelector('.form_first').classList.add('form_hidden');
    document.querySelector('.form_result').classList.remove('form_hidden');
}
function showResultPage(status){
    if(status != 'OK') document.querySelector('.form_success .message').innerHTML = 'К сожалению, отправка формы не удалась &#128532;. <br> Пожалуйства, оставьте нам заявку через форму обратной связи &#128591;';
    document.querySelector('.form_result').classList.add('form_hidden');
    document.querySelector('.form_success').classList.remove('form_hidden');
}

function initQuiz() {
    showError(false)
    let step = quiz[currentStep];
    document.querySelector('.form__header').innerText = step['question'];
    document.querySelector('.form__answers').innerHTML = '';
    for (answer in step['answers']) {
        let elem = `<label class="control"><input type="radio" class="control__input" name="choose" value="${answer}" autocomplete="off" required><span class="control__label control__label_radio">${answer}</span></label>`;
        document.querySelector('.form__answers').insertAdjacentHTML('beforeend', elem);
    }
    if (step['textField']) {
        let input = '<label class="control"><input type="radio" class="control__input control__input_replacement" name="choose" autocomplete="off" value="" required><input class="input" type="text" name="other" placeholder="Другое"></label>';
        document.querySelector('.form__answers').insertAdjacentHTML('beforeend', input);
    }
}

function checkValid(){
    let hasAnswer = document.querySelector('form.form__answers').checkValidity();
    hasAnswer? showError(false): showError(true);
    return hasAnswer;
}

function nextStep() {
    if (checkValid()) {
        let answer = document.querySelector('input[type="radio"]:checked').value;
        addAnswer();
        currentStep = quiz[currentStep]['answers'][answer] || quiz[currentStep]['textField'];
        if (currentStep != "end") initQuiz();
        else goFinalPage();
    }

}

function showError(isError){
    let err = document.querySelector('.form__error');
    isError? err.classList.add('form__error_active') : err.classList.remove('form__error_active');
}

function prevStep() {
    if (currentStep > 0) {
        let step = quizAnswers.length - 1;
        currentStep = quizAnswers[step]['step'];
        quizAnswers.splice(step, 1);
        initQuiz();
    }
}

initQuiz();


document.querySelector('.form__button_next').addEventListener('click', nextStep);
document.querySelector('.form__button_prev').addEventListener('click', prevStep);
document.querySelector('input[name="other"]').addEventListener('focus', function(){
    document.querySelector('.control__input_replacement').checked = true;
})
document.querySelector('input[name="other"]').addEventListener('input', function(e){
    document.querySelector('.control__input_replacement').value = e.currentTarget.value;
})
document.querySelector('form.form__answers').addEventListener('change', checkValid);


var form = document.querySelector('form.form__feedback');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('Отправить');
    let formData = new FormData(form);
    for (let [name, value] of formData) {
        ans = new QuizAnswer(name, value)
        quizAnswers.push(ans);
    }
    sendRequest();
    
})

var phoneMask = IMask(
    document.querySelector('.input_icon-phone'), {
    mask: '+{7} (000) 000-00-00'
});