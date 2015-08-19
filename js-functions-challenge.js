var gameInfo, teams, league, games;
var constructTeam, makeTeams, constructGames, parseGames, rankTeams, printLeaderboard, teamSummaries;

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

constructTeam = function(team_name) {
  var team, add_win, add_loss, summary;

  add_win = function(){
    this.wins++;
  };

  add_loss = function(){
    this.losses++;
  };

  summary = function(){
    var summary_string = "";
    summary_string += "Name: " + this.name + "\n";
    summary_string += "Record: " + this.wins + "-" + this.losses + "\n";
    summary_string += "Ranking: " + this.ranking + "\n";
    for (var i = 0; i < this.games.length; i++) {
      var this_game = this.games[i];
      summary_string += "Game " + (i + 1) + ": ";
      summary_string += this_game.winner() + " d. " + this_game.loser() + " ";
      summary_string += this_game.winning_score() + " - " + this_game.losing_score() + "\n";
    }
    summary_string += "\n";
    return summary_string;
  };

  team = {
    name: team_name,
    wins: 0,
    losses: 0,
    ranking: undefined,
    games: [],
    add_win: add_win,
    add_loss: add_loss,
    summary: summary
  };

  return team;
}

makeTeams = function(team_names){
  var teams

  teams = [];
  for (var i = 0; i < team_names.length; i++) {
    teams.push(constructTeam(team_names[i]));
  }
  return teams;
}

constructGames = function(games){

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
        teams[j].games.push(games[i]);
      };
    };
    for (var j = 0; j < teams.length; j++) {
      if (teams[j].name === loser) {
        teams[j].add_loss();
        teams[j].games.push(games[i]);
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

teamSummaries = function(teams) {
  var summary_string = "";
  for (var i = 0; i < teams.length; i++) {
    summary_string += teams[i].summary();
  };
  return summary_string;
}

//main program
games = gameInfo();
team_names = getTeamNames(games);
teams = makeTeams(team_names);
constructGames(games);
parseGames(games, teams);
leaderboard = printLeaderboard(teams);
console.log(leaderboard);
console.log(teamSummaries(teams));
