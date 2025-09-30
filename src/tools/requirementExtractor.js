class RequirementExtractorTool {
    static getDefinition() {
        return {
            name: 'extract_requirements',
            description: 'Extract and structure key requirements from the RFC document',
            parameters: {
                type: 'object',
                properties: {
                    requirements: { 
                        type: 'array',
                        description: 'List of extracted requirements',
                        items: {
                            type: 'object',
                            properties: {
                                id: { type: 'string' },
                                title: { type: 'string' },
                                description: { type: 'string' },
                                priority: { type: 'string', enum: ['high', 'medium', 'low'] }
                            }
                        }
                    }
                },
                required: ['requirements']
            }
        }
    }

    static async execute(args, state){
        args.requirements.forEach(req => {
            state.addRequirement(req);
        });

        return {
            success: true,
            count: args.requirements.length,
            requirements: args.requirements
        }
    }
}

module.exports = RequirementExtractorTool;