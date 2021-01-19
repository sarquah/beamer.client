import { IAuthTokenModel } from './auth-token-model';
import { ProfileModel } from './profile-model';

export interface AuthStateModel {
  token?: IAuthTokenModel;
  profile?: ProfileModel;
  authReady?: boolean;
}
