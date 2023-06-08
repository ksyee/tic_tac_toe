const modal = document.querySelector('.modal');
const backdrop = document.querySelector('#backdrop');
const form = document.querySelector('form');
const playerName = document.querySelectorAll('.player-name');
const errorMsg = document.querySelector('#error-msg');

const editBtn = document.querySelectorAll('.btn-edit');
const cancelBtn = document.querySelector('#cancel');
const submitBtn = document.querySelector('form button[type="submit"]');

let playerIndex = 0;

editBtn.forEach((item, index) => {
  item.addEventListener('click', () => {
    modal.classList.add('on');
    backdrop.classList.add('on');
    playerIndex = index;
  });
});

cancelBtn.addEventListener('click', () => {
  modal.classList.remove('on');
  backdrop.classList.remove('on');
  errorMsg.textContent = '';
});

backdrop.addEventListener('click', () => {
  modal.classList.remove('on');
  backdrop.classList.remove('on');
  errorMsg.textContent = '';
});

submitBtn.addEventListener('click', e => {
  e.preventDefault();
  const formData = new FormData(form);
  const name = formData.get('playername').trim();
  if (!name) {
    errorMsg.textContent = '플레이어 이름을 입력해주세요.';
    return;
  } else {
    playerIndex === 0 ? (playerName[playerIndex].textContent = name) : (playerName[playerIndex].textContent = name);
    modal.classList.remove('on');
    backdrop.classList.remove('on');
  }
});
