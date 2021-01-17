import { AuthTokenModel } from './auth-token-model';
import { ProfileModel } from './profile-model';

export interface AuthStateModel {
  token?: AuthTokenModel;
  profile?: ProfileModel;
  authReady?: boolean;
}
