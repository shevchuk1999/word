import Application from './aplication.js'
import DashBoard from './dashBoard.js'
import KeyBoard from "./keyBoard.js"
import Rule from './rule.js'
import Statistic from './statistic.js'
import {evaluation, gameStatus} from './seting.js'


let aplication = Application.build();
let dashBoard = new DashBoard('div.field-row', 'div.tile');

let keyBord = new KeyBoard(enterClicHandler, backSpaceClickHandler, keyBoardClickHandler)

let rule = new Rule();
let statistic = new Statistic(() => aplication.getSharedResultMessage(),() => aplication.getStatisticStates());

aplication.addHandlerForAllTickClock(statistic.initializeClock)
aplication.addHandlerAfterTicketClock(statistic.hiddenTimer)
aplication.addHandlerAfterTicketClock(()=> dashBoard.clearDasboard())
aplication.addHandlerAfterTicketClock(() => keyBord.clearBacground())

statistic.hiddenTimer();


let viewModel = {
    curentWordIndex : aplication.GetRowIndex(),
    currentWord : '',
    statisticsSuchGame : {},
};

initUI();
initStatistic();

function enterClicHandler() {
    if (viewModel.currentWord.length > 4) {

        if(aplication.getCurrentGameStatus() == gameStatus.IN_PROGRESS){
            let wordEvaluations = aplication.writeWords(viewModel.currentWord);
            
            setBacgroudColorFromEvaluations(wordEvaluations)
            viewModel.currentWord = ''
            viewModel.curentWordIndex = aplication.GetRowIndex()

        }else if(!aplication.gameІsStillLive()){
            
            viewModel.currentWord = ''
            viewModel.curentWordIndex = aplication.GetRowIndex()
        }
    }
}

function backSpaceClickHandler(){
    clearLastLetterFromCurrentWord();
}

function  keyBoardClickHandler(button){
    addLetterInCurrentWord(button.innerHTML)
}

function initUI(){
    aplication.getAllWordsWithEvaluation()
    .forEach((wordEvaluation, rowIndex)=>{
        wordEvaluation.word.split('').forEach((letter, cellIndex)=> {
            setBackgroundColorAndValueForDashBoard(rowIndex, cellIndex, letter, evaluation[wordEvaluation.evaluations[cellIndex]].color)
            setBackgroundColorForKeyBoard(letter,  evaluation[wordEvaluation.evaluations[cellIndex]].color)
        });
    });
}

function initStatistic(){
    document.querySelector('#status')
        .addEventListener('click', () => {
            statistic.displayStatistics(aplication.getStatisticStates())
        })

    document.querySelector('#buttonOutPopup')
        .addEventListener('click', () => {
            statistic.hideStatistics()

        })

    document.querySelector('#shareButton')
        .addEventListener('click', () => {
            statistic.buffer(aplication.getSharedResultMessage())
        })
}

function setBacgroudColorFromEvaluations(wordEvaluations){
    for (let i = 0; i < wordEvaluations.evaluations.length; i++){
        dashBoard.cellSetBacground(wordEvaluations.rowIndex, i, evaluation[wordEvaluations.evaluations[i]].color)
        setBackgroundColorForKeyBoard(wordEvaluations.word[i], evaluation[wordEvaluations.evaluations[i]].color)
    }
}

function addLetterInCurrentWord(letter)
{
    if(viewModel.currentWord.length < 5 ){
        viewModel.currentWord += letter;
        viewModel.curentWordIndex = aplication.GetRowIndex()
        dashBoard.cellSetValue(viewModel.curentWordIndex, viewModel.currentWord.length-1, letter)
    }
}

function clearLastLetterFromCurrentWord()
{
    viewModel.currentWord = viewModel.currentWord.slice(0, -1);
    dashBoard.cellSetValue(viewModel.curentWordIndex, viewModel.currentWord.length, '')
}

function setBackgroundColorAndValueForDashBoard(rowIndex, cellIndex, letter, color){
    dashBoard.cellSetValue(rowIndex, cellIndex, letter,  color)
}

function setBackgroundColorForKeyBoard(letter, color){
    let currentButtonColor = keyBord.getButtonColor(letter);
    let priorityColor = aplication.getColorWithMorePriority(currentButtonColor, color)
    keyBord.setButtonColor(letter, priorityColor);
}

