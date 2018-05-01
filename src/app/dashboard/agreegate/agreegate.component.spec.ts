import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreegateComponent } from './agreegate.component';

describe('AgreegateComponent', () => {
  let component: AgreegateComponent;
  let fixture: ComponentFixture<AgreegateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgreegateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreegateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
