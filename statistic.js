export default class Statistic{
    constructor(massageHandler) {
        this.message = ''
        this.buttonIn = {}
        this.buttonOut = {}
        this.statisticPopup ={}
        this.buttonShared ={}
        this.massageHandler = massageHandler
        this._initStates()

    }

    _initStates(){
        this.buttonOut = document.querySelector('#buttonOutPopup')
        this.statisticPopup = document.querySelector('#popUp')
        this.buttonIn = document.querySelector('#status')
        this.buttonShared = document.querySelector('#shareButton')

        this.buttonIn.addEventListener('click', ()=>{
            this._displayStatistics()
        })
        this.buttonOut.addEventListener('click', ()=>{
            this._hideStatistics()
        })
        this.buttonShared.addEventListener('click', ()=>{
            this._buffer(this.massageHandler())
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
    }
    _hideStatistics(){
        this.statisticPopup.style.top = '-200%'
    }

    hiddenTimer(){
        let timer = document.querySelector('#timerContainer')
        timer.style.visibility = 'hidden'
    }



    _initializeClock(time) {
        let clock = document.querySelector('#clock');
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