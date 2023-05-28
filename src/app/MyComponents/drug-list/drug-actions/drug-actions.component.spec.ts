import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugActionsComponent } from './drug-actions.component';

describe('DrugActionsComponent', () => {
  let component: DrugActionsComponent;
  let fixture: ComponentFixture<DrugActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrugActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrugActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
