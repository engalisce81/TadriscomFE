import { Environment } from '@abp/ng.core';

const baseUrl = 'https://tadriscomfe-production.up.railway.app';

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'Company-Name',
    logoUrl: '/assets/images/imgs/CompanyName.jpeg',
  },
  oAuthConfig: {
    issuer: 'https://tadriscombe-production.up.railway.app/',
    redirectUri: baseUrl,
    clientId: 'Acadmy_App',
    responseType: 'code',
    scope: 'offline_access Acadmy',
    requireHttps: true
  },
  apis: {
    default: {
      url: 'https://tadriscombe-production.up.railway.app',
      rootNamespace: 'Tadriscom',
    },
  },
} as Environment;
