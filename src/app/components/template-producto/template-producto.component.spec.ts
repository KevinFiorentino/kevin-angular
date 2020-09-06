import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateProductoComponent } from './template-producto.component';

describe('TemplateProductoComponent', () => {
  let component: TemplateProductoComponent;
  let fixture: ComponentFixture<TemplateProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
