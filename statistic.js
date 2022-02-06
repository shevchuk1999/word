export default class Statistic{
    constructor(massageHandler,statisticHandler) {
        this.message = ''
        this.buttonIn = {}
        this.buttonOut = {}
        this.statisticPopup = {}
        this.buttonShared = {}
        this.displayPlated = {}
        this.displayWin = {}
        this.displayCurrentStreak = {}
        this.displayMaxStreak = {}
        this.rowStatistic =[]
        this.massageHandler = massageHandler
        this.statisticHandler = statisticHandler
        this.statistic = null;
        this._initStates()
    }

    _initStates(){
        this.buttonOut = document.querySelector('#buttonOutPopup')
        this.statisticPopup = document.querySelector('#popUp')
        this.buttonIn = document.querySelector('#status')
        this.buttonShared = document.querySelector('#shareButton')

        this.displayPlated = document.querySelector('#played')
        this.displayWin = document.querySelector('#win')
        this.displayCurrentStreak = document.querySelector('#currentStreak')
        this.displayMaxStreak = document.querySelector('#betterStreak')
        this.statistic = this.statisticHandler();
        this._readAllRows();

        this.buttonIn.addEventListener('click', ()=>{
            this.statistic = this.statisticHandler();
            this._displayStatistics()
        })

        this.buttonOut.addEventListener('click', ()=>{
            this._hideStatistics()
        })

        this.buttonShared.addEventListener('click', ()=>{
            this._buffer(this.massageHandler())
        })
    
    }

    _readAllRows(){
        this.rowStatistic = Array.from(document.querySelectorAll('.evaluationStatistics'))
        this._prepareWievRows()
    }

    _prepareWievRows(){
        let index = 0

        this.rowStatistic.forEach(row =>{
            index+1 == this.statistic.currentStreak?
                row.style.backgroundColor = '#6AAA64':
                row.style.backgroundColor = 'dimgrey';
            row.style.maxWidth = '' + this.statistic.statisticRow[index].procent.toString() + '%'
            row.innerHTML = this.statistic.statisticRow[index].countWin.toString()
            index++;
        })
    }

    _buffer(message){
        navigator.clipboard.writeText(message)
            .then(() => {
                // якось відобразити що текс успішно пересланий в буфе в буфер
            })
            .catch(err => {
                console.log('Something went wrong', err);
            });
    }

    _displayStatistics(){
        this.statisticPopup.style.top = '50%'
        this.statisticPopup.style.left = '50%'
        this._prepareWievRows()
        this._renderDisplayStats()
    }

    _renderDisplayStats(){
        let states = this.statisticHandler()
        this.displayPlated.innerHTML = states.countGame;
        this.displayWin.innerHTML = ( '0' + states.procentWinGame).slice(-3)
        this.displayCurrentStreak.innerHTML = states.currentStreak
        this.displayMaxStreak.innerHTML = states.maxStreak
    }

    _hideStatistics(){
        this.statisticPopup.style.top = '-200%'
    }

    hiddenTimer(){
        let timer = document.querySelector('#timerContainer')
        timer.style.visibility = 'hidden'
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