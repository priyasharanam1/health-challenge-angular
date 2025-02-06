import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressChartComponent } from './progress-chart.component';
import { ChartService } from '../../services/chart/chart.service';
import { User } from '../../components/users/users.model';
import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProgressChartComponent', () => {
  let component: ProgressChartComponent;
  let fixture: ComponentFixture<ProgressChartComponent>;
  let chartServiceMock: jasmine.SpyObj<ChartService>;
  let cdr: jasmine.SpyObj<ChangeDetectorRef>;

  beforeEach(async () => {
    const chartServiceSpy = jasmine.createSpyObj('ChartService', [
      'createChart',
      'updateChart',
    ]);
    const cdrSpy = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, MatListModule],
      declarations: [ProgressChartComponent],
      providers: [
        { provide: ChartService, useValue: chartServiceSpy },
        { provide: ChangeDetectorRef, useValue: cdrSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressChartComponent);
    component = fixture.componentInstance;
    chartServiceMock = TestBed.inject(ChartService) as jasmine.SpyObj<ChartService>;
    cdr = TestBed.inject(ChangeDetectorRef) as jasmine.SpyObj<ChangeDetectorRef>;

    component.chartRef = new ElementRef(document.createElement('canvas'));

    spyOn(localStorage, 'getItem').and.returnValue(
      JSON.stringify([
        { id: 1, name: 'John Doe', workouts: [], totalWorkouts: 10, totalMinutes: 100 },
      ] as User[])
    );

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on ngOnInit', () => {
    component.ngOnInit();
    expect(component.users.length).toBe(1);
    expect(component.users[0].name).toBe('John Doe');
  });

  it('should initialize the chart on ngAfterViewInit if users are present', () => {
    spyOn(component, 'initializeChart').and.callThrough();
    component.ngAfterViewInit();
    expect(component.initializeChart).toHaveBeenCalled();
    expect(component.selectedUser?.name).toBe('John Doe');
  });

  it('should not initialize the chart if no users are present', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    component.loadUsers();
    expect(component.users.length).toBe(0);
  });

  it('should call updateChart on user selection', () => {
    const user: User = {
      id: 1,
      name: 'Jane Doe',
      workouts: [],
      totalWorkouts: 5,
      totalMinutes: 50,
    };
    component.onSelectUser(user);
    expect(component.selectedUser).toBe(user);
    expect(chartServiceMock.updateChart).toHaveBeenCalledWith(user);
  });

  it('should reload users and update the chart on user addition', () => {
    component.onUserAdded();
    expect(component.users.length).toBe(1);
    expect(chartServiceMock.updateChart).toHaveBeenCalledWith(component.selectedUser!);
  });

  it('should not throw an error if chartRef is not available', () => {
    component.chartRef = undefined as any;
    expect(() => component.initializeChart()).not.toThrow();
  });
});
