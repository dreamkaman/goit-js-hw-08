var throttle = require('lodash.throttle');

const formEl = document.querySelector('.feedback-form');

//let feedback = {};

const feedbackObject = { email: "", message: "" };


const onFormElSubmit = (event) => {

    event.preventDefault();

    console.log(feedbackObject);

    formEl.reset();

    localStorage.clear();
};

formEl.addEventListener('submit', onFormElSubmit);




const onFormFieldsInput = (event) => {
    
    if (event.target.nodeName === 'INPUT') { feedbackObject.email = event.target.value };

    if (event.target.nodeName === 'TEXTAREA') { feedbackObject.message = event.target.value };
    
    const feedbackString = JSON.stringify(feedbackObject);
    
    localStorage.setItem("feedback-form-state", feedbackString);

};

formEl.addEventListener('input', throttle(onFormFieldsInput, 500));



if (localStorage.getItem("feedback-form-state")) {

    feedback = JSON.parse(localStorage.getItem("feedback-form-state"));

   const { email, message } = feedback;

    formEl.elements['email'].value = email;

    formEl.elements['message'].value = message;
    
};
