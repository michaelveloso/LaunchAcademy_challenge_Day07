var gameInfo, teams, league, games;
var makeTeams, improveGames, parseGames, rankTeams, printLeaderboard;

gameInfo = function(){
  return [
   {
     home_team: "Patriots",
     away_team: "Broncos",
     home_score: 7,
     away_score: 3
   },
   {
     home_team: "Broncos",
     away_team: "Colts",
     home_score: 3,
     away_score: 0
   },
   {
     home_team: "Patriots",
     away_team: "Colts",
     home_score: 11,
     away_score: 7
   },
   {
     home_team: "Steelers",
     away_team: "Patriots",
     home_score: 7,
     away_score: 21
   }
 ]
}

// YOUR CODE HERE
getTeamNames = function(games){
  var team_names;
  team_names = [];
  for (var i = 0; i < games.length; i++) {
    if (team_names.indexOf(games[i].home_team) === -1) {
      team_names.push(games[i].home_team);
    };
    if (team_names.indexOf(games[i].away_team) === -1) {
      team_names.push(games[i].away_team);
    };
  };
  return team_names;
}

makeTeams = function(team_names){
  var teams, add_win, add_loss;

  add_win = function(){
    this.wins++;
  };

  add_loss = function(){
    this.losses++;
  };

  teams = [];
  for (var i = 0; i < team_names.length; i++) {
    teams.push({
      name: team_names[i],
      wins: 0,
      losses: 0,
      ranking: undefined,
      games: [],
      add_win: add_win,
      add_loss: add_loss,
    });
  }
  return teams;
}

improveGames = function(games){

  var winner = function(){
    if (this.home_score > this.away_score) {
      return this.home_team;
    } else {
      return this.away_team;
    }
  };

  var loser = function(){
    if (this.home_score > this.away_score) {
      return this.away_team;
    } else {
      return this.home_team;
    }
  };

  var winning_score = function(){
    if (this.home_score > this.away_score) {
      return this.home_score;
    } else {
      return this.away_score;
    }
  };

  var losing_score = function(){
    if (this.home_score > this.away_score) {
      return this.away_score;
    } else {
      return this.home_score;
    }
  };

  for (var i = 0; i < games.length; i++) {
    games[i].winner = winner;
    games[i].loser = loser;
    games[i].winning_score = winning_score;
    games[i].losing_score = losing_score;
  }
}

parseGames = function(games, teams){
  for (var i = 0; i < games.length; i++) {
    winner = games[i].winner();
    loser = games[i].loser();
    for (var j = 0; j < teams.length; j++) {
      if (teams[j].name === winner) {
        teams[j].add_win();
      };
    };
    for (var j = 0; j < teams.length; j++) {
      if (teams[j].name === loser) {
        teams[j].add_loss();
      };
    };
  };
};

rankTeams = function(teams) {
  teams.sort(function(a,b){return b.wins - a.wins});
  for (var i = 0; i < teams.length; i++) {
    teams[i].ranking = (i + 1);
  }
};

printLeaderboard = function(teams) {
  rankTeams(teams);

  var makeSpaces = function(num) {
    spaces = "";
    for (var i = 0; i < num; i++) {
      spaces += " ";
    }
    return spaces;
  }
  var leaderboard_string =  "--------------------------------------------\n";
  var header_name = "| Name       ";
  var header_ranking = "Ranking     ";
  var header_wins = "Wins    ";
  var header_losses = "Losses    |";
  leaderboard_string += header_name + header_ranking + header_wins + header_losses + "\n";
  for (var i = 0; i < teams.length; i++) {
    leaderboard_string += "| " + teams[i].name;
    leaderboard_string += makeSpaces(header_name.length - teams[i].name.length - 2);
    leaderboard_string += teams[i].ranking;
    leaderboard_string += makeSpaces(header_ranking.length - 1);
    leaderboard_string += teams[i].wins;
    leaderboard_string += makeSpaces(header_wins.length - 1);
    leaderboard_string += teams[i].losses;
    leaderboard_string += makeSpaces(header_losses.length - 2);
    leaderboard_string += "|\n";
  }
  leaderboard_string += "--------------------------------------------\n";
  return leaderboard_string;
}
//main program
games = gameInfo();
team_names = getTeamNames(games);
teams = makeTeams(team_names);
improveGames(games);
parseGames(games, teams);
rankTeams(teams);
leaderboard = printLeaderboard(teams);
console.log(leaderboard);
