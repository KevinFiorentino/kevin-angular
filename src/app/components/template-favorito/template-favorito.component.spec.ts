import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateFavoritoComponent } from './template-favorito.component';

describe('TemplateFavoritoComponent', () => {
  let component: TemplateFavoritoComponent;
  let fixture: ComponentFixture<TemplateFavoritoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateFavoritoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateFavoritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
