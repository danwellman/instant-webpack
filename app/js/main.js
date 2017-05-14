import '../scss/imports.scss'
import angular from 'angular'
import { Game } from './game'

angular.module('blackjack', []);
angular.module('blackjack').controller('gameCtrl', gameCtrl);

gameCtrl.$inject = ['$scope'];

function gameCtrl($scope) {
    $scope.gameStarted = false;
    $scope.acesHigh = false;

    let blackjack;

    $scope.start = function () {
        if ($scope.playerName) {
            blackjack = new Game([$scope.playerName], $scope.acesHigh);
            blackjack.start();

            $scope.gameStarted = true;
            $scope.dealer = blackjack.players[0];
            $scope.player = blackjack.players[1];
        } else {
            $scope.player.name.$setTouched();
        }
    };

    $scope.stick = function () {
        while (blackjack.players[0].score < 17) {
            blackjack.dealerTurn();
        }

        if (blackjack.players[0].score > 21) {
            $scope.finishMessage = `The dealer went bust! You won ${blackjack.players[1].name}!`;
        } else {
            $scope.finishMessage = (blackjack.players[0].score < blackjack.players[1].score) ?
            `Congratulations ${blackjack.players[1].name}, you beat the dealer! Success is its own reward.` :
            (blackjack.players[0].score === blackjack.players[1].score) ?
                `I'll give you the benefit of the doubt ${blackjack.players[1].name}, let's say you won that round` :
                `Bad luck ${blackjack.players[1].name}, you lose.`;
        }

        $scope.gameEnded = true;
    };

    $scope.hitMe = function () {
        blackjack.playerTurn();

        if (blackjack.players[1].score > 21) {
            $scope.gameEnded = true;

            $scope.finishMessage = `It's bad news ${blackjack.players[1].name}, you went bust!`;
        }
    };

    $scope.toggle = function () {
        $scope.acesHigh = !$scope.acesHigh;
    };

    $scope.restart = function () {
        $scope.gameEnded = false;
        $scope.finishMessage = '';

        $scope.start();
    };

    $scope.quit = function () {
        $scope.gameStarted = false;
        $scope.acesHigh = false;
        $scope.gameEnded = false;
        $scope.playerName = '';
        $scope.finishMessage = '';
    };
}
