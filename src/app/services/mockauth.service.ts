import { AccountInfo } from '@azure/msal-browser';

export class MockAuthService {
    instance = {
      getAllAccounts: (): AccountInfo[] => {
        return [{
          homeAccountId: 'homeAccountId',
          environment: 'environtment',
          tenantId: 'tenantId',
          username: 'userName',
          localAccountId: 'localAccountId'
        }];
      }
    }
  }