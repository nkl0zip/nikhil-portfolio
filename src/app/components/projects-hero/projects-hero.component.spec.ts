import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsHeroComponent } from './projects-hero.component';

describe('ProjectsHeroComponent', () => {
  let component: ProjectsHeroComponent;
  let fixture: ComponentFixture<ProjectsHeroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectsHeroComponent]
    });
    fixture = TestBed.createComponent(ProjectsHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
