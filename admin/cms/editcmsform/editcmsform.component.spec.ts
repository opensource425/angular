import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcmsformComponent } from './editcmsform.component';

describe('EditcmsformComponent', () => {
  let component: EditcmsformComponent;
  let fixture: ComponentFixture<EditcmsformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditcmsformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcmsformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
