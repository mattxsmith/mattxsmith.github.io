# creates a js file that has all the data 
import requests
import bs4
import json
from urllib.parse import quote_plus

html = requests.get('https://kenpom.com/').text
b = bs4.BeautifulSoup(html, 'html.parser')

ratings_table = b.find('table', {'id': 'ratings-table'})
teams = []
for row in ratings_table.findAll('tr'):
    team = ''
    team_link = row.find('a')
    cells = row.find_all('td')
    if len(cells) > 7 and team_link:
        team = team_link.text
        teams.append(team)

req_header = {'cookie': 'PHPSESSID=k316bpo3p7lbv65m5rh5ogcbo6'}
team_scheds = {}

for team in teams[:15]:
        html = requests.get('https://kenpom.com/team.php?team={}'.format(quote_plus(team)), headers=req_header).text
        b = bs4.BeautifulSoup(html, 'lxml')
        games = b.find_all('tr', {'class': 'un'})
        team_games = []
        for game in games:
            cells = game.find_all('td')
            date = cells[0].find('a').text
            tcell_link = cells[3].find('a')
            if tcell_link:
                opponent = tcell_link.text
            else:
                opponent = cells[3].text
            loc_link = cells[7].find('a')
            if loc_link:
                location = loc_link.text
            else:
                location = cells[7].text
            conf_cell = cells[9].find('b')
            if conf_cell:
                conf = True
            else:
                conf = False
            game_dict = {}
            game_dict['date'] = date
            game_dict['opponent'] = opponent
            game_dict['location'] = location
            game_dict['conference'] = conf
            team_games.append(game_dict)
        team_scheds[team] = team_games


j = json.dumps(team_scheds)
f = open('team_schedules.js', 'w')
f.write('var schedule = ' + j)
f.close()































