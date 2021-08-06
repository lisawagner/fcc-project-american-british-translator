const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

const americanOnlyKeys = Object.keys(americanOnly)
const americanToBritishSpellingKeys = Object.keys(americanToBritishSpelling)
const britishToAmericanSpellingValues = Object.values(americanToBritishSpelling)
const americanToBritishTitlesKeys = Object.keys(americanToBritishTitles)
const americanToBritishTitlesValues = Object.values(americanToBritishTitles)
const britishOnlyKeys = Object.keys(britishOnly)

const americanExp = new RegExp(americanToBritishTitlesKeys.reduce((acc, key, index)=>{
    let result = acc.concat(`(${key})`)
    if(index !== americanToBritishTitlesKeys.length - 1){
        result = result.concat("|")
    }
    return result
}, americanToBritishSpellingKeys.reduce((acc, key)=>{
    return acc.concat(`(${key})|`)
}, americanOnlyKeys.reduce((acc, key)=>{
    return acc.concat(`(${key})|`)
}, ""))), "gi")

const britishExp = new RegExp(americanToBritishTitlesValues.reduce((acc, key, index)=>{
    let result = acc.concat(`(${key})`)
    if(index !== americanToBritishTitlesValues.length - 1){
        result = result.concat("|")
    }
    return result
}, britishToAmericanSpellingValues.reduce((acc, key)=>{
    return acc.concat(`(${key})|`)
}, britishOnlyKeys.reduce((acc, key)=>{
    return acc.concat(`(${key})|`)
}, ""))), "gi")

function getKeyFromValue(keys, obj, val){
    return keys.find(key=>obj[key] === val)
}

class Translator {
    translate(text, locale){
        switch(locale){
            case "american-to-british":
                let britishResult = text
                let americanExpResult
                while((americanExpResult = americanExp.exec(text)) !== null){
                    const match = americanExpResult[0]
                    const search = match.toLowerCase()
                    britishResult = britishResult.replace(match, `<span class="highlight">${americanOnly[search]}</span>` || `<span class="highlight">${americanToBritishSpelling[search]}</span>` || `<span class="highlight">${americanToBritishTitles[search]}</span>`)
                }
                const americanTimeExpResult = /\d{1,2}:\d{1,2}/g.exec(britishResult)
                if(americanTimeExpResult){
                    const match = americanTimeExpResult[0]
                    const replaced = match.replace(":", ".")
                    britishResult = britishResult.replace(match, `<span class="highlight">${replaced}</span>`)
                }
                if(britishResult === text){
                    return "Everything looks good to me!"
                }
                return britishResult
            case "british-to-american":
                let americanResult = text
                let britishExpResult
                while((britishExpResult = britishExp.exec(text)) !== null){
                    const match = britishExpResult[0]
                    const search = match.toLowerCase()
                    americanResult = americanResult.replace(match, `<span class="highlight">${britishOnly[search]}</span>` || `<span class="highlight">${getKeyFromValue(americanToBritishSpellingKeys, americanToBritishSpelling, search)}</span>` || `<span class="highlight">${getKeyFromValue(americanToBritishTitlesKeys, americanToBritishTitles, search)}</span>`)
                }
                const britishTimeExpResult = /\d{1,2}.\d{1,2}/g.exec(americanResult)
                if(britishTimeExpResult){
                    const match = britishTimeExpResult[0]
                    const replaced = match.replace(".", ":")
                    americanResult = americanResult.replace(match, `<span class="highlight">${replaced}</span>`)
                }
                if(americanResult === text){
                    return "Everything looks good to me!"
                }
                return americanResult
        }
    }
}

module.exports = Translator;