// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  beamerAPIEndpoint: 'http://localhost:65100',
  azure: {
    cloudInstanceId: 'https://login.microsoftonline.com',
    scopeUri: [
      'api://e2a46ce5-1cd4-46e7-b7ed-e4fffd1d7f16/Beamer'
    ],
    tenantId: 'fb0d02c2-f1bf-4146-a18a-5ffe03bbb4e2',
    clientId: 'c0c37e71-c7d8-4c9e-b9c7-cf74575d7ef6',
    redirectUrl: 'http://localhost:4200'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
