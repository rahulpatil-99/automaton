const assert = require("chai").assert;
const DFA = require( "../src/dfa.js");
const testData = require("./dfaTestData.js");

function runTest(){
    testData.forEach(language => {
        describe(language.name,()=>{
            let machiene = new DFA(language.tuple);
                language["pass-cases"].forEach(input => {
                    it(`${input || "empty"} should pass`,()=>{
                        assert.isTrue(machiene.doesAccept(input));
                    });
                });
            
                language["fail-cases"].forEach(input => {
                    it(`${input || "empty"} should fail`,()=>{
                        assert.isFalse(machiene.doesAccept(input));
                    });
                });
            
        });
    });
};


describe("DFA test",()=>{
    runTest();
});