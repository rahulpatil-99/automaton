class DFA {
    constructor(structure){
        this.states = structure.states;
        this.alphabets = structure.alphabets;
        this.startingState = structure['start-state'];
        this.finalStates = structure['final-states'];
        this.deltaFunctions = structure.delta;
    };

    getNextState(currentState, alphabet){
        return this.deltaFunctions[currentState][alphabet];
    };

    isAcceptable(state){
        return this.finalStates.includes(state);
    };

    getLastState(pattern){
        return pattern.split("").reduce((currentState, alphabet) => this.getNextState(currentState, alphabet), this.startingState);
    };

    doesAccept(pattern){
        return this.isAcceptable(this.getLastState(pattern));
    };
};

module.exports = DFA;