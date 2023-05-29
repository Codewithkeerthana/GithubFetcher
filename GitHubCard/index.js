const cardsDiv = document.querySelector('.cards');
const headerDiv = document.querySelector('.header');
const inputDiv = document.querySelector('.input');
const inputField = document.createElement('input');
const inputButton = document.createElement('button');

headerDiv.innerHTML = '<h1>Git-Hub Profile UserName</h1>';

inputDiv.innerHTML = `
  <p>ENTER THE USERNAME</p>
  <input type="text">
  <button>submit</button>
`;

inputButton.addEventListener('click', () => {
  const userName = inputField.value;
  if (!userName) {
    alert('No input given');
    return;
  }

  axios.get(`https://api.github.com/users/${userName}`)
    .then(response => {
      if (cardsDiv.firstChild) {
        cardsDiv.removeChild(cardsDiv.firstChild);
      }
      const newCard = createCard(response.data);
      cardsDiv.appendChild(newCard);
    })
    .catch(error => {
      alert(`No user found with username: ${userName}`);
    });
});

function createCard(userData) {
  const cardDiv = document.createElement('div');
  cardDiv.className = 'card';

  const cardImg = document.createElement('img');
  cardImg.src = userData.avatar_url;
  cardDiv.appendChild(cardImg);

  const cardInfoDiv = document.createElement('div');
  cardInfoDiv.className = 'card-info';

  const cardName = document.createElement('h3');
  cardName.className = 'name';
  cardName.textContent = userData.login;
  cardInfoDiv.appendChild(cardName);

  const cardUserName = document.createElement('p');
  cardUserName.className = 'username';
  cardUserName.textContent = userData.name;
  cardInfoDiv.appendChild(cardUserName);

  const cardLocation = document.createElement('p');
  cardLocation.textContent = `Location: ${userData.location}`;
  cardInfoDiv.appendChild(cardLocation);

  const cardProfile = document.createElement('p');
  cardProfile.textContent = 'Profile: ';

  const cardProfileAddress = document.createElement('a');
  cardProfileAddress.href = userData.html_url;
  cardProfileAddress.textContent = userData.html_url;
  cardProfile.appendChild(cardProfileAddress);

  cardInfoDiv.appendChild(cardProfile);

  const cardFollowers = document.createElement('p');
  cardFollowers.textContent = `Followers: ${userData.followers}`;
  cardInfoDiv.appendChild(cardFollowers);

  const cardFollowing = document.createElement('p');
  cardFollowing.textContent = `Following: ${userData.following}`;
  cardInfoDiv.appendChild(cardFollowing);

  const cardBio = document.createElement('p');
  cardBio.textContent = `Bio: ${userData.bio}`;
  cardInfoDiv.appendChild(cardBio);

  cardDiv.appendChild(cardInfoDiv);

  return cardDiv;
}

cardsDiv.appendChild(document.createElement('div'));
