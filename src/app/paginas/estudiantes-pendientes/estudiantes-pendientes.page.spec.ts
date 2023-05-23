import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstudiantesPendientesPage } from './estudiantes-pendientes.page';

describe('EstudiantesPendientesPage', () => {
  let component: EstudiantesPendientesPage;
  let fixture: ComponentFixture<EstudiantesPendientesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EstudiantesPendientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
