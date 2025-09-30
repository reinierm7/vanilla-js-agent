import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiClient {

    // constructor voor op zetten gemini client met config object
    constructor(apiKey){
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({
            model: 'gemini-2.5-flash-lite',
            generationConfig: {
                temperature: 0.7
            }
        });
    }

    // functie voor agent prompten in nieuwe sessie met chat historie en tool objecten.
    async generateWithTools(messages, tools) {

        const functionDeclarations = tools.map(tool => ({
            name: tool.name,
            description: tool.description,
            parameters: tool.parameters
        }));

        //start een nieuwe chat sessie
        const chat = this.model.startChat({                             
            tools: [{ functionDeclarations}],
            history: messages.slice(0, -1).map(msg => ({                //laatste weglaten zodat het echt 'historie' is
                role: msg.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: msg.content }]
            }))
        });

        const lastMessage = messages[messages.length - 1];
        const result = await chat.sendMessage(lastMessage.content);
        const response = result.response;

        return this.parseResponse(response);
    }

    parseResponse(response) {
        const functionCalls = response.functionCalls();

        if(functionCalls && functionCalls.length > 0){
            return {
                type: 'tool_calls',
                toolCalls: functionCalls.map(fc => ({
                    name: fc.name,
                    arguments: fc.args
                }))
            };
        }

        return {
            type: 'text',
            content: response.text()
        };
    }
}


module.exports = GeminiClient;