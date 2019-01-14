let util = require("./util");

class NFA{
    constructor(structure){
        this.states = structure.states;
        this.alphabets = structure.alphabets;
        this.startingState = structure['start-state'];
        this.finalStates = structure['final-states'];
        this.transitions = structure.delta;
    };

    transact(currentState, alphabet){
        return this.transitions[currentState] ? this.transitions[currentState][alphabet] || [] : [];
    };

    doesHaveEpsilon(states){
        return states.some(state => this.transitions[state] && Object.keys(this.transitions[state]).includes('e'));
    };

    applyEpsilon(currentStates, resultantStates){
        if(!this.doesHaveEpsilon(currentStates)) return resultantStates;
        let nextStates = currentStates.reduce((collection, state) => collection.concat(this.transact(state, 'e')),[]);
        if(util.doesHaveCommanElement(resultantStates,nextStates)) return resultantStates;
        return this.applyEpsilon(nextStates, resultantStates.concat(nextStates));
    };

    applyTransition(currentStates, alphabet){
        let nextStates = currentStates.reduce((result, state)=> result.concat(this.transact(state, alphabet)),[]);
        return this.applyEpsilon(nextStates,nextStates);
    };

    process(pattern){
        let startingStates = this.applyEpsilon([this.startingState], [this.startingState]);
        return pattern.split("")
        .reduce((currentStates, alphabet) => this.applyTransition(currentStates, alphabet),startingStates);
    };

    doesAccept(input){
        return util.doesHaveCommanElement(this.finalStates, this.process(input));
    };
};

module.exports = NFA;