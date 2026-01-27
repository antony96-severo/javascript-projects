document.addEventListener("DOMContentLoaded", function () {
  const pokemonImage = document.getElementById("pokemon-image");
  const pokemonName = document.getElementById("pokemon-name");
  const pokemonHeight= document.getElementById("pokemon-height");
  const pokemonWeight= document.getElementById("pokemon-weight");
  const pokemonAbilities = document.getElementById("pokemon-abilities");
  const pokemonType = document.getElementById("pokemon-type");
  const pokemonInput = document.getElementById("pokemon-input");
  const searchButton = document.getElementById("search-button");

  searchButton.addEventListener("click", function () {
    const pokemonNameValue = pokemonInput.value.toLowerCase();
    if (pokemonNameValue.trim() !== "") {
      searchPokemon(pokemonNameValue);
    }
});

  function searchPokemon(name) {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${name}/`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Pokemon not found!");
        }
        return response.json();
      })
      .then((data) => {
        pokemonImage.src = data.sprites.front_default;
        pokemonName.textContent = "Name: " + data.name;
        pokemonHeight.textContent = "Height(cm): " + data.height * 10;
        pokemonWeight.textContent = "Weight(kg): " + data.weight / 10;
        pokemonType.textContent =
          "Type: " +
          data.types
            .map((type) => type.type.name)
            .join(", ");
        pokemonAbilities.innerHTML = "";
        data.abilities.forEach((ability) => {
          const li = document.createElement("li");
          li.textContent = ability.ability.name;
          pokemonAbilities.appendChild(li);
        });
      })
      .catch((error) => {
        console.log(error);
        alert("Pokémon não encontrado");
      });
  }
});

       