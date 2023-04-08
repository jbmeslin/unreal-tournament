import { Schema } from 'mongoose';

export interface PlayerDocument extends Document {
  readonly pseudo: string;
  readonly points: number;
}

export const TournamentsSchema = new Schema<PlayerDocument>({
  pseudo: { type: String, required: true },
  points: Number,
});
