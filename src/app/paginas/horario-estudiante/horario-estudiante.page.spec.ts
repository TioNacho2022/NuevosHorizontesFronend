import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HorarioEstudiantePage } from './horario-estudiante.page';

describe('HorarioEstudiantePage', () => {
  let component: HorarioEstudiantePage;
  let fixture: ComponentFixture<HorarioEstudiantePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HorarioEstudiantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
