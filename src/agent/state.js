class AgentState {
    constructor() {
        this.messages = [];
        this.documentContent = null;
        this.extractedRequirements = [];
        this.testCases = {
            postive: [],
            negative: [],
            edge: [],
            regression: []
        };
        this.azureSubmissions = []
    };

    addMessage(role, content){
        this.messages.push({role, content});
    }

    setDocument(content) {
        this.documentContent = content;
    }

    addRequirement(requirement){
        this.extractedRequirements.push(requirement);
    }

    addTestCase(type, testCase){
        if(this.testCases[type]){
            this.testCases[type].push(testCase);
        }
    }

    addSubmission(submissionResult) {
        this.azureSubmissions.push(submissionResult)
    }

    getContext(){
        return {
            hasDocument: !!this.documentContent,
            requirementsCount: this.extractedRequirements.length,
            testCasesCounts: Object.values(this.testCases).flat().length
        };
    }
}

module.exports = AgentState;