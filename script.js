function shuffle(array) {
    let i, j, aux;

    for (i = 0; i < (array.length - 1); i++){
        j = Math.floor(Math.random() * (startedCards.length - 0) + 0);

        aux = array[i];
        array[i] = array[j];
        array[j] = aux;
    }
}
/**
 * Embaralhando as cartas
 */
const cards = [
    {
        id: 1,
        url: 'https://images.unsplash.com/photo-1500479694472-551d1fb6258d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        alt: 'Raposa'
    },
    {
        id: 2,
        url: 'https://images.unsplash.com/photo-1489084917528-a57e68a79a1e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        alt: 'Gato'
    },
    {
        id: 3,
        url: 'https://images.unsplash.com/photo-1493916665398-143bdeabe500?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80',
        alt: 'Cachorro'
    }
]

const startedCards = [];

cards.forEach(card => {
    startedCards.push(card);
    startedCards.push(card);
});

shuffle(startedCards);
/**
 * Renderizando cartas na tela
 */
const cardGroup = document.querySelector('.card-group');

startedCards.forEach(card => {
    const div = document.createElement('div');
    const img = document.createElement('img');
    
    img.setAttribute('src', card.url);
    img.setAttribute('alt', card.alt);

    div.appendChild(img);
    div.classList.add('card');
    div.classList.add('closed');
    div.setAttribute('data-id', card.id)
    div.addEventListener('click', selectCard);

    cardGroup.appendChild(div);
});


const selectedCards = [];

let round = 1;
/**
 * Selecionando carta
 */
function selectCard(event) {
    const card = event.target;
    const currentCardId = card.dataset.id;
    const selectedCardOnRound = selectedCards.findIndex((card) => card.round === round);

    selectedCards.push({ card: currentCardId, round });
    
    card.classList.remove('closed');
    card.classList.add('selected');

    checkPlayOfTheRound(selectedCardOnRound, currentCardId);   
}

/**
 * Validando jogada
 */
function checkPlayOfTheRound(selectedCardOnRound, currentCardId) {
    if (selectedCardOnRound != -1) {
        const cardMatch = selectedCards[selectedCardOnRound].card === currentCardId;

        if (cardMatch) {
            checkVictory();
        } else {
            closeUnmatchedCards();
        }

    }
}

function checkVictory() {
    // Verificar se ainda há cartas fechadas.
    const closedCards = document.querySelector('div.closed');
                
    if (!closedCards) {
        setTimeout(function() {
            alert("Você venceu!");
        }, 1000);
    }
    round++;
}

function closeUnmatchedCards() {
    setTimeout(function() {
        selectedCards
            .filter(card => card.round === round)
            .forEach(card => {
                const currentRoundCards = document.querySelector(`div[data-id="${card.card}"].selected`);
                currentRoundCards.classList.add('closed');
                currentRoundCards.classList.remove('selected');
            });
            round++;
    }, 1000)
}