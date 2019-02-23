let teams = {
    KSU: {wins: 10, tempo: 63.6, em: 18.05},
    KU: {wins: 9, tempo: 70.4, em: 22.32},
    TTU: {wins: 9, tempo: 66.9, em: 25.39},
    ISU: {wins: 8, tempo: 67.9, em: 22.91},
    BU: {wins: 8, tempo: 65.2, em: 16.99},
    UT: {wins: 7, tempo: 65.4, em: 18.58},
    TCU: {wins: 5, tempo: 69.1, em: 15.15},
    OU: {wins: 4, tempo: 69.3, em: 16.28},
    OSU: {wins: 3, tempo: 65.6, em: 6.86},
    WVU: {wins: 2, tempo: 69.6, em: 4.08}
};

const schedule = [
    ['Feb 23', 'UT', 'OU'],
    ['Feb 23', 'ISU', 'TCU'],
    ['Feb 23', 'WVU', 'BU'],
    ['Feb 23', 'OSU', 'KSU'],
    ['Feb 23', 'KU', 'TTU'],
    ['Feb 25', 'OU', 'ISU'],
    ['Feb 25', 'KSU', 'KU'],
    ['Feb 26', 'TCU', 'WVU'],
    ['Feb 27', 'OSU', 'TTU'],
    ['Feb 27', 'UT', 'BU'],
    ['Mar 2', 'KU', 'OSU'],
    ['Mar 2', 'WVU', 'OU'],
    ['Mar 2', 'ISU', 'UT'],
    ['Mar 2', 'TTU', 'TCU'],
    ['Mar 2', 'BU', 'KSU'],
    ['Mar 4', 'UT', 'TTU'],
    ['Mar 4', 'KSU', 'TCU'],
    ['Mar 5', 'KU', 'OU'],
    ['Mar 6', 'ISU', 'WVU'],
    ['Mar 6', 'OSU', 'BU'],
    ['Mar 9', 'TCU', 'UT'],
    ['Mar 9', 'BU', 'KU'],
    ['Mar 9', 'TTU', 'ISU'],
    ['Mar 9', 'WVU', 'OSU'],
    ['Mar 9', 'OU', 'KSU']
]

const HCA = 3.5;
const AVG_TEMPO = 67.9;
const round = (num, dec) => Math.round(num*10**dec)/10**dec;
let contenders = ["KSU", "KU", "ISU", "TTU"];

function setSchedule() {
    let table = document.getElementById('games');
}

function setProbs() {
    let table = document.getElementById('games');

    for (let g of schedule) {
        let row = document.createElement('tr');
        let dateCell = document.createElement('td');
        let awayCell = document.createElement('td');
        let homeCell = document.createElement('td');
        let probCell = document.createElement('td');
        dateCell.innerText = g[0];
        awayCell.innerText = g[1];
        homeCell.innerText = g[2];
        let probInput = document.createElement('input');
        probInput.type = 'text';
        probInput.size = '5';
        probInput.onchange = 'sim()';
        probCell.appendChild(probInput);
        row.appendChild(dateCell);
        row.appendChild(awayCell);
        row.appendChild(homeCell);
        row.appendChild(probCell);
        table.appendChild(row);
    }
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

function sim(n=20000) {
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
        wins = {};
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
        cells = row.getElementsByTagName('td')
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








