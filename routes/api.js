'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res, next)=>{
      const input = req.body
      if(!input.text || !input.locale){
        return res.json({
          error: "Required field(s) missing"
        })
      }
      next()
    }, (req, res, next) => {
      const input = req.body
      if(input.text.length === 0){
        return res.json({
          error: "No text to translate"
        })
      }
      next()
    }, (req, res, next)=>{
      const input = req.body
      if(input.locale !== "american-to-british" || input.locale !== "british-to-american"){
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
