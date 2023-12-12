import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../services/pokemon.service';
import { Observable, defaultIfEmpty, startWith } from 'rxjs';
import { Pokemon, Pokemons } from '../services/pokemon.model';
import { MaterialModule } from '../material.module';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { PokemonFilterPipe } from '../pipes/pokemon-filter.pipe';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'angular-view-transition-example-home',
  standalone: true,
  imports: [CommonModule, MaterialModule, PokemonFilterPipe],
  providers: [PokemonService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private pokemonService = inject(PokemonService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  colorFilter: string = 'All';
  heightFilter: number = 0.1;
  showBackArrow = false;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.colorFilter = params['color'];
      this.heightFilter = params['height'] || 0.1;
    });

    this.router.events.subscribe(() => {
      this.showBackArrow = this.router.url.includes('details');
    });
  }

  pokemons$: Observable<Pokemons> = this.pokemonService
    .getAllPokemons()
    .pipe(startWith([]), defaultIfEmpty([]));

  filterPokemonsByColor(event: MatButtonToggleChange) {
    this.colorFilter = event.value;

    this.router.navigate([
      `color/${this.colorFilter}/height/${this.heightFilter}`,
    ]);
  }

  filterPokemonsByHeight(height: number) {
    this.heightFilter = height;

    this.router.navigate([
      `color/${this.colorFilter}/height/${this.heightFilter}`,
    ]);
  }

  showDetails(pokemon: Pokemon) {
    this.router.navigate(['details', pokemon.id]);
  }

  back() {
    this.router.navigate([`/color/All/height/0.1`]);
  }
}
