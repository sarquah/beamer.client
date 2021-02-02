import { TestBed } from '@angular/core/testing';
import { ProjectComponent } from './project.component';

describe('ProjectComponent', () => {
    let sut: ProjectComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [
                ProjectComponent
            ]
        });
        sut = TestBed.inject(ProjectComponent);
    });

    it('should be created', () => {
        expect(sut).toBeTruthy();
    });
});