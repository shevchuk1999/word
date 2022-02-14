export default class Statistic{
    constructor() {
        this.statisticPopup = {}
        this.displayPlated = {}
        this.displayWin = {}
        this.displayCurrentStreak = {}
        this.displayMaxStreak = {}
        this.rowStatistic =[]
        this._initStates()
    }

    _initStates(){
        this.statisticPopup = document.querySelector('#popUp')
        this.displayPlated = document.querySelector('#played')
        this.displayWin = document.querySelector('#win')
        this.displayCurrentStreak = document.querySelector('#currentStreak')
        this.displayMaxStreak = document.querySelector('#betterStreak')
        this._readAllRows();

    }

    _readAllRows(){
        this.rowStatistic = Array.from(document.querySelectorAll('.evaluationStatistics'))
    }

    _prepareWievRows(states){
        this.rowStatistic.forEach((row,index) =>{
            index+1 == states.currentStreak?
                row.style.backgroundColor = '#6AAA64':
                row.style.backgroundColor = 'dimgrey';
            row.style.maxWidth = '' + states.statisticRow[index].procent.toString() + '%'
            row.innerHTML = states.statisticRow[index].countWin.toString()
        })
    }

    buffer(message){
        navigator.clipboard.writeText(message)
            .then(() => {
                // якось відобразити що текс успішно пересланий в буфе в буфер
            })
            .catch(err => {
                console.log('Something went wrong', err);
            });
    }

    displayStatistics(states){
        this.statisticPopup.style.top = '50%'
        this.statisticPopup.style.left = '50%'
        this._prepareWievRows(states)
        this._renderDisplayStats(states)
    }

    _renderDisplayStats(states){
        this.displayPlated.innerHTML = states.countGame;
        this.displayWin.innerHTML = ( '' + states.procentWinGame).slice(0,4)
        this.displayCurrentStreak.innerHTML = states.currentStreak
        this.displayMaxStreak.innerHTML = states.maxStreak
    }

    hideStatistics(){
        this.statisticPopup.style.top = '-200%'
    }

    hiddenTimer(){
        document.querySelector('#timerContainer')
        .style.visibility = 'hidden'
    }

    initializeClock(time) {
        let hoursSpan = document.querySelector('.hours');
        let minutesSpan = document.querySelector('.minutes');
        let secondsSpan = document.querySelector('.seconds');

        hoursSpan.innerHTML = ('0' + time.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + time.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + time.seconds).slice(-2);
        let timer = document.querySelector('#timerContainer')
        timer.style.visibility = 'visible'
    }
}