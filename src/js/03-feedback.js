import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = form.email;
const message = form.message;

const feedbackFormState = localStorage.getItem('feedback-form-state');

if (feedbackFormState) {
  const data = JSON.parse(feedbackFormState);

  email.value = data.email;
  message.value = data.message;
}

const onInput = () => {
  const data = {
    email: email.value,
    message: message.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(data));
};

const onSubmit = e => {
  e.preventDefault();

  const data = {
    email: email.value,
    message: message.value,
  };

  console.log(data);

  form.reset();
  localStorage.removeItem('feedback-form-state');
};

form.addEventListener('input', throttle(onInput, 500));
form.addEventListener('submit', onSubmit);
