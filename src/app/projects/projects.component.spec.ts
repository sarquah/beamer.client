import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { EStatus } from '../models/enums/EStatus';
import { IProject } from '../models/interfaces/IProject';
import { ProjectService } from '../services/project.service';
import { ProjectsComponent } from './projects.component';

describe('ProjectsComponent', () => {
    let sut: ProjectsComponent;
    let projectServiceMock: jasmine.SpyObj<ProjectService>;
    const mockProjects: IProject[] = [
        {
            id: 0,
            tenantId: 'tenantId',
            status: EStatus.NotStarted,
            description: 'Project created for unit test',
            ownerId: 0,
            name: 'Unit test',
            startDate: new Date(),
            endDate: new Date(),
            tasks: [
                {
                    id: 0,
                    tenantId: 'tenantId',
                    status: EStatus.NotStarted,
                    description: 'Task created for unit test',
                    ownerId: 0,
                    name: 'Create unit test',
                    startDate: new Date(),
                    endDate: new Date(),
                }
            ]
        }
    ];

    beforeEach(() => {
        projectServiceMock = jasmine.createSpyObj<ProjectService>('ProjectService', [
            'getProjects'
        ]);

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                ProjectsComponent,
                {
                    provide: ProjectService,
                    useValue: projectServiceMock
                }
            ]
        });
        const projects$ = new Observable<IProject[]>((observer) => {
            observer.next(mockProjects);
            observer.complete();
        });
        projectServiceMock.getProjects.and.returnValue(projects$);
        sut = TestBed.inject(ProjectsComponent);
    });

    it('should be created', () => {
        expect(sut).toBeTruthy();
    });

    describe('#ngOnInit', () => {
        it('should set projects$', () => {
            sut.ngOnInit();
            sut.projects$.subscribe(projects => expect(projects).toEqual(mockProjects));
        });

        it('should have been called', () => {
            sut.ngOnInit();
            expect(projectServiceMock.getProjects).toHaveBeenCalled();
        })
    });
});