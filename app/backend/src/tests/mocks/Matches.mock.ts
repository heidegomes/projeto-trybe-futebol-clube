const matches = [
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 41,
    "homeTeamId": 16,
    "homeTeamGoals": 2,
    "awayTeamId": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Internacional"
    }
  }
]

const matchesInProgress = [
  {
    "id": 41,
    "homeTeamId": 16,
    "homeTeamGoals": 2,
    "awayTeamId": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Internacional"
    }
  },
  {
    "id": 42,
    "homeTeamId": 6,
    "homeTeamGoals": 1,
    "awayTeamId": 1,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeTeam": {
      "teamName": "Ferroviária"
    },
    "awayTeam": {
      "teamName": "Avaí/Kindermann"
    }
  }
]

const matchesFinished = [
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 2,
    "homeTeamId": 9,
    "homeTeamGoals": 1,
    "awayTeamId": 14,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "Internacional"
    },
    "awayTeam": {
      "teamName": "Santos"
    }
  }
]

const match41 = {
  "id": 41,
  "homeTeamId": 16,
  "homeTeamGoals": 2,
  "awayTeamId": 9,
  "awayTeamGoals": 0,
  "inProgress": true,
  "homeTeam": {
    "teamName": "São Paulo"
  },
  "awayTeam": {
    "teamName": "Internacional"
  }
}

const resultUpdated = {
  "homeTeamGoals": 3,
  "awayTeamGoals": 1
}

const reqNewMatch = {
  "homeTeamId": 16, // O valor deve ser o id do time
  "awayTeamId": 8, // O valor deve ser o id do time
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
}

const resNewMatch = {
  "id": 1,
  "homeTeamId": 16,
  "homeTeamGoals": 2,
  "awayTeamId": 8,
  "awayTeamGoals": 2,
  "inProgress": true,
}

const twoSameTeams = {
  "homeTeamId": 16, // O valor deve ser o id do time
  "awayTeamId": 16, // O valor deve ser o id do time
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
}

const nonExistentTeam = {
  "homeTeamId": 160, // O valor deve ser o id do time
  "awayTeamId": 80, // O valor deve ser o id do time
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
}
export {
  matches,
  matchesInProgress,
  matchesFinished,
  resultUpdated,
  match41,
  reqNewMatch,
  resNewMatch,
  twoSameTeams,
  nonExistentTeam
};