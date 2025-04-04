import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemapComponent } from './remap.component';

describe('RemapComponent', () => {
  let component: RemapComponent;
  let fixture: ComponentFixture<RemapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
