class DFA {
    constructor(structure){
        this.states = structure.states;
        this.alphabets = structure.alphabets;
        this.startingState = structure['start-state'];
        this.finalStates = structure['final-states'];
        this.transitions = structure.delta;
    };

    applyTransition(currentState, alphabet){
        return this.transitions[currentState][alphabet];
    };

    process(pattern){
        return pattern.split("").reduce((currentState, alphabet) => this.applyTransition(currentState, alphabet), this.startingState);
    };

    doesAccept(pattern){
        return this.finalStates.includes(this.process(pattern));
    };
};

module.exports = DFA;