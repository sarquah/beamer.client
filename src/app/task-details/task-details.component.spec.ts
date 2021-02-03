import { TestBed } from '@angular/core/testing';
import { TaskDetailsComponent } from './task-details.component';

describe('TaskDetailsComponent', () => {
    let sut: TaskDetailsComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                TaskDetailsComponent
            ]
        })
        sut = TestBed.inject(TaskDetailsComponent);
    });

    it('should be created', () => {
        expect(sut).toBeTruthy();
    })
});