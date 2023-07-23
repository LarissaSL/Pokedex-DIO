document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonNumber = urlParams.get('number');
    loadPokemonDetails(pokemonNumber);
});