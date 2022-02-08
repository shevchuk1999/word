export default class KeyBoard {
    constructor(enterBoardHandler,backSpaceHandler,keyBoardHandler) {
        this._enterBoardHandler = enterBoardHandler
        this._backSpaceHandler = backSpaceHandler
        this._keyBoardHandler = keyBoardHandler
        this._buttons = [];
        this._initKeyBoard();
    }

    _initKeyBoard() {
        const keyboardEnter = document.querySelectorAll('[' + 'enter-key' + ']')
        keyboardEnter.forEach(button => {
                    button.addEventListener('click',this._enterBoardHandler)
            }
        )

        const keyboardButtons = document.querySelectorAll('[data-key]')
        keyboardButtons.forEach(button => {
                this._buttons.push({
                    button,
                    value: button.textContent,
                    color: undefined,
                })
                button.addEventListener('click', ()=>{
                    this._keyBoardHandler(button);
                 })
            }
        )

        const backSpaceButton = document.querySelectorAll('[back-key]')
        backSpaceButton.forEach(button =>{
            button.addEventListener('click', this._backSpaceHandler)
        })
    }

    getButtonColor(charValue){
        return  this._getButton(charValue).color;
    }

    setButtonColor(value, color){
        this._getButton(value).button.setAttribute(`style`, `background-color: ${color}`)
        this._getButton(value).color = color;
    }

    clearBacground(){
        this._buttons.forEach(item=>{
            item.color = undefined;
            item.button.setAttribute(`style`, `background-color: `)
        })
    }

    _getButton(charValue){
        return this._buttons.find(button => button.value == charValue)
    }
}