import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubsriberCard } from './subsriber-card';

describe('SubsriberCard', () => {
  let component: SubsriberCard;
  let fixture: ComponentFixture<SubsriberCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubsriberCard]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SubsriberCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
