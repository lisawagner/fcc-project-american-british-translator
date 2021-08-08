const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');

suite('Unit Tests', () => {
    const translator = new Translator()
    test("american to british #1", ()=>{
        assert.deepEqual(translator.translate("Mangoes are my favorite fruit.", "american-to-british"), "Mangoes are my <span class=\"highlight\">favourite</span> fruit.")
    })
    test("american to british #2", ()=>{
        assert.deepEqual(translator.translate("I ate yogurt for breakfast.", "american-to-british"), "I ate <span class=\"highlight\">yoghurt</span> for breakfast.")
    })
    test("american to british #3", ()=>{
        assert.deepEqual(translator.translate("We had a party at my friend's condo.", "american-to-british"), "We had a party at my friend's <span class=\"highlight\">flat</span>.")
    })
    test("american to british #4", ()=>{
        assert.deepEqual(translator.translate("Can you toss this in the trashcan for me?", "american-to-british"), "Can you toss this in the <span class=\"highlight\">bin</span> for me?")
    })
    test("american to british #5", ()=>{
        assert.deepEqual(translator.translate("The parking lot was full.", "american-to-british"), "The <span class=\"highlight\">car park</span> was full.")
    })
    test("american to british #6", ()=>{
        assert.deepEqual(translator.translate("Like a high tech Rube Goldberg machine.", "american-to-british"), "Like a high tech <span class=\"highlight\">Heath Robinson device</span>.")
    })
    test("american to british #7", ()=>{
        assert.deepEqual(translator.translate("To play hooky means to skip class or work.", "american-to-british"), "To <span class=\"highlight\">bunk off</span> means to skip class or work.")
    })
    test("american to british #8", ()=>{
        assert.deepEqual(translator.translate("No Mr. Bond, I expect you to die.", "american-to-british"), "No <span class=\"highlight\">Mr</span> Bond, I expect you to die.")
    })
    test("american to british #9", ()=>{
        assert.deepEqual(translator.translate("Dr. Grosh will see you now.", "american-to-british"), "<span class=\"highlight\">Dr</span> Grosh will see you now.")
    })
    test("american to british #10", ()=>{
        assert.deepEqual(translator.translate("Lunch is at 12:15 today.", "american-to-british"), "Lunch is at <span class=\"highlight\">12.15</span> today.")
    })
    test("british to american #1", ()=>{
        assert.deepEqual(translator.translate("We watched the footie match for a while.", "british-to-american"), "We watched the <span class=\"highlight\">soccer</span> match for a while.")
    })
    test("british to american #2", ()=>{
        assert.deepEqual(translator.translate("Paracetamol takes up to an hour to work.", "british-to-american"), "<span class=\"highlight\">Tylenol</span> takes up to an hour to work.")
    })
    test("british to american #3", ()=>{
        assert.deepEqual(translator.translate("First, caramelise the onions.", "british-to-american"), "First, <span class=\"highlight\">caramelize</span> the onions.")
    })
    test("british to american #4", ()=>{
        assert.deepEqual(translator.translate("I spent the bank holiday at the funfair.", "british-to-american"), "I spent the <span class=\"highlight\">public holiday</span> at the <span class=\"highlight\">carnival</span>.")
    })
    test("british to american #5", ()=>{
        assert.deepEqual(translator.translate("I had a bicky then went to the chippy.", "british-to-american"), "I had a <span class=\"highlight\">cookie</span> then went to the <span class=\"highlight\">fish-and-chip shop</span>.")
    })
    test("british to american #6", ()=>{
        assert.deepEqual(translator.translate("I've just got bits and bobs in my bum bag.", "british-to-american"), "I've just got <span class=\"highlight\">odds and ends</span> in my <span class=\"highlight\">fanny pack</span>.")
    })
    test("british to american #7", ()=>{
        assert.deepEqual(translator.translate("The car boot sale at Boxted Airfield was called off.", "british-to-american"), "The <span class=\"highlight\">swap meet</span> at Boxted Airfield was called off.")
    })
    test("british to american #8", ()=>{
        assert.deepEqual(translator.translate("Have you met Mrs Kalyani?", "british-to-american"), "Have you met <span class=\"highlight\">Mrs.</span> Kalyani?")
    })
    test("british to american #9", ()=>{
        assert.deepEqual(translator.translate("Prof Joyner of King's College, London.", "british-to-american"), "<span class=\"highlight\">Prof.</span> Joyner of King's College, London.")
    })
    test("british to american #10", ()=>{
        assert.deepEqual(translator.translate("Tea time is usually around 4 or 4.30.", "british-to-american"), "Tea time is usually around 4 or <span class=\"highlight\">4:30</span>.")
    })
    test("highlight translated #1", ()=>{
        assert.deepEqual(translator.translate("Mangoes are my favorite fruit.", "american-to-british"), "Mangoes are my <span class=\"highlight\">favourite</span> fruit.")
    })
    test("highlight translated #2", ()=>{
        assert.deepEqual(translator.translate("I ate yogurt for breakfast.", "american-to-british"), "I ate <span class=\"highlight\">yoghurt</span> for breakfast.")
    })
    test("highlight translated #3", ()=>{
        assert.deepEqual(translator.translate("We watched the footie match for a while.", "british-to-american"), "We watched the <span class=\"highlight\">soccer</span> match for a while.")
    })
    test("highlight translated #4", ()=>{
        assert.deepEqual(translator.translate("Paracetamol takes up to an hour to work.", "british-to-american"), "<span class=\"highlight\">Tylenol</span> takes up to an hour to work.")
    })
});
