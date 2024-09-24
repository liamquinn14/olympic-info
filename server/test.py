import csv

with open('athlete_events.csv') as athletes:
    csvreader = csv.DictReader(athletes)
    all_data = {}
    for row in csvreader:
        if row['Medal'] != 'NA':
            all_data[row['Name']] = {
                'Sex': row['Sex'],
                'Age': row['Age'],
                'Team': row['Team'],
                'NOC': row['NOC'],
                'Games': row['Games'],
                'Year': row['Year'],
                'Season': row['Season'],
                'City': row['City'],
                'Sport': row['Sport'],
                'Event': row['Event'],
                'Medal': row['Medal']
            }
        else:
            continue

all_games = [entry['Games'] for entry in all_data.values()]
unique_games = set(all_games)
sorted_games = sorted(unique_games)
print(sorted_games)