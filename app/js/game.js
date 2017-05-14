import {Deck} from './deck';
import {Player} from './player';

class Game {
    constructor(playerNames, acesHigh) {
        let cards = new Deck(acesHigh);

        this.players = [];
        this.players.push(new Player('Dealer'));
        this.cards = Deck.shuffle(cards);

        playerNames.forEach(function (name) {
            this.players.push(new Player(name));
        }, this);

    }

    start() {
        Deck.deal(this.players, 2, this.cards);
    }

    dealerTurn() {
        Deck.deal([this.players[0]], 1, this.cards);
    }

    playerTurn() {
        Deck.deal([this.players[1]], 1, this.cards);
    }
}

export { Game };
