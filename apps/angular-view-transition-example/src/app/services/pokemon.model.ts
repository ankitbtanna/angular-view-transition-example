export interface Pokemon {
  name: string;
  image: string;
  power: string;
  color: string;
  height: number;
  description: string;
  weakness: string;
  id: number;
}

export type Pokemons = Pokemon[];
