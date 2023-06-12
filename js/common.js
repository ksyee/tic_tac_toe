const modal = document.querySelector('.modal');
const backdrop = document.querySelector('#backdrop');
const form = document.querySelector('form');
const playerName = document.querySelectorAll('.player-name');
const errorMsg = document.querySelector('#error-msg');
const playGame = document.querySelector('#play-game');
const gameBoard = document.querySelectorAll('#game-board li');
const turnGuide = document.querySelector('#turn-guide');
const turnPlayerName = document.querySelector('#turn-player-name');
const gameOver = document.querySelector('#game-over');
const winnerName = document.querySelector('#winner-name');

// 버튼 요소
const editBtn = document.querySelectorAll('.btn-edit');
const cancelBtn = document.querySelector('#cancel');
const inputPlayerName = document.querySelector('input[name="playername"]');
const startGameBtn = document.querySelector('#btn-start-game');

// 게임 데이터
const players = [
  {
    name: '',
    symbol: 'X',
  },
  {
    name: '',
    symbol: 'O',
  },
];
const gameData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

// 변수 초기화
let playerIndex = 0;
let turnPlayer = 0;
let winnerId = 0;
let currentTurn = 1;
let gameIsOver = false;

// 플레이어 이름 수정
editBtn.forEach((item, index) => {
  item.addEventListener('click', () => {
    modal.classList.add('on');
    backdrop.classList.add('on');
    playerIndex = index;
  });
});

// 모달창 닫기
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

// 플레이어 이름 입력 및 저장
form.addEventListener('submit', e => {
  e.preventDefault();
  confirmInputPlayerName(e.target);
});

// input focus 시 에러 메시지 삭제
inputPlayerName.addEventListener('focus', () => {
  form.firstElementChild.classList.remove('error');
  errorMsg.textContent = '';
  return;
});

// 게임 시작 버튼
startGameBtn.addEventListener('click', () => {
  checkStartGameConditions();
});

// 게임 진행
gameBoard.forEach(item => {
  item.addEventListener('click', e => {
    const col = e.target.dataset.col - 1;
    const row = e.target.dataset.row - 1;

    // 이미 선택된 칸인지 확인
    if (gameData[row][col] !== 0 || gameIsOver) {
      return;
    }

    // 선택된 칸에 플레이어의 심볼 표시
    e.target.textContent = players[turnPlayer].symbol;
    e.target.classList.add('disabled');
    gameData[row][col] = turnPlayer + 1;

    // 승리 조건 확인
    confirmVictory();

    // 플레이어 변경 및 턴 변경
    switchPlayer();

    // 턴 표시
    turnPlayerName.textContent = players[turnPlayer].name;

    // 게임 종료
    funcGameOver();
  });
});

/* 함수 선언 */
const confirmInputPlayerName = elem => {
  const formData = new FormData(elem);
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
}; // 플레이어 이름 입력 및 저장

const checkStartGameConditions = () => {
  if (!players[0].name && !players[1].name) {
    alert('플레이어 이름을 입력해주세요.');
    return;
  } else if (!players[0].name || !players[1].name) {
    alert('플레이어 이름을 모두 입력해주세요.');
    return;
  }
  winnerId = 0;
  funcResetGameData();
  playGame.classList.add('on');
  turnPlayerName.textContent = players[turnPlayer].name;
  return;
}; // 게임 시작 조건 확인

const funcResetGameData = () => {
  turnPlayer = 0;
  currentTurn = 1;
  gameIsOver = false;
  gameOver.classList.remove('on');
  turnGuide.classList.remove('hidden');
  gameData.forEach(item => {
    item.fill(0);
  });
  gameBoard.forEach(item => {
    item.textContent = '';
    item.classList.remove('disabled');
  });
}; // 게임 데이터 초기화

const switchPlayer = () => {
  if (turnPlayer === 0) {
    turnPlayer = 1;
  } else if (turnPlayer === 1) {
    turnPlayer = 0;
  }
}; // 플레이어 변경 및 턴 변경

const funcGameOver = () => {
  if (winnerId !== 0) {
    gameIsOver = true;
    gameOver.classList.add('on');
    turnGuide.classList.add('hidden');
    console.log('게임 이긴 사람: ' + winnerId);
    if (winnerId === -1) {
      gameOver.children[0].innerHTML = '무승부입니다.';
    } else {
      winnerName.innerHTML = players[winnerId - 1].name;
      console.log('승리한 사람: ' + winnerName.innerHTML);
    }
  }
}; // 게임 종료

const confirmVictory = () => {
  gameData.forEach((item, index) => {
    if (
      gameData[index][0] === turnPlayer + 1 &&
      gameData[index][1] === turnPlayer + 1 &&
      gameData[index][2] === turnPlayer + 1
    ) {
      winnerId = gameData[index][0];
      return;
    } else if (
      gameData[0][index] === turnPlayer + 1 &&
      gameData[1][index] === turnPlayer + 1 &&
      gameData[2][index] === turnPlayer + 1
    ) {
      winnerId = gameData[0][index];
      return;
    } else if (
      gameData[0][0] === turnPlayer + 1 &&
      gameData[1][1] === turnPlayer + 1 &&
      gameData[2][2] === turnPlayer + 1
    ) {
      winnerId = gameData[0][0];
      return;
    } else if (
      gameData[0][2] === turnPlayer + 1 &&
      gameData[1][1] === turnPlayer + 1 &&
      gameData[2][0] === turnPlayer + 1
    ) {
      winnerId = gameData[0][2];
      return;
    }
    if (currentTurn === gameBoard.length) {
      winnerId = -1;
      return;
    }
    return;
  });
  currentTurn++;
}; // 승리 조건 확인
