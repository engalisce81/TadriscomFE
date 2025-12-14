import { Environment } from '@abp/ng.core';

const baseUrl = 'https://tadriscomfe.sliplane.app';

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'Tadriscom',
    logoUrl: 'https://i.postimg.cc/G24yXvg7/Tadriscom.jpg',
  },
  oAuthConfig: {
    issuer: 'https://engalisce81-dev-acadmy-httpapi.sliplane.app/',
    redirectUri: baseUrl,
    clientId: 'Acadmy_App',
    responseType: 'code',
    scope: 'offline_access Acadmy',
    requireHttps: true
  },
  apis: {
    default: {
      url: 'https://engalisce81-dev-acadmy-httpapi.sliplane.app',
      rootNamespace: 'Dev.Progress',
    },
  },
} as Environment;
