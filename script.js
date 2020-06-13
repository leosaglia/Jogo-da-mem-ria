function shuffle(array) {
    let i, j, aux;

    for (i = 0; i < (array.length - 1); i++){
        j = Math.floor(Math.random() * (startedCards.length - 0) + 0);

        aux = array[i];
        array[i] = array[j];
        array[j] = aux;
    }
}

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
const selectedCards = [];
let round;

function newGame() {
    const cardGroup = document.querySelector('.card-group');
    round = 1;

    if (startedCards.length > 0 || selectedCards.length > 0) {
        while(startedCards.length > 0) {
            startedCards.pop();
        }

        while(selectedCards.length > 0) {
            selectedCards.pop();
        }

        const modal = document.querySelector('.modal');
        modal.classList.add('hide');

        cardGroup.innerHTML = '';
    } 

    cards.forEach(card => {
        startedCards.push(card);
        startedCards.push(card);
    });
    
    shuffle(startedCards);
     
    displayCards(cardGroup);
}

newGame();

function displayCards(cardGroup){
    startedCards.forEach(card => {
        const div = document.createElement('div');
        const img = document.createElement('img');
        
        img.setAttribute('src', card.url);
        img.setAttribute('alt', card.alt);
    
        div.appendChild(img);
        div.classList.add('card');
        div.setAttribute('data-id', card.id)
        div.addEventListener('click', selectCard);
    
        cardGroup.appendChild(div);
    });
    
    (() => {
        setTimeout(() => {
            const cards = document.querySelectorAll('.card');
    
        cards.forEach(card => {
            card.classList.add('closed');
        })
        }, 700)
    })()
}

function selectCard(event) {
    const card = event.target;
    const currentCardId = card.dataset.id;
    const selectedCardOnRound = selectedCards.findIndex((card) => card.round === round);

    selectedCards.push({ card: currentCardId, round });
    
    card.classList.add('spin');

    setTimeout(() => {
        card.classList.remove('spin');
        card.classList.remove('closed');
        card.classList.add('selected');
    
        checkPlayOfTheRound(selectedCardOnRound, currentCardId);  
    }, 470); 
    
    
}

function checkPlayOfTheRound(selectedCardOnRound, currentCardId) {
    if (selectedCardOnRound != -1) {
        const cardMatch = selectedCards[selectedCardOnRound].card === currentCardId;

        if (cardMatch) {
            checkEndGame();
        } else {
            closeUnmatchedCards();
        }

    }
}

function checkEndGame() {
    // Verificar se ainda há cartas fechadas.
    const closedCards = document.querySelector('div.closed');
                
    if (!closedCards) {
        const modal = document.querySelector('.modal');
        setTimeout(function() {
            modal.classList.remove('hide');
        }, 500);
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
