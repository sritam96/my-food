import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { FoodResponseMock } from '../../../__mocks__';
import {
  getFoodState,
  FoodActions,
  foodInitialState,
  FoodState,
} from '../../../state';
import { HotelsComponent } from '../hotels.component';
import { RouterTestingModule } from '@angular/router/testing';
describe('FoodComponent', () => {
  let component: HotelsComponent;
  let fixture: ComponentFixture<HotelsComponent>;
  let mockStore: MockStore<FoodState>;
  let spyDispatch: jest.SpyInstance;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HotelsComponent],
      providers: [provideMockStore()],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelsComponent);
    mockStore = TestBed.inject(MockStore);
    mockStore.overrideSelector(getFoodState, FoodResponseMock);
    mockStore.setState({ ...foodInitialState, food: FoodResponseMock });
    component = fixture.componentInstance;
    spyDispatch = jest.spyOn(mockStore, 'dispatch');
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch fetch HOTELS', () => {
    component.ngOnInit();
    expect(spyDispatch).toHaveBeenCalledWith(FoodActions.fetchFoodAction());
  });
});
