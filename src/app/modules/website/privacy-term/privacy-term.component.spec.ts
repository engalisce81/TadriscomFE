import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyTermComponent } from './privacy-term.component';

describe('PrivacyTermComponent', () => {
  let component: PrivacyTermComponent;
  let fixture: ComponentFixture<PrivacyTermComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacyTermComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivacyTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
