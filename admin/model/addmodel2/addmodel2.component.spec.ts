import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addmodel2Component } from './addmodel2.component';

describe('Addmodel2Component', () => {
  let component: Addmodel2Component;
  let fixture: ComponentFixture<Addmodel2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Addmodel2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Addmodel2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
