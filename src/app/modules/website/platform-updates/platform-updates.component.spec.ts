import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformUpdatesComponent } from './platform-updates.component';

describe('PlatformUpdatesComponent', () => {
  let component: PlatformUpdatesComponent;
  let fixture: ComponentFixture<PlatformUpdatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatformUpdatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlatformUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
