import WordApiClient from './apiClient.js'
import {evaluation, gameStatus} from './seting.js'
import Clock from './clock.js'

const LIFETIME_GAME = 1000 * 60 * 1  // 5 MIN
const NUMBER_OF_ATTEMPS = 5;

export default class Application {

    constructor() {
        this._clock = new Clock();
        this._curentWordIdnex = -1;
        this._wordle = ["cigar", "rebut", "sissy", "humph", "awake", "blush", "focal", "evade", "naval"]
        this.states = {
            boardState: [],
            evaluations: [],
            rowIndex: 0, // drop
            solution: null,
            gameStatus: gameStatus.IN_PROGRESS,
            lastPlayedTs: null, // drop // how many time sing
            lastCompletedTs: null,
            restoringFromLocalStorage: null, // drop
        }
        this._init();
    }

    _init() {
        if (localStorage.getItem("gameState") == null) {
            this._prepareLocalStore(this._curentWordIdnex);
            localStorage.setItem("gameState", JSON.stringify(this.states))
        } else {
            this.states = JSON.parse(localStorage.getItem("gameState"));
            this._curentWordIdnex = this.states.boardState.length
        }

        if(this.states.gameStatus != gameStatus.IN_PROGRESS){
            this._clock.stratTimer(new Date(this.states.lastCompletedTs + LIFETIME_GAME))
        }
    }

    _prepareLocalStore(indexWord) {
        if (indexWord < 0) {
            this._curentWordIdnex = 0;
            this.states.solution = this._wordle[0];
            this.states.rowIndex = 0
            let dt = new Date();
            this.states.lastPlayedTs = dt.getTime()
            this.states.lastCompletedTs = dt.getTime();
 
        } else {
            this.states.solution = this._wordle[indexWord]
            this._curentWordIdnex = this.states.boardState.count;
        }

    } 

    static build(){
        var apiClient = new WordApiClient();
        var aplication = new Application();
        let word = apiClient.getWordsWithFile();
        aplication.setWords(word);

        aplication.addHandlerAfterTicketClock(() => {aplication.startNewGame()});
        return aplication;
    }

    addHeandlerForAllTickClock(func){
        this._clock.addAllTickHeandler(func);
    }

    addHandlerAfterTicketClock(func){
        this._clock.addAfterStopTimerHeandler(func)
    }

    getSharedResultMessage(){
        let message = ''
        this.states.evaluations.forEach(row =>{
            message +='\n'
            row.forEach(position =>{
                message += evaluation[position].icon
            })
        })
        return message
    }
    

    getCurrentGameStatus(){
        return this.states.gameStatus;
    }

    gameІsStillLive(){
        if(new Date(this.states.lastCompletedTs + LIFETIME_GAME) <=  new Date()){
            return true;
        }
        return false;
    }

    startNewGame(){
        this.states.solution =  this._wordle[Math.floor(Math.random() * this._wordle.length)];
        this.states.rowIndex = 0;
        this.states.boardState = [];
        this.states.evaluations = [];
        this.states.lastCompletedTs = new Date().getTime();
        this.states.gameStatus = gameStatus.IN_PROGRESS;
        localStorage.setItem('gameState', JSON.stringify(this.states))
    }



    setWords(words){
        this._wordle = words;
    }

    GetRowIndex(){
        return this.states.rowIndex;
    }


    wordsAreFilled() {
        if (this.states.boardState.length >= NUMBER_OF_ATTEMPS) {
            return true
        }
        return false
    }

    writeWords(word) {
        if (!this.wordsAreFilled() && this.states.gameStatus == gameStatus.IN_PROGRESS) {
            
            let evaluations = this._evaluationWord(word);
            this.states.evaluations.push(evaluations)
            this.states.boardState.push(word);
            this.states.lastCompletedTs = new Date().getTime();
            let result = {
                word : word,
                rowIndex: this.states.rowIndex,
                evaluations: evaluations,
            }

            if(this._isWin(word)){
                this.states.gameStatus = gameStatus.WIN
                this._clock.stratTimer(new Date(this.states.lastCompletedTs + LIFETIME_GAME))
            }
            if(!this._isWin(word) && this.wordsAreFilled()){
                this._clock.stratTimer(new Date(this.states.lastCompletedTs + LIFETIME_GAME))
                this.states.gameStatus = gameStatus.FAIL
            }
            
            this.states.rowIndex += 1;
            localStorage.setItem('gameState', JSON.stringify(this.states))
            return result;
        }
    }
    
    getAllWordsWithEvaluation(){
        return this.states.boardState.map((word, index) => {
            return {
                word: word,
                evaluations: this.states.evaluations[index],
            }
        });
    }


    _isWin(word){
        if(this.states.solution.toLowerCase() == word ){
            return true
        }
        return  false
    }

    _evaluationWord(word) {
        let evaluations = [];
        for (let i = 0; i < word.length; i++){
            if(this._wordLetterIsIncCorrectPlace(word[i], i)) {
                evaluations.push(evaluation.correct.value);
            }
            else if(this._wordLetterIsContainsInWord(word[i])) {
                evaluations.push(evaluation.present.value);
            }
            else {
                evaluations.push(evaluation.absent.value);
            }
        }
        
        return evaluations;
    }

    _wordLetterIsContainsInWord(letter){
        return this.states.solution.includes(letter);
    }

    _wordLetterIsIncCorrectPlace(letter, index){
        return this.states.solution[index] == letter;
    }


}
