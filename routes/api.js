'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res, next)=>{
      const input = req.body
      if((input.text === null || input.text === undefined) || !input.locale){
        return res.json({
          error: "Required field(s) missing"
        })
      }
      next()
    }, (req, res, next) => {
      const input = req.body
      if(input.text === ""){
        return res.json({
          error: "No text to translate"
        })
      }
      next()
    }, (req, res, next)=>{
      const input = req.body
      if(!/(american-to-british)|(british-to-american)/.test(input.locale)){
        return res.json({
          error: "Invalid value for locale field"
        })
      }
      next()
    }, (req, res)=>{
      const input = req.body
      res.json({
        text: input.text,
        translation: translator.translate(input.text, input.locale)
      })
    });
};
