# Workout API - Serverless Backend

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![AWS Lambda](https://img.shields.io/badge/AWS-Lambda-orange.svg)](https://aws.amazon.com/lambda/)
[![DynamoDB](https://img.shields.io/badge/AWS-DynamoDB-blue.svg)](https://aws.amazon.com/dynamodb/)
[![Clean Architecture](https://img.shields.io/badge/Architecture-Clean-green.svg)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

A production-ready serverless REST API for managing CrossFit workouts, athlete results, and personal records. Built with **Clean Architecture** principles, **TypeScript**, and **AWS Serverless services**.

## 🏗️ Architecture

This project follows **Clean Architecture** with clear separation of concerns:

```
┌─────────────────────────────────────────┐
│   Presentation Layer (API Gateway)      │
│   - Lambda Handlers                     │
│   - DTOs & Validation                   │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│   Application Layer                     │
│   - Use Cases                           │
│   - Business Orchestration              │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│   Domain Layer (Core)                   │
│   - Entities & Value Objects            │
│   - Business Rules                      │
│   - Repository Interfaces               │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│   Infrastructure Layer                  │
│   - DynamoDB Implementation             │
│   - AWS SDK Integration                 │
└─────────────────────────────────────────┘
```

### Key Architectural Decisions

- **Clean Architecture**: Domain layer is completely independent of frameworks and external services
- **Dependency Inversion**: High-level modules don't depend on low-level modules (Repository pattern)
- **Single Table Design**: DynamoDB optimized for access patterns with efficient queries
- **SOLID Principles**: Every class has a single responsibility, open for extension but closed for modification

## 🚀 Tech Stack

| Layer            | Technology                    | Why?                                      |
|------------------|-------------------------------|-------------------------------------------|
| Language         | TypeScript 5.3                | Type safety, better DX, industry standard |
| Runtime          | Node.js 20.x                  | Latest LTS, best Lambda cold start        |
| API              | AWS API Gateway               | Managed, scalable HTTP endpoint           |
| Compute          | AWS Lambda                    | Serverless, pay-per-request               |
| Database         | DynamoDB (Single Table)       | NoSQL, serverless, predictable latency    |
| IaC              | AWS SAM                       | Native AWS, simpler than CDK              |
| Testing          | Jest + ts-jest                | Industry standard, great TS support       |
| Validation       | Zod                           | TypeScript-first, runtime type safety     |
| Code Quality     | ESLint + Prettier             | Consistent style, catch errors early      |

## 📦 Project Structure

```
workout-api/
├── src/
│   ├── domain/                 # Business logic (no dependencies)
│   │   ├── entities/           # Core business objects
│   │   ├── value-objects/      # Immutable typed values
│   │   ├── repositories/       # Data access interfaces
│   │   └── services/           # Domain services
│   ├── application/            # Use cases (orchestration)
│   │   ├── use-cases/          # Application business rules
│   │   └── services/           # Application services
│   ├── infrastructure/         # External services implementation
│   │   ├── persistence/        # DynamoDB repositories
│   │   └── aws/                # AWS-specific code
│   ├── presentation/           # API layer
│   │   ├── handlers/           # Lambda function handlers
│   │   ├── middleware/         # Request/response processing
│   │   └── dto/                # Data transfer objects
│   └── shared/                 # Shared utilities
│       ├── errors/             # Custom error classes
│       └── utils/              # Helper functions
├── tests/
│   ├── unit/                   # Unit tests (isolated)
│   ├── integration/            # Integration tests
│   └── e2e/                    # End-to-end tests
├── template.yaml               # SAM template (IaC)
└── openapi.yaml                # API documentation
```

## 🎯 Domain Model

### Entities

- **Athlete**: User who performs workouts
- **WOD (Workout of the Day)**: Training session definition
- **Result**: Athlete's completion of a WOD
- **PR (Personal Record)**: Best performance for a specific movement/metric

### Key Business Rules

1. PRs are automatically calculated when recording a result
2. Results are immutable once created (append-only)
3. WODs can be queried by date efficiently
4. Athlete history maintains chronological order

## 🛠️ Development

### Prerequisites

- Node.js 20.x
- AWS CLI configured
- AWS SAM CLI
- Git

### Setup

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run linting
npm run lint

# Build TypeScript
npm run build

# Format code
npm run format
```

### Local Development

```bash
# Start local API
npm run local:start

# Invoke specific function
npm run local:invoke CreateWODFunction
```

### Testing Strategy

- **Unit Tests**: Domain entities, value objects, use cases (>90% coverage target)
- **Integration Tests**: Repository implementations with DynamoDB Local
- **E2E Tests**: Full API flows with SAM local

## 🚀 Deployment

```bash
# Build and deploy to AWS
npm run deploy

# Deploy to specific stage
sam build && sam deploy --config-env production
```

## 📊 DynamoDB Design

Single table design optimized for access patterns:

| Access Pattern                        | Key Structure                              |
|---------------------------------------|--------------------------------------------|
| Get athlete by ID                     | PK: `ATHLETE#<id>`, SK: `METADATA`         |
| Get athlete results                   | PK: `ATHLETE#<id>`, SK: begins_with(`RESULT#`) |
| Get athlete PRs                       | PK: `ATHLETE#<id>`, SK: begins_with(`PR#`) |
| Get WOD by date                       | PK: `WOD#<date>`, SK: `METADATA`           |
| Get all results for a WOD             | GSI: PK: `WOD#<date>`, SK: `RESULT#<athleteId>` |

## 🎓 Learning Outcomes

This project demonstrates:

- ✅ Clean Architecture in a real-world serverless application
- ✅ SOLID principles and design patterns
- ✅ Professional TypeScript with strict mode
- ✅ DynamoDB single table design
- ✅ Repository pattern with dependency inversion
- ✅ Comprehensive testing strategy
- ✅ Infrastructure as Code with AWS SAM
- ✅ Professional Git workflow and documentation

## 📝 API Documentation

See [openapi.yaml](./openapi.yaml) for full API specification.

### Key Endpoints

- `POST /wods` - Create a new workout
- `GET /wods/{date}` - Get workout by date
- `POST /results` - Record athlete result
- `GET /athletes/{id}/history` - Get athlete's workout history
- `GET /athletes/{id}/prs` - Get athlete's personal records

## 🤝 Contributing

This is a portfolio project, but feedback and suggestions are welcome!

## 📄 License

MIT

---

**Built with ❤️ using Clean Architecture and AWS Serverless**