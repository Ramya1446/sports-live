
// Mock data for demonstration
const mockMatches = [
  {
    id: 1,
    homeTeam: { name: "Arsenal", logo: "🔴" },
    awayTeam: { name: "Chelsea", logo: "🔵" },
    utcDate: "2024-12-02T15:00:00Z",
    status: "SCHEDULED",
    competition: { name: "Premier League" }
  },
  {
    id: 2,
    homeTeam: { name: "Liverpool", logo: "🔴" },
    awayTeam: { name: "Manchester City", logo: "💙" },
    utcDate: "2024-12-03T17:30:00Z",
    status: "SCHEDULED",
    competition: { name: "Premier League" }
  },
  {
    id: 3,
    homeTeam: { name: "Barcelona", logo: "🔵" },
    awayTeam: { name: "Real Madrid", logo: "⚪" },
    utcDate: "2024-12-04T20:00:00Z",
    status: "SCHEDULED",
    competition: { name: "La Liga" }
  },
  {
    id: 4,
    homeTeam: { name: "Bayern Munich", logo: "🔴" },
    awayTeam: { name: "Borussia Dortmund", logo: "🟡" },
    utcDate: "2024-12-05T18:30:00Z",
    status: "SCHEDULED",
    competition: { name: "Bundesliga" }
  },
  {
    id: 5,
    homeTeam: { name: "PSG", logo: "🔵" },
    awayTeam: { name: "Marseille", logo: "💙" },
    utcDate: "2024-12-06T21:00:00Z",
    status: "SCHEDULED",
    competition: { name: "Ligue 1" }
  },
  {
    id: 6,
    homeTeam: { name: "Juventus", logo: "⚫" },
    awayTeam: { name: "AC Milan", logo: "🔴" },
    utcDate: "2024-12-07T19:45:00Z",
    status: "SCHEDULED",
    competition: { name: "Serie A" }
  }
];

// Format date function
function formatDate(utcDate) {
  const date = new Date(utcDate);
  return {
    date: date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    }),
    time: date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  };
}

// Create match card HTML
function createMatchCard(match, index) {
  const { date, time } = formatDate(match.utcDate);
  
  return `
    <div class="match-card" style="animation-delay: ${index * 100}ms">
      <div class="match-card-overlay"></div>
      
      <div class="match-card-header">
        <div class="match-header-content">
          <div class="competition-badge">
            ${match.competition.name}
          </div>
          <div class="match-datetime">
            <div class="match-date">
              <svg class="datetime-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              <span>${date}</span>
            </div>
            <div class="match-time">
              <svg class="datetime-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>${time}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="match-card-content">
        <div class="teams-container">
          <!-- Home Team -->
          <div class="team-info home-team">
            <div class="team-logo">${match.homeTeam.logo}</div>
            <div class="team-details">
              <h3 class="team-name">${match.homeTeam.name}</h3>
              <p class="team-type">Home</p>
            </div>
          </div>

          <!-- VS Divider -->
          <div class="vs-divider-container">
            <div class="vs-divider-line"></div>
            <div class="vs-divider-text-container">
              <span class="vs-divider-text">VS</span>
            </div>
          </div>

          <!-- Away Team -->
          <div class="team-info away-team">
            <div class="team-logo">${match.awayTeam.logo}</div>
            <div class="team-details">
              <h3 class="team-name">${match.awayTeam.name}</h3>
              <p class="team-type">Away</p>
            </div>
          </div>
        </div>

        <!-- Status -->
        <div class="match-footer">
          <div class="match-status-container">
            <div class="status-badge">${match.status}</div>
            <button class="view-details-btn" onclick="viewMatchDetails(${match.id})">
              View Details →
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// View match details function
function viewMatchDetails(matchId) {
  console.log(`Viewing details for match ${matchId}`);
  // You can implement actual navigation or modal here
  alert(`Match details for match ID: ${matchId}`);
}

// Fetch and display matches
async function fetchMatches() {
  const loadingContainer = document.getElementById('loadingContainer');
  const errorContainer = document.getElementById('errorContainer');
  const mainContainer = document.getElementById('mainContainer');
  const matchesGrid = document.getElementById('matchesGrid');
  const matchesCount = document.getElementById('matchesCount');
  const teamsCount = document.getElementById('teamsCount');

  try {
    // Show loading state
    loadingContainer.style.display = 'flex';
    errorContainer.style.display = 'none';
    mainContainer.style.display = 'none';

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In a real implementation, you would fetch from the API:
    // const response = await fetch('https://api.football-data.org/v4/competitions/PL/matches');
    // const data = await response.json();
    // const matches = data.matches;

    // For demo, use mock data
    const matches = mockMatches;

    // Update stats
    matchesCount.textContent = matches.length;
    teamsCount.textContent = matches.length * 2;

    // Generate match cards
    const matchCards = matches.map((match, index) => createMatchCard(match, index)).join('');
    matchesGrid.innerHTML = matchCards;

    // Hide loading and show main content
    loadingContainer.style.display = 'none';
    mainContainer.style.display = 'block';

  } catch (error) {
    console.error('Error fetching matches:', error);
    
    // Show error state
    loadingContainer.style.display = 'none';
    mainContainer.style.display = 'none';
    errorContainer.style.display = 'flex';
    
    const errorText = document.getElementById('errorText');
    errorText.textContent = 'Failed to fetch matches';
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  fetchMatches();
});

// Optional: Add keyboard navigation for accessibility
document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter' || event.key === ' ') {
    const focusedElement = document.activeElement;
    if (focusedElement.classList.contains('view-details-btn')) {
      focusedElement.click();
    }
  }
});
