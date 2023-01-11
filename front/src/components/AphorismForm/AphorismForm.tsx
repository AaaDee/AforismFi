import React, { FormEvent } from 'react';

interface Props {
  onSubmit: (e: FormEvent) => void
}

export function AphorismForm({ onSubmit }: Props) {
  return <form onSubmit={onSubmit}>
    <label>Create a</label>
    <input type ='text' id='adjectives'></input>
    <label>aphorism on the topic of</label>
    <input width='300' type ='text' id='topic'></input>
    <button>Submit</button>
  </form>;
}