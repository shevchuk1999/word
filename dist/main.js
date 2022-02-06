/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
var myApp;
/******/
(() => { // webpackBootstrap
    /******/
    "use strict";
    /******/
    var __webpack_modules__ = ({

        /***/ "./apiClient.js":
        /*!**********************!*\
          !*** ./apiClient.js ***!
          \**********************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ WordApiClient)\n/* harmony export */ });\n/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data.js */ \"./data.js\");\n\r\n\r\nclass WordApiClient{\r\n    constructor(){\r\n        this._defaultPath = \"http://shevchukword.free.beeceptor.com/\"\r\n    }\r\n\r\n    getWordsWithFile(){\r\n        return _data_js__WEBPACK_IMPORTED_MODULE_0__.data.word;\r\n    }\r\n} \n\n//# sourceURL=webpack://myApp/./apiClient.js?");

            /***/
        }),

        /***/ "./aplication.js":
        /*!***********************!*\
          !*** ./aplication.js ***!
          \***********************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Application)\n/* harmony export */ });\n/* harmony import */ var _apiClient_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apiClient.js */ \"./apiClient.js\");\n/* harmony import */ var _seting_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./seting.js */ \"./seting.js\");\n/* harmony import */ var _clock_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./clock.js */ \"./clock.js\");\n\r\n\r\n\r\n\r\nconst LIFETIME_GAME = 1000 * 60 * 1  // 5 MIN\r\nconst NUMBER_OF_ATTEMPS = 5;\r\n\r\nclass Application {\r\n\r\n    constructor() {\r\n        this._clock = new _clock_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\r\n        this._curentWordIdnex = -1;\r\n        this._wordle = [\"cigar\", \"rebut\", \"sissy\", \"humph\", \"awake\", \"blush\", \"focal\", \"evade\", \"naval\"]\r\n        this.states = {\r\n            boardState: [],\r\n            evaluations: [],\r\n            rowIndex: 0, // drop\r\n            solution: null,\r\n            gameStatus: _seting_js__WEBPACK_IMPORTED_MODULE_1__.gameStatus.IN_PROGRESS,\r\n            lastPlayedTs: null, // drop // how many time sing\r\n            lastCompletedTs: null,\r\n            restoringFromLocalStorage: null, // drop\r\n        }\r\n\r\n        this.statesStatistic = {\r\n            rowsStatistic: {\r\n                0:{countWin: 0},\r\n                1:{countWin: 0},\r\n                2:{countWin: 0},\r\n                3:{countWin: 0},\r\n                4:{countWin: 0},},\r\n            loseGame: 0,\r\n            winGame: 0,\r\n            currentLine: 0,\r\n            bestLine: 0\r\n        }\r\n        this._init();\r\n    }\r\n\r\n    _init() {\r\n        if (localStorage.getItem(\"gameState\") == null) {\r\n            this._prepareLocalStore(this._curentWordIdnex);\r\n            localStorage.setItem(\"gameState\", JSON.stringify(this.states))\r\n            localStorage.setItem(\"gameStatisticStates\", JSON.stringify(this.statesStatistic))\r\n        } else {\r\n            this.states = JSON.parse(localStorage.getItem(\"gameState\"));\r\n            this._curentWordIdnex = this.states.boardState.length\r\n            \r\n        }\r\n\r\n        if(localStorage.getItem(\"gameStatisticStates\") != null){\r\n            this.statesStatistic = JSON.parse(localStorage.getItem(\"gameStatisticStates\"))\r\n        }\r\n\r\n        if(this.states.gameStatus != _seting_js__WEBPACK_IMPORTED_MODULE_1__.gameStatus.IN_PROGRESS){\r\n            this._clock.stratTimer(new Date(this.states.lastCompletedTs + LIFETIME_GAME))\r\n        }\r\n    }\r\n\r\n    _prepareLocalStore(indexWord) {\r\n        if (indexWord < 0) {\r\n            this._curentWordIdnex = 0;\r\n            this.states.solution = this._wordle[0];\r\n            this.states.rowIndex = 0\r\n            let dt = new Date();\r\n            this.states.lastPlayedTs = dt.getTime()\r\n            this.states.lastCompletedTs = dt.getTime();\r\n \r\n        } else {\r\n            this.states.solution = this._wordle[indexWord]\r\n            this._curentWordIdnex = this.states.boardState.count;\r\n        }\r\n\r\n    } \r\n\r\n    static build(){\r\n        var apiClient = new _apiClient_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n        var aplication = new Application();\r\n        let word = apiClient.getWordsWithFile();\r\n        aplication.setWords(word);\r\n\r\n        aplication.addHandlerAfterTicketClock(() => {aplication.startNewGame()});\r\n        return aplication;\r\n    }\r\n\r\n    addHeandlerForAllTickClock(func){\r\n        this._clock.addAllTickHeandler(func);\r\n    }\r\n\r\n    addHandlerAfterTicketClock(func){\r\n        this._clock.addAfterStopTimerHeandler(func)\r\n    }\r\n\r\n    getSharedResultMessage(){\r\n        let message = ''\r\n        this.states.evaluations.forEach(row =>{\r\n            message +='\\n'\r\n            row.forEach(position =>{\r\n                message += _seting_js__WEBPACK_IMPORTED_MODULE_1__.evaluation[position].icon\r\n            })\r\n        })\r\n        return message\r\n    }\r\n    \r\n\r\n    getCurrentGameStatus(){\r\n        return this.states.gameStatus;\r\n    }\r\n\r\n    gameІsStillLive(){\r\n        if(new Date(this.states.lastCompletedTs + LIFETIME_GAME) <=  new Date()){\r\n            return true;\r\n        }\r\n        return false;\r\n    }\r\n\r\n    startNewGame(){\r\n        this.states.solution =  this._wordle[Math.floor(Math.random() * this._wordle.length)];\r\n        this.states.rowIndex = 0;\r\n        this.states.boardState = [];\r\n        this.states.evaluations = [];\r\n        this.states.lastCompletedTs = new Date().getTime();\r\n        this.states.gameStatus = _seting_js__WEBPACK_IMPORTED_MODULE_1__.gameStatus.IN_PROGRESS;\r\n        localStorage.setItem('gameState', JSON.stringify(this.states))\r\n    }\r\n\r\n\r\n\r\n    setWords(words){\r\n        this._wordle = words;\r\n    }\r\n\r\n    GetRowIndex(){\r\n        return this.states.rowIndex;\r\n    }\r\n\r\n\r\n    wordsAreFilled() {\r\n        if (this.states.boardState.length >= NUMBER_OF_ATTEMPS) {\r\n            return true\r\n        }\r\n        return false\r\n    }\r\n\r\n    writeWords(word) {\r\n        if (!this.wordsAreFilled() && this.states.gameStatus == _seting_js__WEBPACK_IMPORTED_MODULE_1__.gameStatus.IN_PROGRESS) {\r\n            \r\n            let evaluations = this._evaluationWord(word);\r\n            this.states.evaluations.push(evaluations)\r\n            this.states.boardState.push(word);\r\n            this.states.lastCompletedTs = new Date().getTime();\r\n            let result = {\r\n                word : word,\r\n                rowIndex: this.states.rowIndex,\r\n                evaluations: evaluations,\r\n            }\r\n\r\n            if(this._isWin(word)){\r\n                this.states.gameStatus = _seting_js__WEBPACK_IMPORTED_MODULE_1__.gameStatus.WIN\r\n                this._clock.stratTimer(new Date(this.states.lastCompletedTs + LIFETIME_GAME))\r\n                this._setStatisticStateWenWin()\r\n            }\r\n            if(!this._isWin(word) && this.wordsAreFilled()){\r\n                this._clock.stratTimer(new Date(this.states.lastCompletedTs + LIFETIME_GAME))\r\n                this.states.gameStatus = _seting_js__WEBPACK_IMPORTED_MODULE_1__.gameStatus.FAIL\r\n                this.statesStatistic.loseGame += 1 ;\r\n            }\r\n            \r\n            this.states.rowIndex += 1;\r\n            localStorage.setItem('gameState', JSON.stringify(this.states))\r\n            localStorage.setItem('gameStatisticStates', JSON.stringify(this.statesStatistic))\r\n            return result;\r\n        }\r\n    }\r\n\r\n    _setStatisticStateWenWin(){\r\n        this.statesStatistic.rowsStatistic[this.states.rowIndex].countWin += 1\r\n        this.statesStatistic.winGame += 1\r\n        this.statesStatistic.currentLine = this.states.rowIndex + 1;\r\n        this._setBetterGame();\r\n    }\r\n\r\n    _setBetterGame(){\r\n        if(this.statesStatistic.bestLine > this.states.rowIndex+1){\r\n            this.statesStatistic.bestLine = this.states.rowIndex+1\r\n        }\r\n    }\r\n\r\n    getStatisticStates(){\r\n        let result = {\r\n            countGame : this.statesStatistic.loseGame + this.statesStatistic.winGame,\r\n            procentWinGame : (100 * this.statesStatistic.winGame / (this.statesStatistic.loseGame + this.statesStatistic.winGame)),\r\n            currentStreak : this.statesStatistic.currentLine,\r\n            maxStreak : this.statesStatistic.bestLine,\r\n            statisticRow : this._estimationStreak(this.statesStatistic.winGame)\r\n        }\r\n        return result\r\n    }\r\n\r\n    _estimationStreak(countGame){\r\n        let statisticRow = {\r\n            0:{ },\r\n            1:{ },\r\n            2:{ },\r\n            3:{ },\r\n            4:{ },\r\n        }\r\n        for (let i = 0; i < 5; i ++){\r\n            statisticRow[i].procent = (100 * this.statesStatistic.rowsStatistic[i].countWin / countGame)\r\n            statisticRow[i].countWin = (this.statesStatistic.rowsStatistic[i].countWin)\r\n        }\r\n        return statisticRow\r\n    }\r\n    \r\n    getAllWordsWithEvaluation(){\r\n        return this.states.boardState.map((word, index) => {\r\n            return {\r\n                word: word,\r\n                evaluations: this.states.evaluations[index],\r\n            }\r\n        });\r\n    }\r\n\r\n\r\n    _isWin(word){\r\n        if(this.states.solution.toLowerCase() == word ){\r\n            return true\r\n        }\r\n        return  false\r\n    }\r\n\r\n    _evaluationWord(word) {\r\n        let evaluations = [];\r\n        for (let i = 0; i < word.length; i++){\r\n            if(this._wordLetterIsIncCorrectPlace(word[i], i)) {\r\n                evaluations.push(_seting_js__WEBPACK_IMPORTED_MODULE_1__.evaluation.correct.value);\r\n            }\r\n            else if(this._wordLetterIsContainsInWord(word[i])) {\r\n                evaluations.push(_seting_js__WEBPACK_IMPORTED_MODULE_1__.evaluation.present.value);\r\n            }\r\n            else {\r\n                evaluations.push(_seting_js__WEBPACK_IMPORTED_MODULE_1__.evaluation.absent.value);\r\n            }\r\n        }\r\n\r\n        return evaluations;\r\n    }\r\n\r\n    _wordLetterIsContainsInWord(letter){\r\n        return this.states.solution.includes(letter);\r\n    }\r\n\r\n    _wordLetterIsIncCorrectPlace(letter, index){\r\n        return this.states.solution[index] == letter;\r\n    }\r\n\r\n     getColorWithMorePriority(currentButtonColor, collor){\r\n        if(currentButtonColor == undefined){\r\n            return collor;\r\n        }\r\n\r\n        let currentColorOrderPriority;\r\n        let colorOrderPriority;\r\n\r\n        for(var key in _seting_js__WEBPACK_IMPORTED_MODULE_1__.evaluation) {\r\n            if(_seting_js__WEBPACK_IMPORTED_MODULE_1__.evaluation[key].color == currentButtonColor){\r\n                currentColorOrderPriority = _seting_js__WEBPACK_IMPORTED_MODULE_1__.evaluation[key].order\r\n            }\r\n            if(_seting_js__WEBPACK_IMPORTED_MODULE_1__.evaluation[key].color == collor){\r\n                colorOrderPriority = _seting_js__WEBPACK_IMPORTED_MODULE_1__.evaluation[key].order\r\n            }\r\n        }\r\n\r\n        return (currentColorOrderPriority < colorOrderPriority) ? currentButtonColor : collor;\r\n    }\r\n\r\n}\r\n\n\n//# sourceURL=webpack://myApp/./aplication.js?");

            /***/
        }),

        /***/ "./clock.js":
        /*!******************!*\
          !*** ./clock.js ***!
          \******************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Clock)\n/* harmony export */ });\n\r\n\r\nclass Clock {\r\n    \r\n    constructor(){\r\n        this.timeInterval;\r\n        this.executeWithAllTick = [];\r\n        this.executeAfterStopTimer = [];\r\n    }\r\n\r\n    addAllTickHeandler(heandlers){\r\n        this.executeWithAllTick.push(heandlers);\r\n    }\r\n\r\n    addAfterStopTimerHeandler(heandlers){\r\n        this.executeAfterStopTimer.push(heandlers)\r\n    }\r\n\r\n    updateClock(endTime) {\r\n        var time = this._getTimeRemaining(endTime);\r\n\r\n        this.executeWithAllTick.forEach(withAllTick => withAllTick(time))\r\n\r\n        if (time.total <= 0) {\r\n            this.executeAfterStopTimer.forEach(afterStopTimerFunc => afterStopTimerFunc())\r\n            clearInterval(this.timeInterval);\r\n        }\r\n    }\r\n\r\n    stratTimer(endTime){\r\n        if(this.timeinterval != null){\r\n            clearInterval(this.timeinterval);\r\n        }\r\n        this.timeInterval = setInterval(() => \r\n        {\r\n            this.updateClock(endTime)\r\n        }, 1000)\r\n    }\r\n    \r\n    \r\n    _getTimeRemaining(endtime) {\r\n        let totoalTime = Date.parse(endtime) - Date.parse(new Date());\r\n        let seconds = Math.floor((totoalTime / 1000) % 60);\r\n        let minutes = Math.floor((totoalTime / 1000 / 60) % 60);\r\n        let hours = Math.floor((totoalTime / (1000 * 60 * 60)) % 24);\r\n        return {\r\n            'total': totoalTime,\r\n            'hours': hours,\r\n            'minutes': minutes,\r\n            'seconds': seconds\r\n        };\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack://myApp/./clock.js?");

            /***/
        }),

        /***/ "./controller.js":
        /*!***********************!*\
          !*** ./controller.js ***!
          \***********************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _aplication_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./aplication.js */ \"./aplication.js\");\n/* harmony import */ var _dashBoard_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dashBoard.js */ \"./dashBoard.js\");\n/* harmony import */ var _keyBoard_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./keyBoard.js */ \"./keyBoard.js\");\n/* harmony import */ var _rule_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rule.js */ \"./rule.js\");\n/* harmony import */ var _statistic_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./statistic.js */ \"./statistic.js\");\n/* harmony import */ var _seting_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./seting.js */ \"./seting.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nlet aplication = _aplication_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].build();\r\nlet dashBoard = new _dashBoard_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('div.field-row', 'div.tile');\r\n\r\nlet keyBord = new _keyBoard_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('button.enter-key', 'enter-key',\r\n    'button.enter-key', enterClicHandler,\r\n    backSpaceClicHandler, keyBoardClicHandler)\r\n\r\nlet rule = new _rule_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\r\nlet statistic = new _statistic_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"](() => aplication.getSharedResultMessage(),() => aplication.getStatisticStates());\r\n\r\naplication.addHeandlerForAllTickClock(statistic.initializeClock)\r\naplication.addHandlerAfterTicketClock(statistic.hiddenTimer)\r\naplication.addHandlerAfterTicketClock(()=> dashBoard.clearDasboard())\r\naplication.addHandlerAfterTicketClock(() => keyBord.clearBacground())\r\n\r\nstatistic.hiddenTimer();\r\n\r\n\r\nlet viewModel = {\r\n    curentWordIndex : aplication.GetRowIndex(),\r\n    currentWord : '',\r\n    statisticsSuchGame : {},\r\n};\r\nfunction StatisticHandler(){\r\n\r\n    return  aplication.getStatisticStates()\r\n}\r\ninitUI();\r\n\r\nfunction enterClicHandler() {\r\n    if (viewModel.currentWord.length > 4) {\r\n\r\n        if(aplication.getCurrentGameStatus() == _seting_js__WEBPACK_IMPORTED_MODULE_5__.gameStatus.IN_PROGRESS){\r\n            let wordEvaluations = aplication.writeWords(viewModel.currentWord);\r\n            \r\n            setBacgroudColorFromEvaluations(wordEvaluations)\r\n            viewModel.currentWord = ''\r\n            viewModel.curentWordIndex = aplication.GetRowIndex()\r\n\r\n        }else if(!aplication.gameІsStillLive()){\r\n            \r\n            viewModel.currentWord = ''\r\n            viewModel.curentWordIndex = aplication.GetRowIndex()\r\n        }\r\n    }\r\n}\r\n\r\nfunction backSpaceClicHandler(){\r\n    clearLastLetterFromCurrentWord();\r\n}\r\n\r\nfunction  keyBoardClicHandler(button){\r\n    addLetterInCurrentWord(button.innerHTML)\r\n}\r\n\r\nfunction initUI(){\r\n    aplication.getAllWordsWithEvaluation()\r\n    .forEach((wordEvaluation, rowIndex)=>{\r\n        wordEvaluation.word.split('').forEach((letter, cellIndex)=> {\r\n            setBackgroundColorAndValueForDashBoard(rowIndex, cellIndex, letter, _seting_js__WEBPACK_IMPORTED_MODULE_5__.evaluation[wordEvaluation.evaluations[cellIndex]].color)\r\n            setBackgroundColorForKeyBoard(letter,  _seting_js__WEBPACK_IMPORTED_MODULE_5__.evaluation[wordEvaluation.evaluations[cellIndex]].color)\r\n        });\r\n    });\r\n}\r\n\r\nfunction setBacgroudColorFromEvaluations(wordEvaluations){\r\n    for (let i = 0; i < wordEvaluations.evaluations.length; i++){\r\n        dashBoard.cellSetBacground(wordEvaluations.rowIndex, i, _seting_js__WEBPACK_IMPORTED_MODULE_5__.evaluation[wordEvaluations.evaluations[i]].color)\r\n        setBackgroundColorForKeyBoard(wordEvaluations.word[i], _seting_js__WEBPACK_IMPORTED_MODULE_5__.evaluation[wordEvaluations.evaluations[i]].color)\r\n    }\r\n}\r\n\r\nfunction addLetterInCurrentWord(letter)\r\n{\r\n    if(viewModel.currentWord.length < 5 ){\r\n        viewModel.currentWord += letter;\r\n        viewModel.curentWordIndex = aplication.GetRowIndex()\r\n        dashBoard.cellSetValue(viewModel.curentWordIndex, viewModel.currentWord.length-1, letter)\r\n    }\r\n}\r\n\r\nfunction clearLastLetterFromCurrentWord()\r\n{\r\n    viewModel.currentWord = viewModel.currentWord.slice(0, -1);\r\n    dashBoard.cellSetValue(viewModel.curentWordIndex, viewModel.currentWord.length, '')\r\n}\r\n\r\nfunction setBackgroundColorAndValueForDashBoard(rowIndex, cellIndex, letter, color){\r\n    dashBoard.cellSetValue(rowIndex, cellIndex, letter,  color)\r\n}\r\n\r\nfunction setBackgroundColorForKeyBoard(letter, color){\r\n    let currentButtonColor = keyBord.getButtonColor(letter);\r\n    let priorityColor = aplication.getColorWithMorePriority(currentButtonColor, color)\r\n    keyBord.setButtonColor(letter, priorityColor);\r\n}\r\n\r\n\n\n//# sourceURL=webpack://myApp/./controller.js?");

            /***/
        }),

        /***/ "./dashBoard.js":
        /*!**********************!*\
          !*** ./dashBoard.js ***!
          \**********************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ DashBoard)\n/* harmony export */ });\nclass DashBoard {\r\n\r\n    constructor(rowSelector, cellSelector){\r\n        this._rows = [];\r\n        this._rowSelector = rowSelector;\r\n        this._cellSelector = cellSelector;\r\n        this._readAllCell();\r\n    }\r\n\r\n    _readAllCell (){\r\n        var rows = document.querySelectorAll(this._rowSelector);\r\n        rows.forEach(row => {\r\n            this._rows.push(Array.from(row.querySelectorAll(this._cellSelector)));\r\n        })\r\n    }\r\n\r\n    cellSetValue(indexI, indexJ, value, backgroundCollor){\r\n        this._rows[indexI][indexJ].textContent = value;\r\n        if(backgroundCollor != undefined){\r\n            this.cellSetBacground(indexI, indexJ, backgroundCollor)\r\n        }\r\n    }\r\n\r\n    cellSetBacground(indexI, indexJ, color){\r\n        this._rows[indexI][indexJ].setAttribute(`style`, `background-color: ${color}`);\r\n    }\r\n\r\n    clearDasboard(){\r\n        debugger;\r\n        for (let i = 0; i < this._rows.length; i++) {\r\n            for (let j = 0; j < this._rows[i].length; j++) {\r\n                this._rows[i][j].textContent = \"\";\r\n                this._rows[i][j].setAttribute(`style`, `background-color: `);;\r\n              \r\n            }\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack://myApp/./dashBoard.js?");

            /***/
        }),

        /***/ "./data.js":
        /*!*****************!*\
          !*** ./data.js ***!
          \*****************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"data\": () => (/* binding */ data)\n/* harmony export */ });\nconst data = { word : [\"aahed\",\"aalii\",\"aargh\",\"aarti\",\"abaca\",\"abaci\",\r\n\"abacs\",\"abaft\",\"abaka\",\"abamp\",\"aband\",\"abash\",\"abask\",\"abaya\",\"abbas\",\r\n\"abbed\",\"abbes\",\"abcee\",\"abeam\",\"abear\",\"abele\",\"abers\",\"abets\",\"abies\",\r\n\"abler\",\"ables\",\"ablet\",\"ablow\",\"abmho\",\"abohm\",\"aboil\",\"aboma\",\"aboon\",\r\n\"abord\",\"abore\",\"abram\",\"abray\",\"abrim\",\"abrin\",\"abris\",\"absey\",\"absit\",\r\n\"abuna\",\"abune\",\"abuts\",\"abuzz\",\"abyes\",\"abysm\",\"acais\",\"acari\",\"accas\",\r\n\"accoy\",\"acerb\",\"acers\",\"aceta\",\"achar\",\"ached\",\"aches\",\"achoo\",\"acids\",\r\n\"acidy\",\"acing\",\"acini\",\"ackee\",\"acker\",\"acmes\",\"acmic\",\"acned\",\"acnes\",\r\n\"acock\",\"acold\",\"acred\",\"acres\",\"acros\",\"acted\",\"actin\",\"acton\",\"acyls\",\r\n\"adaws\",\"adays\",\"adbot\",\"addax\",\"added\",\"adder\",\"addio\",\"addle\",\"adeem\",\r\n\"adhan\",\"adieu\",\"adios\",\"adits\",\"adman\",\"admen\",\"admix\",\"adobo\",\"adown\",\r\n\"adoze\",\"adrad\",\"adred\",\"adsum\",\"aduki\",\"adunc\",\"adust\",\"advew\",\"adyta\",\r\n\"adzed\",\"adzes\",\"aecia\",\"aedes\",\"aegis\",\"aeons\",\"aerie\",\"aeros\",\"aesir\",\r\n\"afald\",\"afara\",\"afars\",\"afear\",\"aflaj\",\"afore\",\"afrit\",\"afros\",\"agama\",\r\n\"agami\",\"agars\",\"agast\",\"agave\",\"agaze\",\"agene\",\"agers\",\"agger\",\"aggie\",\r\n\"aggri\",\"aggro\",\"aggry\",\"aghas\",\"agila\",\"agios\",\"agism\",\"agist\",\"agita\",\r\n\"aglee\",\"aglet\",\"agley\",\"agloo\",\"aglus\",\"agmas\",\"agoge\",\"agone\",\"agons\",\r\n\"agood\",\"agria\",\"agrin\",\"agros\", \"agued\",\"agues\",\"aguna\",\"aguti\",\"aheap\",\r\n\"ahent\",\"ahigh\",\"ahind\",\"ahing\",\"ahint\",\"ahold\"]}\n\n//# sourceURL=webpack://myApp/./data.js?");

            /***/
        }),

        /***/ "./keyBoard.js":
        /*!*********************!*\
          !*** ./keyBoard.js ***!
          \*********************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ KeyBoard)\n/* harmony export */ });\nclass KeyBoard {\r\n    constructor(keySelector, enterSelector, backSpaceSelector,enterBoardHandler,backSpaceHandler,keyBoardHandler) {\r\n        this._keySelector = keySelector\r\n        this._enterSelector = enterSelector\r\n        this._backSpaceSelector = backSpaceSelector\r\n        this._enterBoardHandler = enterBoardHandler\r\n        this._backSpaceHandler = backSpaceHandler\r\n        this._keyBoardHandler = keyBoardHandler\r\n        this._buttons = [];\r\n        this._initKeyBoard();\r\n    }\r\n\r\n    _initKeyBoard() {\r\n        const keyboardEnter = document.querySelectorAll('[' + 'enter-key' + ']')\r\n        keyboardEnter.forEach(button => {\r\n                    button.addEventListener('click',this._enterBoardHandler)\r\n            }\r\n        )\r\n\r\n        const keyboardButtons = document.querySelectorAll('[data-key]')\r\n        keyboardButtons.forEach(button => {\r\n                this._buttons.push({\r\n                    button,\r\n                    value: button.textContent,\r\n                    color: undefined,\r\n                })\r\n                button.addEventListener('click', ()=>{\r\n                    this._keyBoardHandler(button);\r\n                 })\r\n            }\r\n        )\r\n\r\n        const backSpaceButton = document.querySelectorAll('[back-key]')\r\n        backSpaceButton.forEach(button =>{\r\n            button.addEventListener('click', this._backSpaceHandler)\r\n        })\r\n    }\r\n\r\n    getButtonColor(charValue){\r\n        this._getButton(charValue).color;\r\n    }\r\n\r\n    setButtonColor(value, color){\r\n        this._getButton(value).button.setAttribute(`style`, `background-color: ${color}`)\r\n        this._getButton(value).color = color;\r\n    }\r\n\r\n    clearBacground(){\r\n        this._buttons.forEach(item=>{\r\n            item.color = undefined;\r\n            item.button.setAttribute(`style`, `background-color: `)\r\n        })\r\n    }\r\n\r\n    _getButton(charValue){\r\n        return this._buttons.find(button => button.value == charValue)\r\n    }\r\n}\n\n//# sourceURL=webpack://myApp/./keyBoard.js?");

            /***/
        }),

        /***/ "./rule.js":
        /*!*****************!*\
          !*** ./rule.js ***!
          \*****************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Rule)\n/* harmony export */ });\nclass Rule{\r\n    constructor() {\r\n        this.statusPage = false\r\n        this.buttonIn = {};\r\n        this.buttonOut = {};\r\n        this.rulePage ={};\r\n        this.gamePage = {}\r\n        this.keyboardPage ={}\r\n        this.header = {}\r\n        this.initRule()\r\n    }\r\n\r\n\r\n    initRule(){\r\n        this.rulePage = document.querySelector('div.rule')\r\n        this.buttonIn = document.querySelector('button.infoButton')\r\n        this.gamePage = document.querySelector('div.game')\r\n        this.keyboardPage = document.querySelector('div.container-cay-bord')\r\n        this.header = document.querySelector('header.header')\r\n        this.buttonOut = document.querySelector('.iconRuleHeader .fa-times')\r\n       \r\n        this.buttonIn.addEventListener('click', ()=>{\r\n            this.statusPage = !this.statusPage;\r\n            this.displayPage();\r\n            console.log(this.gamePage)\r\n\r\n        })\r\n\r\n        this.buttonOut.addEventListener('click', ()=>{\r\n                this.statusPage = !this.statusPage;\r\n                this.displayPage();\r\n                console.log(this.gamePage)\r\n            }\r\n        )\r\n    }\r\n\r\n    displayPage(){\r\n        if(this.statusPage){\r\n            this.rulePage.style.display = 'block'\r\n            this.gamePage.style.display = 'none'\r\n            this.keyboardPage.style.display = 'none'\r\n            this.header.style.display = 'none'\r\n\r\n        }\r\n\r\n        if(!this.statusPage){\r\n            this.rulePage.style.display = 'none'\r\n            this.gamePage.style.display = 'block'\r\n            this.keyboardPage.style.display = 'block'\r\n            this.header.style.display = 'block'\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack://myApp/./rule.js?");

            /***/
        }),

        /***/ "./seting.js":
        /*!*******************!*\
          !*** ./seting.js ***!
          \*******************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"evaluation\": () => (/* binding */ evaluation),\n/* harmony export */   \"gameStatus\": () => (/* binding */ gameStatus)\n/* harmony export */ });\nconst evaluation = {\r\n    absent: { value: 'absent', color: 'dimgrey', icon: '⬜', order: 2},\r\n    present: { value: 'present', color: '#c9b458', icon: '🟨', order: 1},\r\n    correct: { value: 'correct', color: '#6aaa64', icon: '🟩', order: 0}\r\n}\r\n\r\nconst gameStatus = {\r\n    IN_PROGRESS: 0,\r\n    WIN: 1,\r\n    FAIL: 2,\r\n}\r\n\r\n\n\n//# sourceURL=webpack://myApp/./seting.js?");

            /***/
        }),

        /***/ "./statistic.js":
        /*!**********************!*\
          !*** ./statistic.js ***!
          \**********************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Statistic)\n/* harmony export */ });\nclass Statistic{\r\n    constructor(massageHandler,statisticHandler) {\r\n        this.message = ''\r\n        this.buttonIn = {}\r\n        this.buttonOut = {}\r\n        this.statisticPopup = {}\r\n        this.buttonShared = {}\r\n        this.displayPlated = {}\r\n        this.displayWin = {}\r\n        this.displayCurrentStreak = {}\r\n        this.displayMaxStreak = {}\r\n        this.rowStatistic =[]\r\n        this.massageHandler = massageHandler\r\n        this.statisticHandler = statisticHandler\r\n        this.statistic = null;\r\n        this._initStates()\r\n    }\r\n\r\n    _initStates(){\r\n        this.buttonOut = document.querySelector('#buttonOutPopup')\r\n        this.statisticPopup = document.querySelector('#popUp')\r\n        this.buttonIn = document.querySelector('#status')\r\n        this.buttonShared = document.querySelector('#shareButton')\r\n\r\n        this.displayPlated = document.querySelector('#played')\r\n        this.displayWin = document.querySelector('#win')\r\n        this.displayCurrentStreak = document.querySelector('#currentStreak')\r\n        this.displayMaxStreak = document.querySelector('#betterStreak')\r\n        this.statistic = this.statisticHandler();\r\n        this._readAllRows();\r\n\r\n        this.buttonIn.addEventListener('click', ()=>{\r\n            this.statistic = this.statisticHandler();\r\n            this._displayStatistics()\r\n        })\r\n\r\n        this.buttonOut.addEventListener('click', ()=>{\r\n            this._hideStatistics()\r\n        })\r\n\r\n        this.buttonShared.addEventListener('click', ()=>{\r\n            this._buffer(this.massageHandler())\r\n        })\r\n    \r\n    }\r\n\r\n    _readAllRows(){\r\n        this.rowStatistic = Array.from(document.querySelectorAll('.evaluationStatistics'))\r\n        this._prepareWievRows()\r\n    }\r\n\r\n    _prepareWievRows(){\r\n        let index = 0\r\n\r\n        this.rowStatistic.forEach(row =>{\r\n            index+1 == this.statistic.currentStreak?\r\n                row.style.backgroundColor = '#6AAA64':\r\n                row.style.backgroundColor = 'dimgrey';\r\n            row.style.maxWidth = '' + this.statistic.statisticRow[index].procent.toString() + '%'\r\n            row.innerHTML = this.statistic.statisticRow[index].countWin.toString()\r\n            index++;\r\n        })\r\n    }\r\n\r\n    _buffer(message){\r\n        navigator.clipboard.writeText(message)\r\n            .then(() => {\r\n                // якось відобразити що текс успішно пересланий в буфе в буфер\r\n            })\r\n            .catch(err => {\r\n                console.log('Something went wrong', err);\r\n            });\r\n    }\r\n\r\n    _displayStatistics(){\r\n        this.statisticPopup.style.top = '50%'\r\n        this.statisticPopup.style.left = '50%'\r\n        this._prepareWievRows()\r\n        this._renderDisplayStats()\r\n    }\r\n\r\n    _renderDisplayStats(){\r\n        let states = this.statisticHandler()\r\n        this.displayPlated.innerHTML = states.countGame;\r\n        this.displayWin.innerHTML = ( '0' + states.procentWinGame).slice(-3)\r\n        this.displayCurrentStreak.innerHTML = states.currentStreak\r\n        this.displayMaxStreak.innerHTML = states.maxStreak\r\n    }\r\n\r\n    _hideStatistics(){\r\n        this.statisticPopup.style.top = '-200%'\r\n    }\r\n\r\n    hiddenTimer(){\r\n        let timer = document.querySelector('#timerContainer')\r\n        timer.style.visibility = 'hidden'\r\n    }\r\n\r\n\r\n\r\n    initializeClock(time) {\r\n        let hoursSpan = document.querySelector('.hours');\r\n        let minutesSpan = document.querySelector('.minutes');\r\n        let secondsSpan = document.querySelector('.seconds');\r\n\r\n        hoursSpan.innerHTML = ('0' + time.hours).slice(-2);\r\n        minutesSpan.innerHTML = ('0' + time.minutes).slice(-2);\r\n        secondsSpan.innerHTML = ('0' + time.seconds).slice(-2);\r\n        let timer = document.querySelector('#timerContainer')\r\n        timer.style.visibility = 'visible'\r\n    }\r\n}\n\n//# sourceURL=webpack://myApp/./statistic.js?");

            /***/
        })

        /******/
    });
    /************************************************************************/
    /******/ 	// The module cache
    /******/
    var __webpack_module_cache__ = {};
    /******/
    /******/ 	// The require function
    /******/
    function __webpack_require__(moduleId) {
        /******/ 		// Check if module is in cache
        /******/
        var cachedModule = __webpack_module_cache__[moduleId];
        /******/
        if (cachedModule !== undefined) {
            /******/
            return cachedModule.exports;
            /******/
        }
        /******/ 		// Create a new module (and put it into the cache)
        /******/
        var module = __webpack_module_cache__[moduleId] = {
            /******/ 			// no module.id needed
            /******/ 			// no module.loaded needed
            /******/            exports: {}
            /******/
        };
        /******/
        /******/ 		// Execute the module function
        /******/
        __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
        /******/
        /******/ 		// Return the exports of the module
        /******/
        return module.exports;
        /******/
    }

    /******/
    /************************************************************************/
    /******/ 	/* webpack/runtime/define property getters */
    /******/
    (() => {
        /******/ 		// define getter functions for harmony exports
        /******/
        __webpack_require__.d = (exports, definition) => {
            /******/
            for (var key in definition) {
                /******/
                if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
                    /******/
                    Object.defineProperty(exports, key, {enumerable: true, get: definition[key]});
                    /******/
                }
                /******/
            }
            /******/
        };
        /******/
    })();
    /******/
    /******/ 	/* webpack/runtime/hasOwnProperty shorthand */
    /******/
    (() => {
        /******/
        __webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
        /******/
    })();
    /******/
    /******/ 	/* webpack/runtime/make namespace object */
    /******/
    (() => {
        /******/ 		// define __esModule on exports
        /******/
        __webpack_require__.r = (exports) => {
            /******/
            if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
                /******/
                Object.defineProperty(exports, Symbol.toStringTag, {value: 'Module'});
                /******/
            }
            /******/
            Object.defineProperty(exports, '__esModule', {value: true});
            /******/
        };
        /******/
    })();
    /******/
    /************************************************************************/
    /******/
    /******/ 	// startup
    /******/ 	// Load entry module and return exports
    /******/ 	// This entry module can't be inlined because the eval devtool is used.
    /******/
    var __webpack_exports__ = __webpack_require__("./controller.js");
    /******/
    myApp = __webpack_exports__;
    /******/
    /******/
})()
;