import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsLeftCardComponent } from './projects-left-card.component';

describe('ProjectsLeftCardComponent', () => {
  let component: ProjectsLeftCardComponent;
  let fixture: ComponentFixture<ProjectsLeftCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectsLeftCardComponent]
    });
    fixture = TestBed.createComponent(ProjectsLeftCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
