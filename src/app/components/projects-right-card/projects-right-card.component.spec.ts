import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsRightCardComponent } from './projects-right-card.component';

describe('ProjectsRightCardComponent', () => {
  let component: ProjectsRightCardComponent;
  let fixture: ComponentFixture<ProjectsRightCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectsRightCardComponent]
    });
    fixture = TestBed.createComponent(ProjectsRightCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
