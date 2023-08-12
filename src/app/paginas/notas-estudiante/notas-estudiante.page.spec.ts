import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotasEstudiantePage } from './notas-estudiante.page';

describe('NotasEstudiantePage', () => {
  let component: NotasEstudiantePage;
  let fixture: ComponentFixture<NotasEstudiantePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NotasEstudiantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
