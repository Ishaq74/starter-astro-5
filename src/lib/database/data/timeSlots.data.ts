// Seed data for time slots (PostgreSQL)
export const timeSlotsData = [
  // 2025-03-20 slots (links to reservationsData[1] Sophie for formation)
  { id: 1, date: '2025-03-20', startTime: '10:00', endTime: '11:00', serviceType: 'formation', notes: 'Session initiation', isAvailable: 0, reservedBy: '2' },
  { id: 2, date: '2025-03-20', startTime: '11:30', endTime: '12:30', serviceType: 'formation', notes: '', isAvailable: 1, reservedBy: '' },
  // 2025-02-28 slots (Julie soirée)
  { id: 3, date: '2025-02-28', startTime: '16:00', endTime: '17:00', serviceType: 'service', notes: 'Maquillage soirée', isAvailable: 0, reservedBy: '3' },
  { id: 4, date: '2025-02-28', startTime: '17:30', endTime: '18:30', serviceType: 'service', notes: '', isAvailable: 1, reservedBy: '' },
  // 2025-06-15 slots (Marie mariée)
  { id: 5, date: '2025-06-15', startTime: '14:00', endTime: '15:30', serviceType: 'service', notes: 'Maquillage mariée', isAvailable: 0, reservedBy: '1' },
  { id: 6, date: '2025-06-15', startTime: '16:00', endTime: '17:00', serviceType: 'service', notes: '', isAvailable: 1, reservedBy: '' },
  // 2025-08-12 slots (Sophie mariage planning)
  { id: 7, date: '2025-08-12', startTime: '14:00', endTime: '15:00', serviceType: 'maquillage-mariee', notes: 'Préparation mariage', isAvailable: 0, reservedBy: '4' },
  { id: 8, date: '2025-08-12', startTime: '15:30', endTime: '16:30', serviceType: 'maquillage-mariee', notes: '', isAvailable: 1, reservedBy: '' }
];
