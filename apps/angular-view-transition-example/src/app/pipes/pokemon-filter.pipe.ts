import { Pipe, PipeTransform } from '@angular/core';
import { Pokemons } from '../services/pokemon.model';

@Pipe({
  name: 'pokemonFilter',
  standalone: true,
})
export class PokemonFilterPipe implements PipeTransform {
  transform(pokemons: Pokemons | null, ...args: [string, number]): Pokemons {
    if (!pokemons) {
      return [];
    }

    const filteredPokemons = pokemons.filter((pokemon) => {
      const [colorFilter, heightFilter] = args;
      if (colorFilter?.includes('All')) {
        return pokemon.height >= heightFilter;
      } else {
        const colors = colorFilter?.split(',');
        return (
          colors?.indexOf(pokemon.color) !== -1 &&
          pokemon.height >= heightFilter
        );
      }
    });

    if (filteredPokemons.length === 0) {
      return [];
    } else {
      return filteredPokemons;
    }
  }
}
