import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addmodel3Component } from './addmodel3.component';

describe('Addmodel3Component', () => {
  let component: Addmodel3Component;
  let fixture: ComponentFixture<Addmodel3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Addmodel3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Addmodel3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
