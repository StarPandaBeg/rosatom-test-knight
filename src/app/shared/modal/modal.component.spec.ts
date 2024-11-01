import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationEvent } from '@angular/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit on open', () => {
    spyOn(component.toggleModal, 'emit');
    component.open();
    expect(component.toggleModal.emit).toHaveBeenCalledWith(true);
  });

  it('should emit after animation done', () => {
    spyOn(component.toggleModal, 'emit');
    const event = {
      fromState: '',
      toState: 'void',
      totalTime: 0,
      element: fixture.nativeElement,
      triggerName: '',
    } as AnimationEvent;
    component.onAnimationDone(event);
    expect(component.toggleModal.emit).toHaveBeenCalledWith(false);
  });

  it('should have close button', () => {
    component.modalVisible = true;
    fixture.detectChanges();

    const modal = fixture.nativeElement as HTMLDivElement;
    const button = modal.querySelector('.modal__close');
    expect(button).toBeTruthy();
    expect(button).toBeInstanceOf(HTMLButtonElement);
  });

  it('should close on button click', () => {
    spyOn(component, 'close');

    component.modalVisible = true;
    fixture.detectChanges();

    const modal = fixture.nativeElement as HTMLDivElement;
    const button = modal.querySelector('.modal__close') as HTMLButtonElement;
    button.click();
    expect(component.close).toHaveBeenCalled();
  });

  it('should close on click outside', () => {
    spyOn(component, 'close');

    component.modalVisible = true;
    fixture.detectChanges();

    const modal = fixture.nativeElement as HTMLDivElement;
    const overlay = modal.querySelector('.modal') as HTMLDivElement;
    overlay.click();
    expect(component.close).toHaveBeenCalled();
  });

  it('shouldn`t close on click on content', () => {
    spyOn(component, 'close');

    component.modalVisible = true;
    fixture.detectChanges();

    const modal = fixture.nativeElement as HTMLDivElement;
    const content = modal.querySelector('.modal__content') as HTMLDivElement;
    content.click();
    expect(component.close).not.toHaveBeenCalled();
  });

  it('shouldn`t close on click outside when disabled', () => {
    spyOn(component, 'close');

    component.modalVisible = true;
    component.closeOnClick = false;
    fixture.detectChanges();

    const modal = fixture.nativeElement as HTMLDivElement;
    const overlay = modal.querySelector('.modal') as HTMLDivElement;
    overlay.click();
    expect(component.close).not.toHaveBeenCalled();
  });
});
