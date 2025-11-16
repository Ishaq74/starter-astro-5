// Seed data for invoices (PostgreSQL)
// reservationId values align with reservationsData
export const invoicesData = [
  {
    id: 1,
    reservationId: 1,
    invoiceNumber: 'INV-20250615-000001',
    customerName: 'Marie Dubois',
    customerEmail: 'marie.dubois@email.com',
    serviceName: 'Maquillage mariée',
    amount: 220.00,
    dueDate: '2025-06-10 00:00:00',
    status: 'pending',
    paidAmount: 0,
    paymentMethod: '',
    paymentIntentId: '',
    notes: 'Acompte requis 30%'
  },
  {
    id: 2,
    reservationId: 2,
    invoiceNumber: 'INV-20250320-000002',
    customerName: 'Sophie Martin',
    customerEmail: 'sophie.martin@email.com',
    serviceName: 'Initiation au maquillage',
    amount: 120.00,
    dueDate: '2025-03-18 00:00:00',
    status: 'paid',
    paidAmount: 120.00,
    paymentMethod: 'card',
    paymentIntentId: 'pi_demo_2',
    notes: 'Payé intégralement'
  },
  {
    id: 3,
    reservationId: 3,
    invoiceNumber: 'INV-20250228-000003',
    customerName: 'Julie Leroy',
    customerEmail: 'julie.leroy@email.com',
    serviceName: 'Maquillage soirée',
    amount: 90.00,
    dueDate: '2025-02-26 00:00:00',
    status: 'partially_paid',
    paidAmount: 40.00,
    paymentMethod: 'bank_transfer',
    paymentIntentId: '',
    notes: 'Reste dû 50€'
  }
];
