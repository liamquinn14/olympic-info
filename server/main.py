import csv
import random

print("Loading data...")

with open('noc_regions.csv') as regions:
    csvreader = csv.reader(regions)
    nations_dict = {}
    for row in csvreader:
        nations_dict[row[0]] = row[1]

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
    

def find_given_olympics(olympics):
    all_golds = {name: athlete for name, athlete in all_data.items() if athlete['Games'] == olympics and athlete['Medal'] == 'Gold'}
    return all_golds

def random_olympian(chosen_olympics):
    all_golds = find_given_olympics(chosen_olympics)
    random_name = random.choice(list(all_golds.keys()))
    random_athlete = all_golds[random_name]
    print(f"Factfile for {random_name}:")
    print(f"{random_name} won {random_athlete['Medal']} at the {random_athlete['Games']} Olympic Games in {random_athlete['City']}. Completing in the {random_athlete['Sport']},  {random_name} made their nation of {random_athlete['Team']} proud at the age of {random_athlete['Age']}.")

chosen_olympics = input("Name an olympics to find every gold medallist from those games.")
find_given_olympics(chosen_olympics)
see_a_random_gold_medallist = input("Would you like to see a fact file from a random gold medallist? Reply with 'y' or 'n'")
if see_a_random_gold_medallist.lower() == 'y':
    random_olympian(chosen_olympics)