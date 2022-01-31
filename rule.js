export default class Rule{
    constructor() {
        this.statusPage = false
        this.buttonIn = {};
        this.buttonOut = {};
        this.rulePage ={};
        this.gamePage = {}
        this.keyboardPage ={}
        this.header = {}
        this.initRule()
    }


    initRule(){
        this.rulePage = document.querySelector('div.rule')
        this.buttonIn = document.querySelector('button.infoButton')
        this.gamePage = document.querySelector('div.game')
        this.keyboardPage = document.querySelector('div.container-cay-bord')
        this.header = document.querySelector('header.header')
        this.buttonOut = document.querySelector('.iconRuleHeader .fa-times')
       
        this.buttonIn.addEventListener('click', ()=>{
            this.statusPage = !this.statusPage;
            this.displayPage();
            console.log(this.gamePage)

        })

        this.buttonOut.addEventListener('click', ()=>{
                this.statusPage = !this.statusPage;
                this.displayPage();
                console.log(this.gamePage)
            }
        )
    }

    displayPage(){
        if(this.statusPage){
            this.rulePage.style.display = 'block'
            this.gamePage.style.display = 'none'
            this.keyboardPage.style.display = 'none'
            this.header.style.display = 'none'

        }

        if(!this.statusPage){
            this.rulePage.style.display = 'none'
            this.gamePage.style.display = 'block'
            this.keyboardPage.style.display = 'block'
            this.header.style.display = 'block'
        }
    }
}