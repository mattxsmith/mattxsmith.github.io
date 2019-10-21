let selectedConf;

function winProb(away, home, neutral=false) {
    let h = neutral ? 0 : HCA;
    let tempo = teams[home].tempo*teams[away].tempo/AVG_TEMPO;
    let homeMargin = (teams[home].em - teams[away].em)*tempo/100 + h;
    let homeWinProb = .5*(1+math.erf((homeMargin)/(11*(2)**.5)));
    return homeWinProb;

}

function homeBoole(game, team) {
    if (game.location === 'Home') {
        return true
    } else if (game.location !== 'Home' && game.location !== 'Away') {
        return team < game.opponent;
    }
    else {
        return false;
    }
}

function initSummaryTable() {
    let new_table = document.createElement('table');
    new_table.id = 'summary-table';
    let thead = document.createElement('thead');
    let theadTr = document.createElement('tr');
    let headerCells = ['Team', 'EM', 'Tempo', 'Outright', 'Share']
    for (var i=0; i < headerCells.length; i++) {
        let h = document.createElement('td');
        h.innerText = headerCells[i];
        theadTr.appendChild(h);
    }
    thead.appendChild(theadTr);
    new_table.appendChild(thead);
    return new_table;   
}

function initTeamRow(team) {
    let row = document.createElement('tr');
    let nameCell = document.createElement('td');
    nameCell.innerText = team;
    // nameCell.class = 't';
    let emCell = document.createElement('td');
    emCell.innerText = teams[team].em;
    emCell.class= 'm';
    let tempoCell = document.createElement('td');
    tempoCell.innerText = teams[team].tempo;
    tempoCell.class = 'm';
    let outrightCell = document.createElement('td');
    outrightCell.class = 'm';
    let shareCell = document.createElement('td');
    shareCell.class = 'm';
    row.appendChild(nameCell);
    row.appendChild(emCell);
    row.appendChild(tempoCell);
    row.appendChild(outrightCell);
    row.appendChild(shareCell);

    row.id = 'row-' + team;
    return row;
}

function changeConference(conf) {
    selectedConf = conf;
    let team_names = Object.keys(teams);
    team_names = team_names.filter(x => teams[x].conference === conf);
    team_names.sort((x,y) => teams[y].em-teams[x].em);
    let existing_table = document.querySelector('#summary-table');
    if (existing_table) {
        existing_table.remove();
    }
    let new_table = initSummaryTable();
    
    for (var i=0; i < team_names.length; i++) {
        new_table.appendChild(initTeamRow(team_names[i]));    
    }
    document.body.appendChild(new_table);
}

function populateDropdown() {
    let team_names = Object.keys(teams);
    let confs = team_names.map(x => teams[x].conference);
    // console.log(confs);
    let selectBox = document.querySelector('#conf-select');
    confs = [... new Set(confs)];
    let conf_ranks = {};
    let p5 = ['ACC', 'B10', 'P12', 'SEC'];
    confs.forEach(x => conf_ranks[x] = p5.indexOf(x) === -1 ? 1 : 2);
    conf_ranks['B12'] = 3
    confs.sort((x, y) => conf_ranks[y] - conf_ranks[x]);

    for (var i=0; i < confs.length; i++) {
        let o = document.createElement('option');
        o.value = confs[i];
        o.innerText = confs[i];
        selectBox.appendChild(o);
    }

    let oc = function(event) {
        changeConference(event.target.value);
        sim();    
    }
    selectBox.addEventListener('change', oc);
}

function sim(n=10000) {
    let team_names = Object.keys(teams);
    team_names = team_names.filter(x => teams[x].conference === selectedConf).filter(y => y);
    // console.log(team_names);
    let outright = {};
    team_names.forEach(x => outright[x] = 0);
    let share = {};
    team_names.forEach(x => share[x] = 0);

    let wins;
    for (var i=0; i < n; i++) {
        wins = {};
        team_names.forEach(x => wins[x] = 0);
        for (var j=0; j < team_names.length; j++) {
            let t = team_names[j];
            let games = schedule[t].filter(x => x.conference ).filter(y => homeBoole(y, t));
            for (var k=0; k < games.length; k++) {
                let n = games[k].location === 'Neutral';
                let wp = winProb(games[k].opponent, t, n);
                if (Math.random() <= wp) {
                    wins[t] += 1;
                } else {
                    wins[games[k].opponent] += 1;
                }
            }  
        }
        let maxWins = team_names.map(x => wins[x]).reduce((f, g) => Math.max(f, g));
        let winners = team_names.filter(x => wins[x] === maxWins);
        winners.forEach(x => share[x] +=1);
        if (winners.length === 1) {
            outright[winners[0]] += 1
        }
    }
    team_names.forEach(x => outright[x] = Math.round((1.0*outright[x]/n)*1000)/1000);
    team_names.forEach(x => share[x] = Math.round((1.0*share[x]/n)*1000)/1000);
    team_names.forEach(x => document.getElementById('row-' + x).querySelectorAll('td')[3].innerText = outright[x]);
    team_names.forEach(x => document.getElementById('row-' + x).querySelectorAll('td')[4].innerText = share[x]);

}

window.onload = function() {
    changeConference('B12');
    sim();
    populateDropdown();
}