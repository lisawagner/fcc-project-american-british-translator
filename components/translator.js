const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

const americanOnlyKeys = Object.keys(americanOnly)
const americanToBritishSpellingKeys = Object.keys(americanToBritishSpelling)
const americanToBritishTitlesKeys = Object.keys(americanToBritishTitles)

const britishOnlyKeys = Object.keys(britishOnly)
const americanToBritishSpellingValues = Object.values(americanToBritishSpelling)
const americanToBritishTitlesValues = Object.values(americanToBritishTitles)

function getKeyFromValue(keys, obj, val){
    return keys.find(key=>obj[key] === val)
}

class Translator {
    translate(text, locale){
        switch(locale){
            case "american-to-british":{
                let britishResult = text
                const words = britishResult.split(" ")
                americanToBritishTitlesKeys.forEach(key=>{
                    if(britishResult.indexOf(key) !== -1){
                        const keySplit = key.split(" ")
                        let canReplace
                        if(keySplit.length === 1){
                            for(let i = 0; i < words.length; i++){
                                if(words[i] === key){
                                    canReplace = true
                                    break
                                }
                            }
                        }else{
                            canReplace = true
                        }
                        if(canReplace){
                            britishResult = britishResult.replace(key, `<span class="highlight">${americanToBritishTitles[key]}</span>`)
                        }
                    }
                })
                americanOnlyKeys.forEach(key=>{
                    if(britishResult.indexOf(key) !== -1){
                        const keySplit = key.split(" ")
                        let canReplace
                        if(keySplit.length === 1){
                            for(let i = 0; i < words.length; i++){
                                const filtered = words[i].replace(".", "")
                                if(filtered === key){
                                    canReplace = true
                                    break
                                }
                            }
                        }else{
                            canReplace = true
                        }
                        if(canReplace){
                            britishResult = britishResult.replace(key, `<span class="highlight">${americanOnly[key]}</span>`)
                        }
                    }
                })
                americanToBritishSpellingKeys.forEach(key=>{
                    if(britishResult.indexOf(key) !== -1){
                        const keySplit = key.split(" ")
                        let canReplace
                        if(keySplit.length === 1){
                            for(let i = 0; i < words.length; i++){
                                const filtered = words[i].replace(".", "")
                                if(filtered === key){
                                    canReplace = true
                                    break
                                }
                            }
                        }else{
                            canReplace = true
                        }
                        if(canReplace){
                            britishResult = britishResult.replace(key, `<span class="highlight">${americanToBritishSpelling[key]}</span>`)
                        }
                    }
                })
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
            }
            case "british-to-american":{
                let americanResult = text
                const words = americanResult.split(" ")
                americanToBritishTitlesValues.forEach(value=>{
                    if(americanResult.indexOf(value) !== -1){
                        const valueSplit = value.split(" ")
                        let canReplace
                        if(valueSplit.length === 1){
                            for(let i = 0; i < words.length; i++){
                                if(words[i] === value){
                                    canReplace = true
                                    break
                                }
                            }
                        }else{
                            canReplace = true
                        }
                        if(canReplace){
                            americanResult = americanResult.replace(value, `<span class="highlight">${getKeyFromValue(americanToBritishTitlesKeys, americanToBritishTitles, value)}</span>`)
                        }
                    }
                })
                britishOnlyKeys.forEach(key=>{
                    if(americanResult.indexOf(key) !== -1){
                        const keySplit = key.split(" ")
                        let canReplace
                        if(keySplit.length === 1){
                            for(let i = 0; i < words.length; i++){
                                const filtered = words[i].replace(".", "")
                                if(filtered === key){
                                    canReplace = true
                                    break
                                }
                            }
                        }else{
                            canReplace = true
                        }
                        if(canReplace){
                            americanResult = americanResult.replace(key, `<span class="highlight">${britishOnly[key]}</span>`)
                        }
                    }
                })
                americanToBritishSpellingValues.forEach(value=>{
                    if(americanResult.indexOf(value) !== -1){
                        const valueSplit = value.split(" ")
                        let canReplace
                        if(valueSplit.length === 1){
                            for(let i = 0; i < words.length; i++){
                                const filtered = words[i].replace(".", "")
                                if(filtered === value){
                                    canReplace = true
                                    break
                                }
                            }
                        }else{
                            canReplace = true
                        }
                        if(canReplace){
                            americanResult = americanResult.replace(value, `<span class="highlight">${getKeyFromValue(americanToBritishSpellingKeys, americanToBritishSpelling, value)}</span>`)
                        }
                    }
                })
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
}

module.exports = Translator;