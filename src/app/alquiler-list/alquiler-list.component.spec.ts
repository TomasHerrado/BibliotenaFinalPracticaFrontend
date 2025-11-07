import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlquilerListComponent } from './alquiler-list.component';

describe('AlquilerListComponent', () => {
  let component: AlquilerListComponent;
  let fixture: ComponentFixture<AlquilerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlquilerListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlquilerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
