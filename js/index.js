document.addEventListener("DOMContentLoaded", () => {
    const monsterContainer = document.createElement("div");
    document.body.appendChild(monsterContainer);
    fetchMonsters(monsterContainer);

function fetchMonsters() {
    fetch("http://localhost:3000/monsters")
      .then(resp => resp.json())
      .then(monsters => {
        monsters.forEach(monster => {
          const monsterCard = document.createElement("div");
          monsterCard.innerHTML = `
            <h2>${monster.name}</h2>
            <h4>Age: ${monster.age}</h4>
            <p>${monster.description}</p>
          `;
          monsterContainer.appendChild(monsterCard);
        });
      });
  }

  
  document.addEventListener("DOMContentLoaded", () => {
    fetchMonsters();
  });

  const monsterForm = document.createElement("form");
monsterForm.innerHTML = `
  <label for="name">Name:</label>
  <input type="text" id="name">
  <label for="age">Age:</label>
  <input type="text" id="age">
  <label for="description">Description:</label>
  <input type="text" id="description">
  <input type="submit" value="Create Monster">
`;
document.body.insertBefore(monsterForm, monsterContainer);


monsterForm.addEventListener("submit", event => {
    event.preventDefault();
    const name = event.target.querySelector("#name").value;
    const age = event.target.querySelector("#age").value;
    const description = event.target.querySelector("#description").value;
    const newMonster = { name, age, description };
    fetch("http://localhost:3000/monsters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newMonster)
    })
      .then(resp => resp.json())
      .then(monster => {
        const monsterCard = document.createElement("div");
        monsterCard.innerHTML = `
          <h2>${monster.name}</h2>
          <h4>Age: ${monster.age}</h4>
          <p>${monster.description}</p>
        `;
        monsterContainer.appendChild(monsterCard);
      });
    event.target.reset();
  });

  
  const loadMoreButton = document.createElement("button");
loadMoreButton.textContent = "Load More Monsters";
document.body.appendChild(loadMoreButton);

let page = 1;
loadMoreButton.addEventListener("click", () => {
  page++;
  fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
    .then(resp => resp.json())
    .then(monsters => {
      monsters.forEach(monster => {
        const monsterCard = document.createElement("div");
        monsterCard.innerHTML = `
          <h2>${monster.name}</h2>
          <h4>Age: ${monster.age}</h4>
          <p>${monster.description}</p>
        `;
        monsterContainer.appendChild(monsterCard); // add the created monster card to the DOM
    });
  });
});
});