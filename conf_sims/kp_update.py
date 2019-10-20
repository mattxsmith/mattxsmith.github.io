# creates a js file that has all the data 
import requests
import bs4
import json

html = requests.get('https://kenpom.com/').text
b = bs4.BeautifulSoup(html, 'html.parser')

ratings_table = b.find('table', {'id': 'ratings-table'})
team_data = {}
for row in ratings_table.findAll('tr'):
    team = ''
    team_link = row.find('a')
    cells = row.find_all('td')
    if len(cells) > 7 and team_link:
        team = team_link.text
        em = cells[4].text
        temp = cells[9].text
        conf = cells[2].find('a').text
        a = {"em": em, "tempo": temp, "conference": conf}
        team_data[team] = a

avg_tempo = sum([float(team_data[i]['tempo']) for i in team_data.keys()])/len(team_data)
j = json.dumps(team_data)

f = open('data.js', 'w')
f.write('var teams = ' + j + ';\n')
f.write('var AVG_TEMPO = ' + str(avg_tempo) + ';\n')
f.write('var HCA = 3.5;')



