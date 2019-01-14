class NFA{
    constructor(structure){
        this.states = structure.states;
        this.alphabets = structure.alphabets;
        this.startingState = structure['start-state'];
        this.finalStates = structure['final-states'];
        this.deltaFunctions = structure.delta;
    };

    isAcceptable(states){
        return this.finalStates.some(finalState => states.includes(finalState));
    };

    isSubset(superset,subset){
        return subset.some(element => superset.includes(element));
    };

    transact(currentState, alphabet){
        return this.deltaFunctions[currentState] ? this.deltaFunctions[currentState][alphabet] || [] : [];
    };

    doesHaveEpsilon(states){
        return states.some(state => this.deltaFunctions[state] && Object.keys(this.deltaFunctions[state]).includes('e'));
    };

    applyEpsilon(currentStates, resultantStates){
        if(!this.doesHaveEpsilon(currentStates)) return resultantStates;
        let nextStates = currentStates.reduce((collection, state)=> collection.concat(this.transact(state, 'e')),[]);
        if(this.isSubset(resultantStates,nextStates)) return resultantStates;
        return this.applyEpsilon(nextStates, resultantStates.concat(nextStates));
        
    };

    getNextStates(currentStates, alphabet){
        let nextStates = currentStates.reduce((result, state)=> result.concat(this.transact(state, alphabet)),[]);
        return this.applyEpsilon(nextStates,nextStates);
    };

    process(pattern){
        let startingStates = this.applyEpsilon([this.startingState], [this.startingState]);
        return pattern.split("")
        .reduce((currentStates, alphabet) => this.getNextStates(currentStates, alphabet),startingStates);
    };

    doesAccept(input){
        return this.isAcceptable(this.process(input));
    };
};

module.exports = NFA;