import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let sut: AppComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AppComponent
            ]
        });
        sut = TestBed.inject(AppComponent);
    });

    it('should be created', () => {
        expect(sut).toBeTruthy();
    })
});