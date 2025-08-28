import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryHeroComponent } from './gallery-hero.component';

describe('GalleryHeroComponent', () => {
  let component: GalleryHeroComponent;
  let fixture: ComponentFixture<GalleryHeroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GalleryHeroComponent]
    });
    fixture = TestBed.createComponent(GalleryHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
