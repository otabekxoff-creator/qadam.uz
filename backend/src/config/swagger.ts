import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Step.uz API',
      version: '1.0.0',
      description: 'O\'zbekiston yoshlari uchun karyera platformasi API documentation',
      contact: {
        name: 'Step.uz Team',
        email: 'info@step.uz',
        url: 'https://step.uz',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' 
          ? 'https://step-uz.onrender.com/api' 
          : 'http://localhost:5000/api',
        description: process.env.NODE_ENV === 'production' 
          ? 'Production server' 
          : 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT token authentication',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'User unique identifier',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
            },
            role: {
              type: 'string',
              enum: ['STUDENT', 'COMPANY', 'ADMIN'],
              description: 'User role',
            },
            isActive: {
              type: 'boolean',
              description: 'User account status',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Account creation date',
            },
          },
        },
        Student: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Student unique identifier',
            },
            firstName: {
              type: 'string',
              description: 'First name',
            },
            lastName: {
              type: 'string',
              description: 'Last name',
            },
            university: {
              type: 'string',
              description: 'University name',
            },
            major: {
              type: 'string',
              description: 'Major/Field of study',
            },
            gpa: {
              type: 'number',
              description: 'Grade Point Average',
            },
            skills: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Student skills',
            },
          },
        },
        Company: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Company unique identifier',
            },
            name: {
              type: 'string',
              description: 'Company name',
            },
            description: {
              type: 'string',
              description: 'Company description',
            },
            industry: {
              type: 'string',
              description: 'Industry type',
            },
            size: {
              type: 'string',
              enum: ['STARTUP', 'SMALL', 'MEDIUM', 'LARGE', 'ENTERPRISE'],
              description: 'Company size',
            },
            website: {
              type: 'string',
              format: 'uri',
              description: 'Company website',
            },
          },
        },
        Job: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Job unique identifier',
            },
            title: {
              type: 'string',
              description: 'Job title',
            },
            description: {
              type: 'string',
              description: 'Job description',
            },
            requirements: {
              type: 'string',
              description: 'Job requirements',
            },
            responsibilities: {
              type: 'string',
              description: 'Job responsibilities',
            },
            benefits: {
              type: 'string',
              description: 'Job benefits',
            },
            salary: {
              type: 'string',
              description: 'Salary range',
            },
            location: {
              type: 'string',
              description: 'Job location',
            },
            type: {
              type: 'string',
              enum: ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP', 'REMOTE', 'HYBRID'],
              description: 'Job type',
            },
            level: {
              type: 'string',
              enum: ['ENTRY_LEVEL', 'MID_LEVEL', 'SENIOR_LEVEL', 'EXECUTIVE'],
              description: 'Job level',
            },
            industry: {
              type: 'string',
              description: 'Industry',
            },
            skills: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Required skills',
            },
            isActive: {
              type: 'boolean',
              description: 'Job status',
            },
            viewsCount: {
              type: 'integer',
              description: 'Number of views',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Job creation date',
            },
          },
        },
        Startup: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Startup unique identifier',
            },
            name: {
              type: 'string',
              description: 'Startup name',
            },
            description: {
              type: 'string',
              description: 'Startup description',
            },
            problem: {
              type: 'string',
              description: 'Problem being solved',
            },
            solution: {
              type: 'string',
              description: 'Solution offered',
            },
            stage: {
              type: 'string',
              enum: ['IDEA', 'VALIDATION', 'MVP', 'GROWTH', 'SCALING'],
              description: 'Startup stage',
            },
            fundingNeeded: {
              type: 'number',
              description: 'Funding needed amount',
            },
            fundingCurrency: {
              type: 'string',
              enum: ['UZS', 'USD'],
              description: 'Funding currency',
            },
            status: {
              type: 'string',
              enum: ['DRAFT', 'PENDING', 'APPROVED', 'REJECTED', 'FUNDED', 'COMPLETED'],
              description: 'Startup status',
            },
            tags: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Startup tags',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Startup creation date',
            },
          },
        },
        Application: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Application unique identifier',
            },
            status: {
              type: 'string',
              enum: ['PENDING', 'REVIEWING', 'ACCEPTED', 'REJECTED', 'WITHDRAWN'],
              description: 'Application status',
            },
            coverLetter: {
              type: 'string',
              description: 'Cover letter',
            },
            resumeUrl: {
              type: 'string',
              format: 'uri',
              description: 'Resume URL',
            },
            notes: {
              type: 'string',
              description: 'Additional notes',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Application creation date',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
              description: 'Request success status',
            },
            message: {
              type: 'string',
              description: 'Error message',
            },
            errorCode: {
              type: 'string',
              description: 'Error code for programmatic handling',
            },
          },
        },
        Success: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
              description: 'Request success status',
            },
            message: {
              type: 'string',
              description: 'Success message',
            },
            data: {
              type: 'object',
              description: 'Response data',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Step.uz API Documentation',
  }));

  // JSON endpoint for programmatic access
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });
};

export default specs;
