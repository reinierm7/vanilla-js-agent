import { promises as fs } from 'fs';

class DocumentReaderTool {
    //blijkbaar is dit een functie die door de Agent aangeroepen kan worden om de interface van deze tool op te halen.
    static getDefinition() {
        return {
            name: 'read_document',
            description: 'Read and extract text content from a Request for Change (RFC) document. Supports .txt files.',
            parameters: {
                type: 'object',
                properties: {
                    filePath: {
                        type: 'string',
                        description: 'Path to the RFC document file'
                    }
                },
                required: ['filePath']
            }
        };
    }

        static async execute(args, state) {
            try {
                const content = await fs.readFile(args.filePath, 'utf-8');
                state.setDocument(content);

                return {
                    succes: true,
                    content: content,
                    message: `Successfully read document ( ${content.length} characters)`
                }
            } catch(error) {
                return {
                    succes: false,
                    error: error.message
                };
            }
        }
}

module.exports = DocumentReaderTool;