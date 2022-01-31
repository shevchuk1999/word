import Application from './aplication.js'
import DashBoard from './dashBoard.js'
import KeyBoard from "./keyBoard.js"
import Rule from './rule.js'
import Statistic from './statistic.js'
import {evaluation, gameStatus} from './seting.js'


let aplication = Application.build();
let dashBoard = new DashBoard('div.field-row', 'div.tile');

let keyBord = new KeyBoard('button.enter-key', 'enter-key',
    'button.enter-key', enterClicHandler,
    backSpaceClicHandler, keyBoardClicHandler)

let rule = new Rule();
let statistic = new Statistic(() => aplication.getSharedResultMessage());

aplication.addHeandlerForAllTickClock(statistic._initializeClock)
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

function backSpaceClicHandler(){
    clearLastLetterFromCurrentWord();
}

function  keyBoardClicHandler(button){
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
    let curentButtonColor = keyBord.getButtonColor(letter);
    let priorityColor = getColorWithMorePriority(curentButtonColor, color)
    keyBord.setButtonColor(letter, priorityColor);
}

function getColorWithMorePriority(currentButtonColor, collor){
    if(currentButtonColor == undefined){
        return collor;
    }

    let currentColorOrderPriority;
    let colorOrderPriority;

    for(var key in evaluation) {
        if(evaluation[key].color == currentButtonColor){
            currentColorOrderPriority = evaluation[key].order
        }
        if(evaluation[key].color == collor){
            colorOrderPriority = evaluation[key].order
        }
    }

    return (currentColorOrderPriority < colorOrderPriority) ? currentButtonColor : collor;
}
