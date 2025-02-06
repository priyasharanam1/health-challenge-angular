export const workoutOptions = [
  { value: 'Running', viewValue: 'Running', icon: 'directions_run' },
  { value: 'Walking', viewValue: 'Walking', icon: 'directions_walk' },
  { value: 'Yoga', viewValue: 'Yoga', customIcon: '/yoga.svg' },
  { value: 'Meditation', viewValue: 'Meditation', customIcon: '/meditation.svg' },
  { value: 'Gym', viewValue: 'Gym', icon: 'fitness_center' },
  { value: 'Outdoor Sports', viewValue: 'Outdoor Sports', customIcon: '/sports-icon.svg' },
  { value: 'Dancing', viewValue: 'Dancing', customIcon: '/dance-icon.svg' },
  { value: 'Cycling', viewValue: 'Cycling', icon: 'pedal_bike' },
  { value: 'Swimming', viewValue: 'Swimming', customIcon: '/swimming-icon.svg' },
  { value: 'Martial Arts', viewValue: 'Martial Arts', customIcon: '/martial-arts.svg' }
];


export interface Workout {
  type: string | null;
  minutes: number;
}
