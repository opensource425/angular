import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaphtmlComponent } from './maphtml.component';

describe('MaphtmlComponent', () => {
  let component: MaphtmlComponent;
  let fixture: ComponentFixture<MaphtmlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaphtmlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaphtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
