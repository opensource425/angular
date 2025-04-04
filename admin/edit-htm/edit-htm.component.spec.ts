import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHtmComponent } from './edit-htm.component';

describe('EditHtmComponent', () => {
  let component: EditHtmComponent;
  let fixture: ComponentFixture<EditHtmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditHtmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHtmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
