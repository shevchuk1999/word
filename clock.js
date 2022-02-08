

export default class Clock {
    
    constructor(){
        this.timeInterval;
        this.executeWithAllTick = [];
        this.executeAfterStopTimer = [];
    }

    addAllTickHandler(heandlers){
        this.executeWithAllTick.push(heandlers);
    }

    addAfterStopTimerHeandler(heandlers){
        this.executeAfterStopTimer.push(heandlers)
    }

    updateClock(endTime) {
        var time = this._getTimeRemaining(endTime);

        this.executeWithAllTick.forEach(withAllTick => withAllTick(time))

        if (time.total <= 0) {
            this.executeAfterStopTimer.forEach(afterStopTimerFunc => afterStopTimerFunc())
            clearInterval(this.timeInterval);
        }
    }

    stratTimer(endTime){
        if(this.timeinterval != null){
            clearInterval(this.timeinterval);
        }
        this.timeInterval = setInterval(() => 
        {
            this.updateClock(endTime)
        }, 1000)
    }
    
    
    _getTimeRemaining(endtime) {
        let totoalTime = Date.parse(endtime) - Date.parse(new Date());
        let seconds = Math.floor((totoalTime / 1000) % 60);
        let minutes = Math.floor((totoalTime / 1000 / 60) % 60);
        let hours = Math.floor((totoalTime / (1000 * 60 * 60)) % 24);
        return {
            'total': totoalTime,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }
}

