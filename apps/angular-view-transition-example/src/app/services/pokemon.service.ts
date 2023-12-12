import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { POKEMONS } from '../pokemons';
import { Pokemon, Pokemons } from './pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor() {}

  getAllPokemons(): Observable<Pokemons> {
    return of(POKEMONS);
  }

  getPokemonById(id: string): Observable<Pokemon> {
    return of(POKEMONS.filter((pokemon) => pokemon.id.toString() === id)[0]);
  }
}
