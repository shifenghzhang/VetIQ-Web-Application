// Define Option type
export interface Option {
  value: number;
  label: string;
}

// Add Clinics here
export const clinicOptions: Option[] = [
  { value: 3, label: 'Clinic 3' },
  { value: 4, label: 'Clinic 4' },
  { value: 5, label: 'Clinic 5' },
  { value: 6, label: 'Clinic 6' },
  { value: 7, label: 'Clinic 7' }
];

// Add more year if nesscary
export const yearOptions: Option[] = [
  { value: 2022, label: '2022' },
  { value: 2023, label: '2023' },
  { value: 2024, label: '2024' }
];

// Handles switching selected clinic
export const handleClinicChange = (selectedOptions: Option[] | null | undefined): number[] => {
  if (!selectedOptions) return [];
  const value = selectedOptions.map(option => option.value);
  return value;
};

// Handles switching selected year 
export const handleYearChange = (selectedOptions: Option[] | null | undefined): number[] => {
  if (!selectedOptions) return [];
  const value = selectedOptions.map(option => option.value);
  return value;
};

