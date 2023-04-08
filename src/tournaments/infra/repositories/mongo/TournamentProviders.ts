import { Mongoose } from 'mongoose';
import { TournamentsSchema } from './schemas/tournamentsSchema';

export const TournamentProviders = [
  {
    provide: 'TOURNAMENT_MODEL',
    useFactory: (mongoose: Mongoose) =>
      mongoose.model('Tournament', TournamentsSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
