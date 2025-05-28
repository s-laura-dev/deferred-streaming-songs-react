import { Pokemon } from "../types/Pokemon";

interface PokeCardProps {
  pokemon: Pokemon;
}

export default function ProductCard({ pokemon }: PokeCardProps) {
  return (
    <div>
      <h3>{pokemon.name}</h3>
    </div>
  );
}
