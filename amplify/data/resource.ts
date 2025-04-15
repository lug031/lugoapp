import { type ClientSchema, a, defineData } from '@aws-amplify/backend'

const schema = a.schema({
  User: a
    .model({
      email: a.string().required(),
      username: a.string().required(),
      verified: a.boolean(),
      profilePicture: a.string(),
      streamLink: a.string(),
      fullName: a.string(),
      createdRooms: a.hasMany('Room', 'leadID'),
      participations: a.hasMany('RoomMember', 'userID'),
    })
    .authorization((allow) => [
      allow.owner().to(['read', 'update', 'delete']),
      allow.groups(['admin']).to(['read', 'create', 'update', 'delete']),
      allow.authenticated().to(['read']),
      allow.publicApiKey().to(['read']),
    ]),

  Room: a
    .model({
      name: a.string().required(),
      description: a.string(),
      gameType: a.enum(['dota2', 'csgo', 'paladins', 'other']),
      roomType: a.enum(['streamer', 'friends', 'custom']),
      status: a.enum(['created', 'scheduled', 'started', 'finished']),
      prize: a.string(),
      teamSize: a.integer().required(), // Between 2-5
      streamLink: a.string(),
      roomImage: a.string(),
      leadID: a.string().required(),
      lead: a.belongsTo('User', 'leadID'),
      leadIsPlaying: a.boolean(), // Indica si el lead también está jugando
      members: a.hasMany('RoomMember', 'roomID'),
      invites: a.hasMany('RoomInvite', 'roomID'), // Relación inversa
      inviteLink: a.string(),
      inviteLinkExpiry: a.datetime(),
      team1Name: a.string(),
      team2Name: a.string(),
      autoBalanceTeams: a.boolean(), // Opción para balancear equipos automáticamente
      winnerTeam: a.enum(['team1', 'team2', 'draw', 'none']),
      finalScore: a.string(),
      stats: a.hasMany('RoomStats', 'roomID'),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
      owner: a.string(), // Campo para autorización por propietario
    })
    .authorization((allow) => [
      // Lead tiene control completo
      allow.owner().to(['read', 'update', 'delete']),
      // Admin puede hacer todo
      allow.groups(['admin']).to(['read', 'create', 'update', 'delete']),
      // Todos los usuarios autenticados pueden leer y crear salas
      allow.authenticated().to(['read', 'create']),
      // Usuarios públicos pueden leer salas finalizadas
      allow.publicApiKey().to(['read']),
    ]),

  RoomMember: a
    .model({
      roomID: a.string().required(),
      room: a.belongsTo('Room', 'roomID'),
      userID: a.string(),
      user: a.belongsTo('User', 'userID'),
      nickname: a.string().required(),
      fullName: a.string(),
      streamLink: a.string(),
      profilePicture: a.string(),
      team: a.enum(['team1', 'team2', 'none']),
      isLead: a.boolean(), // Indica si este miembro es también el lead
      rank: a.integer(), // Rango del jugador (1-8)
      gameplay: a.integer(), // Habilidad de gameplay (1-10)
      joinedAt: a.datetime(),
      isActive: a.boolean(),
      stats: a.hasMany('MemberStat', 'memberID'), // Relación inversa añadida
      owner: a.string(), // Campo para autorización por propietario
    })
    .authorization((allow) => [
      // El dueño de la sala puede gestionar todos los miembros
      allow.owner().to(['read', 'create', 'update', 'delete']),
      // Admin puede hacer todo
      allow.groups(['admin']).to(['read', 'create', 'update', 'delete']),
      // Todos los usuarios autenticados pueden leer y posiblemente actualizar su información
      allow.authenticated().to(['read', 'create', 'update']),
      // Usuarios públicos pueden leer vía API key
      allow.publicApiKey().to(['read']),
    ]),

  RoomInvite: a
    .model({
      roomID: a.string().required(),
      room: a.belongsTo('Room', 'roomID'),
      code: a.string().required(),
      expiresAt: a.datetime().required(),
      isActive: a.boolean(),
      createdAt: a.datetime(),
      owner: a.string(), // Campo para autorización por propietario
    })
    .authorization((allow) => [
      // El dueño de la sala puede gestionar invitaciones
      allow.owner().to(['read', 'create', 'update', 'delete']),
      // Admin puede hacer todo
      allow.groups(['admin']).to(['read', 'create', 'update', 'delete']),
      // Todos los usuarios autenticados pueden leer
      allow.authenticated().to(['read']),
      // Usuarios públicos pueden leer vía API key para unirse con invitación
      allow.publicApiKey().to(['read']),
    ]),

  RoomStats: a
    .model({
      roomID: a.string().required(),
      room: a.belongsTo('Room', 'roomID'),
      matchDate: a.datetime().required(),
      winnerTeam: a.enum(['team1', 'team2', 'draw']),
      team1Score: a.integer().required(),
      team2Score: a.integer().required(),
      matchDuration: a.integer(), // in minutes
      matchNotes: a.string(),
      memberStats: a.hasMany('MemberStat', 'roomStatsID'),
      createdAt: a.datetime(),
      owner: a.string(), // Campo para autorización por propietario
    })
    .authorization((allow) => [
      // El dueño de la sala puede crear y gestionar estadísticas
      allow.owner().to(['read', 'create', 'update', 'delete']),
      // Admin puede hacer todo
      allow.groups(['admin']).to(['read', 'create', 'update', 'delete']),
      // Todos los usuarios autenticados pueden leer
      allow.authenticated().to(['read']),
      // Usuarios públicos pueden leer vía API key
      allow.publicApiKey().to(['read']),
    ]),

  MemberStat: a
    .model({
      roomStatsID: a.string().required(),
      roomStats: a.belongsTo('RoomStats', 'roomStatsID'),
      memberID: a.string().required(),
      member: a.belongsTo('RoomMember', 'memberID'),
      nickname: a.string().required(),
      team: a.enum(['team1', 'team2']),
      rank: a.integer(), // Guardamos el rango que tenía durante el juego
      gameplay: a.integer(), // Guardamos el gameplay que tenía durante el juego
      kills: a.integer(),
      deaths: a.integer(),
      assists: a.integer(),
      heroPlayed: a.string(),
      performance: a.enum(['poor', 'average', 'good', 'excellent']),
      notes: a.string(),
      owner: a.string(), // Campo para autorización por propietario
    })
    .authorization((allow) => [
      // El dueño de la sala puede crear y gestionar estadísticas de miembros
      allow.owner().to(['read', 'create', 'update', 'delete']),
      // Admin puede hacer todo
      allow.groups(['admin']).to(['read', 'create', 'update', 'delete']),
      // Todos los usuarios autenticados pueden leer
      allow.authenticated().to(['read']),
      // Usuarios públicos pueden leer vía API key
      allow.publicApiKey().to(['read']),
    ]),
})

export type Schema = ClientSchema<typeof schema>

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
})
