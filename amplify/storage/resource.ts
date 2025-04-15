import { defineStorage } from '@aws-amplify/backend'

export const storage = defineStorage({
  name: 'vsDotaStorage',
  access: (allow) => ({
    // Imágenes de perfil para usuarios
    'profile-images/*': [
      allow.guest.to(['read']),
      allow.authenticated.to(['read', 'write']), // Cada usuario gestionaría su propio perfil por lógica de app
      allow.groups(['admin']).to(['read', 'write', 'delete']),
    ],

    // Imágenes de salas para mostrar en listados
    'room-images/*': [
      allow.guest.to(['read']),
      allow.authenticated.to(['read', 'write']), // Control por lógica de app (solo creadores de sala)
      allow.groups(['admin']).to(['read', 'write', 'delete']),
    ],

    // Capturas de pantalla de partidas y evidencia para estadísticas
    'match-screenshots/*': [
      allow.guest.to(['read']),
      allow.authenticated.to(['read', 'write']),
      allow.groups(['admin']).to(['read', 'write', 'delete']),
    ],

    // Avatares y emblemas personalizados para equipos
    'team-emblems/*': [
      allow.guest.to(['read']),
      allow.authenticated.to(['read', 'write']), // Control por lógica de app (solo leads)
      allow.groups(['admin']).to(['read', 'write', 'delete']),
    ],

    // Archivos para compartir entre miembros de un equipo (estrategias, etc.)
    'team-files/*': [
      allow.authenticated.to(['read', 'write']), // La visibilidad se controlaría por lógica de app
      allow.groups(['admin']).to(['read', 'write', 'delete']),
    ],

    // Banners para eventos especiales o torneos
    'event-banners/*': [
      allow.guest.to(['read']),
      allow.authenticated.to(['read']),
      allow.groups(['admin']).to(['read', 'write', 'delete']),
    ],
  }),
})
