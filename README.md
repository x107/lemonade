
# Lemonade Service Request App

Simple app for creating simple service requests.

# Setup Locally
### Prerequisite
- Setup up aws profile locally with `AmplifyBackendDeployFullAccess` policy

### Run Commands
```
git clone https://github.com/x107/lemonade.git

npm install

# Start amplify sandbox
npx ampx sandbox # or npx ampx sandbox --profile=[profile]

# Start local server
npm run dev

# Should now be able to visit localhost:3000
```

# Technologies Used
- Nuxt Framework
- Amplify
- - Cognito Auth
  - S3 Storage
  - DynamoDB with AppSync

![image](https://github.com/x107/lemonade/assets/12855624/dece8806-40e3-4dbf-8911-fb5673f38c13)


# Project Structure

```
.
├── assets/
│   └── css/
│       └── main.css
├── components/
│   ├── card/
│   │   └── ServiceRequest.vue
│   ├── container/
│   │   └── PageWithBg.vue
│   ├── form/
│   │   └── CreateServiceRequest.vue
│   ├── table/
│   │   └── ListServiceRequest.vue
│   └── AmplifyAuthenticator.vue
│   └── Header.vue
│   └── LemonadeDefinition.vue
├── composables/
│   └── useAuth.ts
│   └── useCreateServiceRequest.ts
│   └── useListServiceRequest.ts
│   └── useStorage.ts
├── layouts/
│   └── default.vue
├── models/
│   └── ServiceRequest.ts
├── pages/
│   ├── requests/
│   │   └── create.vue
│   └── index.vue
│   └── login.vue
├── plugins/
│   └── 01.amplifyApis.client.ts
│   └── 02.amplifyApis.server.ts
│   └── 02.authRedirects.ts
└── server/

```

# Key Concepts and Considerations

### Reducing Dependency Using Composables with Data Contracts/Abstraction

To avoid tightly coupling Nuxt code with Amplify APIs, data contracts `/models/ServiceRequest.ts` are used inconjuction with composables for handling interactions between frontend components and data models, aswell as interfacing with storage and auth. While approach provides a clear interface between the components and Amplify, and enhances maintainability, the size of the codebase increases.

![image](https://github.com/x107/lemonade/assets/12855624/73fca026-8eb9-4f01-b787-7968b084e9d5)


# Server Side Route Protection
Routes are protected on the server level using global middlewares(`authRedirects.ts`). While this approach ensures robust security and centralized access control, it introduces some latency.
