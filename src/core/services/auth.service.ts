import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthStateModel } from '../models/auth-state-model';
import { AuthTokenModel } from '../models/auth-token-model';
import { LoginModel } from '../models/login-model';
import { ProfileModel } from '../models/profile-model';
import { RefreshGrantModel } from '../models/refresh-grant-model';
import { IRegisterModel } from '../models/register-model';

type RegisterFormControls = { [field in keyof IRegisterModel]?: FormControl };

// @TODO Remove commented code
@Injectable()
export class AuthService {
    private readonly initalState: AuthStateModel;
    private authReady$ = new BehaviorSubject<boolean>(false);
    private state: BehaviorSubject<AuthStateModel>;
    private refreshSubscription$: Subscription;

    public state$: Observable<AuthStateModel>;
    public tokens$: Observable<AuthTokenModel>;
    public profile$: Observable<ProfileModel>;
    public loggedIn$: Observable<boolean>;

    constructor(
        private httpClient: HttpClient,
        private formBuilder: FormBuilder
    ) {
        this.initalState = {
            profile: null,
            token: null,
            authReady: false
        };

        this.state = new BehaviorSubject<AuthStateModel>(this.initalState);
        this.state$ = this.state.asObservable();

        // this.tokens$ = this.state.filter(state => state.authReady)
        //     .map(state => state.tokens);


        // this.profile$ = this.state.filter(state => state.authReady)
        //     .map(state => state.profile);

        // this.loggedIn$ = this.tokens$.map(tokens => !!tokens);
    }

    public createForm() {
        const formControls: RegisterFormControls = {
            userName: new FormControl(null, [
                Validators.required,
                Validators.email
            ]),
            // @TODO Create validators for password length
            password: new FormControl(null, Validators.required),
            confirmPassword: new FormControl(null, Validators.required)
        };
        return this.formBuilder.group(formControls);
    }

    // public init(): Observable<AuthTokenModel> {
    //     return this.startupTokenRefresh()
    //         .do(() => this.scheduleRefresh());
    // }

    public register(data: IRegisterModel): Observable<any> {
        return this.httpClient.post<IRegisterModel>(`${environment.beamerIdentityEndpoint}/account/register`, data);
    }

    // public login(user: LoginModel): Observable<any> {
    //     return this.getTokens(user, 'password')
    //         .catch(res => throwError(res.json()))
    //         .do(res => this.scheduleRefresh());
    // }

    // public logout() {
    //     this.updateState({ profile: null, token: null });
    //     if (this.refreshSubscription$) {
    //         this.refreshSubscription$.unsubscribe();
    //     }
    //     this.removeToken();
    // }

    // public refreshTokens(): Observable<AuthTokenModel> {
    //     return this.state.first()
    //         .map(state => state.tokens)
    //         .flatMap(tokens => this.getTokens({ refresh_token: tokens.refresh_token }, 'refresh_token')
    //             .catch(error => throwError('Session Expired'))
    //         );
    // }

    // private storeToken(tokens: AuthTokenModel) {
    //     const previousTokens = this.retrieveTokens();
    //     if (previousTokens != null && tokens.refresh_token == null) {
    //         tokens.refresh_token = previousTokens.refresh_token;
    //     }

    //     localStorage.setItem('auth-tokens', JSON.stringify(tokens));
    // }

    // private retrieveTokens(): AuthTokenModel {
    //     const tokensString = localStorage.getItem('auth-tokens');
    //     const tokensModel: AuthTokenModel = tokensString == null ? null : JSON.parse(tokensString);
    //     return tokensModel;
    // }

    // private removeToken() {
    //     localStorage.removeItem('auth-tokens');
    // }

    // private updateState(newState: AuthStateModel) {
    //     const previousState = this.state.getValue();
    //     this.state.next(Object.assign({}, previousState, newState));
    // }

    // private getTokens(data: RefreshGrantModel | LoginModel, grantType: string): Observable<Response> {
    //     const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    //     const options = new RequestOptions({ headers: headers });

    //     Object.assign(data, { grant_type: grantType, scope: 'openid offline_access' });

    //     const params = new URLSearchParams();
    //     Object.keys(data)
    //         .forEach(key => params.append(key, data[key]));
    //     return this.httpClient.post(`${environment.beamerIdentityEndpoint}/connect/token`, params.toString(), options)
    //         .do(res => {
    //             const tokens: AuthTokenModel = res.json();
    //             const now = new Date();
    //             tokens.expiration_date = new Date(now.getTime() + tokens.expires_in * 1000).getTime().toString();

    //             const profile: ProfileModel = this.jwtDecode(tokens.id_token);

    //             this.storeToken(tokens);
    //             this.updateState({ authReady: true, token: tokens, profile });
    //         });
    // }

    // private startupTokenRefresh(): Observable<AuthTokenModel> {
    //     return Observable.of(this.retrieveTokens())
    //         .flatMap((tokens: AuthTokenModel) => {
    //             if (!tokens) {
    //                 this.updateState({ authReady: true });
    //                 return throwError('No token in Storage');
    //             }
    //             const profile: ProfileModel = this.jwtDecode(tokens.id_token);
    //             this.updateState({ token: tokens, profile });

    //             if (+tokens.expiration_date > new Date().getTime()) {
    //                 this.updateState({ authReady: true });
    //             }

    //             return this.refreshTokens();
    //         })
    //         .catch(error => {
    //             this.logout();
    //             this.updateState({ authReady: true });
    //             return throwError(error);
    //         });
    // }

    // private scheduleRefresh() {
    //     this.refreshSubscription$ = this.tokens$
    //         .first()
    //         // refresh every half the total expiration time
    //         .flatMap(tokens => Observable.interval(tokens.expires_in / 2 * 1000))
    //         .flatMap(() => this.refreshTokens())
    //         .subscribe();
    // }
}

