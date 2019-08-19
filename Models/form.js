class Form {

    constructor() {
        this.themeNumber = '';
        this.itssRequestNumber = '';
        this.rppNumber = '';
        this.themeName = '';
        this.stack = '';
        this.customerType = '';
        this.initiativeSummary = '';
        this.scopeItems = '';
        this.keyBenefits = '';
        this.solutionAssumptions = '';
        this.estimator = '';
        this.effort = '';
        this.estimateInput = '';
        this.scope = '';
        this.assumptions = '';
    
    }

    setThemeNumber(themeNumber) {
        this.themeNumber = themeNumber;
    }

    setRppNumber(rppNumber) {
        this.rppNumber = rppNumber;
    }

    setThemeName(themeName) {
        this.themeName = themeName;
    }

    setStack(stack) {
        this.stack = stack;
    }

    setCustomerType(customerType) {
        this.customerType = customerType;
    }

    setInitiativeSummary(initiativeSummary) {
        this.initiativeSummary = initiativeSummary;
    }

    setScopeItems(scopeItems) {
        this.scopeItems = scopeItems;
    }

    setKeyBenefits(keyBenefits) {
        this.keyBenefits = keyBenefits;
    }

    setSolutionAssumptions(solutionAssumptions) {
        this.solutionAssumptions = solutionAssumptions;
    }

    setEstimator(estimator) {
        this.estimator = estimator;
    }

    setEffort(effort) {
        this.effort = effort;
    }

    setEstimateInput(estimateInput) {
        this.estimateInput = estimateInput;
    }

    setScope(scope) {
        this.scope = scope;
    }

    setAssumptions(assumptions) {
        this.assumptions = assumptions;
    }
}

module.exports = Form;