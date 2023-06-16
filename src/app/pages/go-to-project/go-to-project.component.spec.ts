import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoToProjectComponent } from './go-to-project.component';

describe('GoToProjectComponent', () => {
  let component: GoToProjectComponent;
  let fixture: ComponentFixture<GoToProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoToProjectComponent]
    });
    fixture = TestBed.createComponent(GoToProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
