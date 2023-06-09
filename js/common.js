const modal = document.querySelector('.modal');
const backdrop = document.querySelector('#backdrop');
const form = document.querySelector('form');
const playerName = document.querySelectorAll('.player-name');
const errorMsg = document.querySelector('#error-msg');

const editBtn = document.querySelectorAll('.btn-edit');
const cancelBtn = document.querySelector('#cancel');
const inputPlayerName = document.querySelector('input[name="playername"]');
const players = [
  {
    name: 'player1',
    symbol: 'X',
  },
  {
    name: 'player2',
    symbol: 'O',
  },
];

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
  form.firstElementChild.classList.remove('error');
  errorMsg.textContent = '';
});

backdrop.addEventListener('click', () => {
  modal.classList.remove('on');
  backdrop.classList.remove('on');
  form.firstElementChild.classList.remove('error');
  inputPlayerName.value = '';
  errorMsg.textContent = '';
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const name = formData.get('playername').trim();
  if (!name) {
    form.firstElementChild.classList.add('error');
    errorMsg.textContent = '플레이어 이름을 입력해주세요.';
    return;
  } else {
    if (playerIndex === 0) {
      players[0].name = name;
      playerName[0].textContent = name;
    } else {
      players[1].name = name;
      playerName[1].textContent = name;
    }
    modal.classList.remove('on');
    backdrop.classList.remove('on');
    inputPlayerName.value = '';
  }
  console.log(players);
});

inputPlayerName.addEventListener('focus', () => {
  form.firstElementChild.classList.remove('error');
  errorMsg.textContent = '';
  return;
});
