import {data} from './data.js'

export default class WordApiClient{
    constructor(){
        this._defaultPath = "http://shevchukword.free.beeceptor.com/"
    }

    getWordsWithFile(){
        return data.word;
    }
} 