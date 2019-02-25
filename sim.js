let teams = {
    KSU: {wins: 11, em: 19.31, tempo: 63.8},
    KU: {wins:   9, em: 21.14, tempo: 70.3},
    TTU: {wins: 10, em: 26.93, tempo: 66.7},
    ISU: {wins:  8, em: 22.54, tempo: 68.1},
    BU: {wins:   9, em: 16.82, tempo: 65.3},
    UT: {wins:   7, em: 18.57, tempo: 65.5},
    TCU: {wins:  6, em: 15.38, tempo: 69.5},
    OU: {wins:   5, em: 16.33, tempo: 69.4},
    OSU: {wins:  3, em:  5.59, tempo: 65.8},
    WVU: {wins:  2, em:  4.38, tempo: 69.9}
};

const HCA = 3.5;
const AVG_TEMPO = 67.9;
const round = (num, dec) => Math.round(num*10**dec)/10**dec;
const contenders = ["KSU", "KU", "TTU"];

function setProbs() {
    let table = document.getElementById('games');
    let games = table.getElementsByTagName('tr');

    for (let i=1; i<games.length; i++) {
        let game = games[i];
        let awayTeam = game.getElementsByTagName('td')[1].innerText;
        let homeTeam = game.getElementsByTagName('td')[2].innerText;
        let tempo = teams[homeTeam].tempo*teams[awayTeam].tempo/AVG_TEMPO;
        let homeMargin = (teams[homeTeam].em - teams[awayTeam].em)*tempo/100 + HCA;
        let homeWinProb = .5*(1+math.erf((homeMargin)/(11*(2)**.5)));
        homeWinProb = round(homeWinProb,3);
        let textCell = game.getElementsByTagName('td')[3];
        let textBox = textCell.getElementsByTagName('input')[0];
        textBox.value = homeWinProb;
        let contenderCount = contenders.map(x => [awayTeam, homeTeam].includes(x)).reduce((x,y) => x+y);
        if (contenderCount == 2) game.style = 'background-color: #009900'
        else if (contenderCount == 1) game.style = 'background-color: #99ff99'
    }
}

function sim(n=25000) {
    console.time('sim');
    let table = document.getElementById('games');
    let games = table.getElementsByTagName('tr');
    let gameProbs = [];
    let avgWins = {};
    Object.keys(teams).forEach(x => avgWins[x] = teams[x].wins);
    for (let i=1; i<games.length; i++) {
        let game = games[i];
        let awayTeam = game.getElementsByTagName('td')[1].innerText;
        let homeTeam = game.getElementsByTagName('td')[2].innerText;
        let textCell = game.getElementsByTagName('td')[3];
        let homeWinProb = textCell.getElementsByTagName('input')[0].value;
        avgWins[homeTeam] += +homeWinProb;
        avgWins[awayTeam] += 1- +homeWinProb;
        gameProbs.push({homeTeam: homeTeam, awayTeam: awayTeam, homeWinProb: homeWinProb});
    }
    Object.keys(avgWins).forEach(x => avgWins[x] = round(avgWins[x], 1));

    let champsCount = new Counter();
    let outrightCount = new Counter();
    for (let i=0; i<n; i++) {
        let wins = {};
        Object.keys(teams).forEach(x => wins[x] = teams[x].wins);
        for (let g=0; g<gameProbs.length; g++) {
            if (Math.random() < gameProbs[g].homeWinProb) wins[gameProbs[g].homeTeam] += 1
            else wins[gameProbs[g].awayTeam] += 1
        }
        let championWins = Math.max.apply(null, Object.values(wins));
        let champions = Object.keys(wins).filter(x => wins[x] == championWins);
        champsCount.update(champions);
        if (champions.length == 1) outrightCount.update(champions)
    }
    champsCount.getElements().forEach(x => champsCount.count[x] /= n);
    outrightCount.getElements().forEach(x => outrightCount.count[x] /= n);
    console.timeEnd('sim')
    updateSummary(avgWins, champsCount.count, outrightCount.count);
    sortSummary();
}

function Counter() {
    this.count = {};
    this.increment = function(val) {
        if (Object.keys(this.count).indexOf(val) == -1) this.count[val] = 1
        else this.count[val] += 1
    };
    this.update = function(additions) {
        if (typeof additions == 'string') this.increment(additions)
        else {
           for (let i=0; i<additions.length; i++) {
                this.increment(additions[i]);
            }
        };
    };
    this.getElements = () => Object.keys(this.count);
}

function updateSummary(wins, champ, outright) {
    let summary = document.getElementById('summary');
    let rows = summary.getElementsByTagName('tr');
    for (let i=1; i<rows.length; i++) {
        let row = rows[i];
        let cells = row.getElementsByTagName('td')
        let team = cells[0].innerText;
        cells[1].innerText = wins[team];
        cells[2].innerText = round(champ[team], 3) || 0;
        cells[3].innerText = round(outright[team], 3) || 0;
    }
}

function sortSummary() {
    let summary = document.getElementById('summary');
    let tableBody = summary.getElementsByTagName('tbody')[0];
    let rows = tableBody.getElementsByTagName('tr');
    let newRows = [];
    let newBody = document.createElement('tbody');
    for (let i=0; i<rows.length; i++) {
        let row = rows[i];
        newRows.push(row);
    }
    newRows = newRows.sort((x,y) =>
        +y.getElementsByTagName('td')[2].innerText-
        +x.getElementsByTagName('td')[2].innerText
    );
    for (let rowNum in newRows) newBody.appendChild(newRows[rowNum]);
    summary.removeChild(tableBody);
    summary.appendChild(newBody);
}

setProbs();
sim();








