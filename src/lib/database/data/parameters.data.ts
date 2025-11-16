// Seed data for parameters (PostgreSQL)
// Naming convention aligns with existing *.data.ts files
export const parametersData = [
  { id: 1, key: 'general.site_mode', value: 'production', description: 'Mode du site: production | maintenance', category: 'general' },
  { id: 2, key: 'general.default_locale', value: 'fr-FR', description: 'Locale par défaut pour le contenu et l’UI', category: 'general' },
  { id: 3, key: 'booking.allow_weekends', value: 'true', description: 'Autoriser la réservation les weekends', category: 'booking' },
  { id: 4, key: 'booking.max_future_months', value: '6', description: 'Nombre de mois maximum à l’avance pour réserver', category: 'booking' },
  { id: 5, key: 'invoices.default_currency', value: 'EUR', description: 'Devise utilisée pour les factures', category: 'invoices' },
  { id: 6, key: 'invoices.vat_rate', value: '20', description: 'Taux de TVA en pourcentage', category: 'invoices' },
  { id: 7, key: 'notifications.email_sender', value: 'contact@neillbeauty.fr', description: 'Adresse email expéditeur pour les notifications', category: 'notifications' },
  { id: 8, key: 'notifications.reservation_template', value: 'reservation-confirmation-v1', description: 'Template email pour confirmation de réservation', category: 'notifications' }
];
