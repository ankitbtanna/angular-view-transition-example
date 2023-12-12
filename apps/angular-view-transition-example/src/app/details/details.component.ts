import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { Observable } from 'rxjs';
import { Pokemon } from '../services/pokemon.model';

@Component({
  selector: 'angular-view-transition-example-details',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private pokemonService = inject(PokemonService);

  pokemon$: Observable<Pokemon> | undefined;

  showBackArrow = false;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.pokemon$ = this.pokemonService.getPokemonById(params['id']);
    });

    this.router.events.subscribe(() => {
      this.showBackArrow = this.router.url.includes('details');
    });
  }

  back() {
    this.router.navigate([`/color/All/height/0.1`]);
  }
}
