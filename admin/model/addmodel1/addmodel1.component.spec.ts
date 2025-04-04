import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addmodel1Component } from './addmodel1.component';

describe('Addmodel1Component', () => {
  let component: Addmodel1Component;
  let fixture: ComponentFixture<Addmodel1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Addmodel1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Addmodel1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
