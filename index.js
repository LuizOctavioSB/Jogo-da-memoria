//Deck

let deck = [
  {
    id: 1,
    name: "bob",
    color: "#84CFFA",
    imagem: "https://image.flaticon.com/icons/svg/3069/3069170.svg",
    descricao: ["descricao 1", "descricao 2", "descricao 3"],
    virado: true,
  },
  {
    id: 2,
    name: "patrick",
    color: "#FA8484",
    imagem: "https://image.flaticon.com/icons/svg/3069/3069162.svg",
    descricao: ["descricao 1", "descricao 2", "descricao 3"],
    virado: true,
  },
  {
    id: 3,
    name: "plank",
    color: "#E984FA",
    imagem: "https://image.flaticon.com/icons/svg/3069/3069163.svg",
    descricao: ["descricao 1", "descricao 2", "descricao 3"],
    virado: true,
  },
  {
    id: 4,
    name: "burger",
    color: "#84FAAC",
    imagem: "https://image.flaticon.com/icons/svg/3069/3069169.svg",
    descricao: ["descricao 1", "descricao 2", "descricao 3"],
    virado: true,
  },

];

const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let movements = 0;
let winContador = 0;
let score = 0;
let pontuacao = 0;

const btnRegras = document.querySelector('#btn-regras');

const divRegras = document.querySelector('#regras');
window.onload = () => {
  // adiciona um event listener para exibir as regras quando o botão for clicado
  btnRegras.addEventListener('click', () => {
    divRegras.style.display = 'block';
  });

  // adiciona um event listener para esconder as regras quando o usuário clicar fora da caixa de regras
  document.addEventListener('click', (event) => {
    if (!event.target.closest('#regras') && divRegras.style.display === 'block') {
      divRegras.style.display = 'none';
    }
  });
}

function flipCard() {
  //this.classList.toggle('flip');
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

   if (!hasFlippedCard) {
     hasFlippedCard = true;
     firstCard = this;
     return;
    }
    secondCard = this;
    checkForMatch();
}
 
  //Conferindo se é igual

  function checkForMatch() {
    movements++;
    if (firstCard.dataset.nome === secondCard.dataset.nome) {
      winContador++;
      score += 10;
      disableCards();
      if (winContador == 4) {
        pontuacao = score;
        setTimeout(() => {
          document.querySelector('#vitoria').style.display = 'block'
        }, 1000);
      }
    } else {
      score -= 5;
      unflipCards();
    }
    updateScore();
  }
 
  //Desabilitando o clique nas cartas viradas

  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
  }
 
  //Virando as cartas erradas de volta

  function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');

      resetBoard();
    }, 1500);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  //Embaralhando cartas (IIFE) Vai ser executada assim que for lida

  function shuffle() {
    cards.forEach(card => {
      let ramdomPos = Math.floor(Math.random() * 8);
      card.style.order = ramdomPos;
    });
  }
  
  function updateScore() {
    const scoreElement = document.querySelector('#score');
    scoreElement.innerText = `Score: ${score}`;
  
    const finalScoreElement = document.querySelector('#pontuacao');
    finalScoreElement.innerText = `Sua pontuação foi: ${pontuacao}`;
  }
  
  shuffle();
  cards.forEach(card => card.addEventListener('click', flipCard));
  updateScore();