import {Card} from './card';

class Deck {
    constructor(acesHigh) {
        const COLORS = ['Black', 'Red'];
        const SUITS = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];
        const NAMES = ['Ace', 'Jack', 'Queen', 'King'];
        const VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];

        let cards = [];

        SUITS.forEach(function (suit, suitIndex) {

            if (acesHigh) {
                VALUES.splice(0, 1, 11);
            }

            let faceCount = 0;

            VALUES.forEach(function (value) {
                let color = (suitIndex === 0 || suitIndex === 3) ? COLORS[0] : COLORS[1];
                let name;

                if (value === 1 || value === 11) {
                    name = NAMES[0];
                } else if (value === 10 && faceCount === 0) {
                    faceCount++;
                } else if (value === 10 && faceCount === 1) {
                    name = NAMES[1];
                    faceCount++;
                } else if (value === 10 && faceCount === 2) {
                    name = NAMES[2];
                    faceCount++;
                } else if (value === 10 && faceCount === 3) {
                    name = NAMES[3];
                    faceCount = 0;
                }

                let card = new Card(color, suit, value, name);
                cards.push(card);
            });
        });

        return cards;
    }

    static shuffle(deck) {
        for (let x = deck.length; x; x--) {
            let y = Math.floor(Math.random() * x);
            [deck[x - 1], deck[y]] = [deck[y], deck[x - 1]];
        }
        return deck;
    }

    static deal(players, numberOfCards, deck) {
        let count = 0;
        while (count < numberOfCards) {
            count++;

            players.forEach(function (player) {
                let newCard = deck.shift();
                player.hand.push(newCard);
                player.score += newCard.value;
            });
        }
    }
}

export { Deck };
