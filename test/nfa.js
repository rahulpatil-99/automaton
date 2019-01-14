const assert = require("chai").assert;
const NFA = require( "../src/nfa.js");
const testData = require("./nfaTestData.js");

function runTest(){
    testData.forEach(language => {
        describe(language.name,()=>{
            let machiene = new NFA(language.tuple);
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

describe("NFA test",()=>{
    runTest();
});