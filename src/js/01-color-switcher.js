const startbtn = document.querySelector('button[data-start]');
const stopbtn = document.querySelector('button[data-stop]');
let idInterval;
startbtn.addEventListener('click', function () {
  this.disabled = true;
  idInterval = setInterval(() => {
    document.body.style.background = getRandomHexColor();
  }, 1000);
  stopbtn.disabled = false;
});
stopbtn.addEventListener('click', function () {
  this.disabled = true;
  clearInterval(idInterval);
  startbtn.disabled = false;
});
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
