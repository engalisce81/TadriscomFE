import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'Tadriscom',
    logoUrl: 'assets/images/imgs/CompanyName.jpeg',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44318/',
    redirectUri: baseUrl,
    clientId: 'Acadmy_App',
    responseType: 'code',
    scope: 'offline_access Acadmy',
    requireHttps: true,
  },
  apis: {
    default: {
      url: 'https://localhost:44318',
      rootNamespace: 'Tadriscom',
    },
  },
} as Environment; 