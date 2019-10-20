function initSummaryTable() {
    let new_table = document.createElement('table');
    new_table.id = '#summary-table';
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
    let emCell = document.createElement('td');
    emCell.innerText = teams[team].em;
    let tempoCell = document.createElement('td');
    tempoCell.innerText = teams[team].tempo;
    let outrightCell = document.createElement('td');
    let shareCell = document.createElement('td');
    row.appendChild(nameCell);
    row.appendChild(emCell);
    row.appendChild(tempoCell);
    row.appendChild(outrightCell);
    row.appendChild(shareCell);

    return row;
}

function changeConference(conf) {
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

    selectBox.addEventListener('change', () => console.log(this));
}