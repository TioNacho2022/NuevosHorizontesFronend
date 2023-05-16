import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LevantarPerfilPage } from './levantar-perfil.page';

describe('LevantarPerfilPage', () => {
  let component: LevantarPerfilPage;
  let fixture: ComponentFixture<LevantarPerfilPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LevantarPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
