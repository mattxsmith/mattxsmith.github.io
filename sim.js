let teams = {
    KSU: {wins: 9, tempo: 63.6, em: 17.59},
    KU: {wins: 9, tempo: 70.2, em: 22.44},
    TTU: {wins: 9, tempo: 66.7, em: 25.56},
    ISU: {wins: 8, tempo: 67.7, em: 23.78},
    BU: {wins: 7, tempo: 65.0, em: 16.23},
    UT: {wins: 7, tempo: 65.1, em: 18.48},
    TCU: {wins: 5, tempo: 68.9, em: 15.72},
    OU: {wins: 4, tempo: 69.1, em: 16.22},
    OSU: {wins: 2, tempo: 65.4, em: 6.4},
    WVU: {wins: 2, tempo: 69.6, em: 4.73}
};

function setProbs() {
    let table = document.getElementsByClassName('games')[0];
    let games = table.getElementsByTagName('tr');
    
    for (let i=1; i<games.length; i++) {
        let game = games[i];
        let awayTeam = game.getElementsByTagName('td')[1].innerText;
        let homeTeam = game.getElementsByTagName('td')[2].innerText;
        let tempo = teams[homeTeam].tempo*teams[awayTeam].tempo/70.2;
        let homeMargin = (teams[homeTeam].em - teams[awayTeam].em)*tempo/100 + 3.75;
        let homeWinProb = .5*(1+math.erf((homeMargin)/(11*(2)**.5)));
        homeWinProb = Math.round(homeWinProb*1000)/1000;
        let textCell = game.getElementsByTagName('td')[3];
        let textBox = textCell.getElementsByTagName('input')[0];
        textBox.value = homeWinProb;
    }
}

function sim(n=10000) {
    let table = document.getElementsByClassName('games')[0];
    let games = table.getElementsByTagName('tr');
    let gameProbs = [];
    for (let i=1; i<games.length; i++) {
        let game = games[i];
        let awayTeam = game.getElementsByTagName('td')[1].innerText;
        let homeTeam = game.getElementsByTagName('td')[2].innerText;
        let textCell = game.getElementsByTagName('td')[3];
        let homeWinProb = textCell.getElementsByTagName('input')[0].value;
        gameProbs.push({homeTeam: homeTeam, awayTeam: awayTeam, homeWinProb: homeWinProb});
    }
    console.log(gameProbs);

    for (let i=0; i<n; i++) {
        wins = {};
        Object.keys(teams).forEach(x => wins[x] = teams[x].wins);
        for (let g=0; g<gameProbs.length; g++) {
            if (Math.random() < gameProbs[g].homeWinProb) wins[gameProbs[g].homeTeam] += 1
            else wins[gameProbs[g].awayTeam] += 1
        }
    }
    console.log('asf');
}

setProbs();
sim();








