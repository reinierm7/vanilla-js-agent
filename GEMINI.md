Goal is to build a vanilla AI agent in javascript. The Agent takes a request for change document and creates testcases from it.

High-Level Approach
Here's how I'd structure this agent system:
1. Core Agent Architecture
Since you're avoiding frameworks, you'll implement a simple agent loop:

State Management: Track the conversation and extracted data
Tool System: Define tools the agent can call
Reasoning Loop: Let Gemini decide which tools to use
Tool Execution: Execute tools and feed results back to Gemini

2. Components You'll Need
a) Gemini API Client

Use function calling (tool use) capability
Handle streaming or non-streaming responses
Parse tool calls from responses

b) Document Parser

Extract text from RFC documents (PDF, DOCX, or plain text)
Structure the information for analysis

c) Test Case Generator

Use Gemini to analyze requirements
Generate different test case types
Format test cases consistently

d) Azure DevOps Tool

Authenticate with Azure DevOps API
Create test cases and test suites
Handle API responses and errors

3. Recommended Project Structure
project/
├── src/
│   ├── agent/
│   │   ├── agent.js           # Main agent orchestrator
│   │   ├── state.js           # State management
│   │   └── toolExecutor.js    # Tool execution logic
│   ├── llm/
│   │   └── geminiClient.js    # Gemini API wrapper
│   ├── tools/
│   │   ├── documentReader.js  # Read & parse documents
│   │   ├── testCaseGenerator.js
│   │   └── azureDevOpsTool.js # Azure DevOps integration
│   ├── utils/
│   │   └── logger.js
│   └── index.js               # Entry point
├── config/
│   └── config.js              # API keys, endpoints
└── package.json
4. Implementation Flow
1. User provides RFC document
2. Agent reads document → extract requirements
3. Agent analyzes requirements → identify test scenarios
4. Agent checks with Human in the loop to verify approach and retreive feedback.
5. Agent handles feedback.
6. Agent generates test cases (positive, negative, edge, regression)
7. Agent formats test cases for Azure DevOps
8. Agent submits to Azure DevOps API
9. Agent reports results to user
10. Key Technical Decisions

Tool Calling Pattern:

Define tools as JSON schemas (Gemini's function calling format)
Let Gemini decide when to call tools
Parse tool calls and execute them
Feed results back to Gemini

State Management:

Use a simple object to track:

Original document
Extracted requirements
Generated test cases
Submission status



Error Handling:

Retry logic for API calls
Validation of tool outputs
Graceful degradation