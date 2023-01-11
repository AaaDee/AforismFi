import { FormEvent } from 'react';

export interface AphorismFromEvent extends FormEvent {
  adjectives: string;
  topic: string;
}