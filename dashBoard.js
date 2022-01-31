export default class DashBoard {

    constructor(rowSelector, cellSelector){
        this._rows = [];
        this._rowSelector = rowSelector;
        this._cellSelector = cellSelector;
        this._readAllCell();
    }

    _readAllCell (){
        var rows = document.querySelectorAll(this._rowSelector);
        rows.forEach(row => {
            this._rows.push(Array.from(row.querySelectorAll(this._cellSelector)));
        })
    }

    cellSetValue(indexI, indexJ, value, backgroundCollor){
        this._rows[indexI][indexJ].textContent = value;
        if(backgroundCollor != undefined){
            this.cellSetBacground(indexI, indexJ, backgroundCollor)
        }
    }

    cellSetBacground(indexI, indexJ, color){
        this._rows[indexI][indexJ].setAttribute(`style`, `background-color: ${color}`);
    }

    clearDasboard(){
        debugger;
        for (let i = 0; i < this._rows.length; i++) {
            for (let j = 0; j < this._rows[i].length; j++) {
                this._rows[i][j].textContent = "";
                this._rows[i][j].setAttribute(`style`, `background-color: `);;
              
            }
        }
    }
}