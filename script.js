// Date and Strategy data
const dateArray = ['24-Apr-2024', '02-May-2024', '09-May-2024', '31-May-2024', '21-Jun-2024'];
const strategyArray = [
    { View: 'Bullish', Value: { '24-Apr-2024': ['Bull Call Spread', 'Bull Put Spread', 'Bull Put Spread', 'Long Call', 'Bull Put Spread', 'Bull Call Spread', 'Strategy1', 'Bull Call Spread', 'Strategy1', 'Strategy1', 'SpreadStrategy', 'Bull Call Spread'], '02-May-2024': ['Bull Call Spread', 'Bull Call Spread', 'Bull Put Spread', 'Long Call', 'Long Call', 'Long Call', 'Bull Put Spread', 'Bull Call Spread', 'Strategy1', 'Bull Call Spread', 'Strategy2', 'Strategy1', 'Strategy2', 'Bull Call Spread'], '09-May-2024': ['Strategy Put', 'Strategy Call', 'Strategy Call', 'Strategy Call', 'Strategy Put'] } },
    { View: 'Bearish', Value: { '24-Apr-2024': ['Bear Call Spread', 'Bear Call Spread', 'Bear Call Spread', 'Long Put', 'Long Put', 'Long Put', 'Bear Call Spread'], '31-May-2024': ['Long Put', 'Long Put', 'Long Put', 'Long Put', 'Long Put'], '21-Jun-2024': ['Strategy3', 'Strategy3', 'Bear Put Spread', 'Strategy3', 'Long Put', 'Long Put'] } },
    { View: 'RangeBound', Value: { '24-Apr-2024': ['Short Straddle', 'Short Strangle', 'Short Strangle', 'Iron Butterfly', 'Short Strangle', 'Short Straddle', 'Strategy1', 'Short Straddle', 'Strategy1', 'Strategy1', 'SpreadStrategy', 'Short Straddle'], '02-May-2024': ['Short Straddle', 'Short Straddle', 'Short Strangle', 'Iron Butterfly', 'Iron Butterfly', 'Iron Butterfly', 'Short Strangle', 'Short Straddle', 'Strategy1', 'Short Straddle', 'Strategy2', 'Strategy1', 'Strategy2', 'Short Straddle'], '21-Jun-2024': ['Iron Condor', 'Iron Butterfly', 'Iron Butterfly', 'Iron Butterfly', 'Iron Condor'] } },
    { View: 'Volatile', Value: { '02-May-2024': ['Long Straddle', 'Long Strangle', 'Long Strangle', 'Long Strangle', 'Long Straddle', 'Strategy1', 'Long Straddle', 'Strategy1', 'Strategy1', 'Spread-Strategy', 'Long Straddle'], '09-May-2024': ['Long Straddle', 'Long Straddle', 'Long Strangle', 'Long Strangle', 'Long Straddle', 'Strategy1', 'Long Straddle', 'Strategy2', 'Strategy1', 'Strategy2', 'Long Straddle'], '31-May-2024': ['Long Straddle', 'Long Strangle', 'Long Strangle', 'Long Strangle', 'Long Straddle'] } }
];

let currentView = 'Bullish';
let currentDate = dateArray[0];

const toggleContainer = document.getElementById('toggleContainer');
strategyArray.forEach(strategy => {
  const button = document.createElement('button');
  button.className = 'toggle-button';
  button.textContent = strategy.View;
  if (strategy.View === currentView) button.classList.add('active');
  button.onclick = () => setView(strategy.View);
  toggleContainer.appendChild(button);
});

const dropdown = document.querySelector('.dropdown');
const selected = dropdown.querySelector('.dropdown-selected');
const optionsContainer = dropdown.querySelector('.dropdown-options');
selected.textContent=currentDate;
dateArray.forEach(date => {
  const option = document.createElement('div');
  option.textContent = date;
  option.value = date; 
  optionsContainer.appendChild(option);
  
  // console.log(date);
  option.addEventListener('click', () => {
    selected.textContent = date;
    setDate(date);
    // console.log(date);
    dropdown.classList.remove('open');
  });
});

selected.addEventListener('click', () => {
  dropdown.classList.toggle('open');
});

// Close dropdown if clicked outside
document.addEventListener('click', (e) => {
  if (!dropdown.contains(e.target)) {
    dropdown.classList.remove('open');
  }
});
// Select date in selectlist 
function setView(view) {
  currentView = view;
  document.querySelectorAll('.toggle-button').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  renderCards();
}

function setDate(date) {
  currentDate = date;
  renderCards();
}

// Render strategy cards
function renderCards() {
  const selectedStrategy = strategyArray.find(strategy => strategy.View === currentView);
  const strategies = selectedStrategy?.Value[currentDate] || [];
  const cardContainer = document.getElementById('cardContainer');
  cardContainer.innerHTML = '';

  if (strategies.length > 0) {
    const strategyCount = strategies.reduce((acc, strategy) => {
      acc[strategy] = (acc[strategy] || 0) + 1;
      return acc;
    }, {});
    // console.log(strategyCount);
    // console.log(Object.entries(strategyCount));

    for (const [name, count] of Object.entries(strategyCount)) {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `<div><h4>${name}</h4><p class="count-strategy">&#9679 ${count} ${count > 1 ? 'Strategies' : 'Strategy'}</p></div>`;
      cardContainer.appendChild(card);
    }
  } else {
    cardContainer.innerHTML = `<div class="emptystate">No strategies available for <div>${currentDate}</div></div>`;
  }
}

// Initial render
renderCards();
