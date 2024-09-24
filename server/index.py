import csv
import random
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
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

load_dotenv()

app = Flask(__name__)

CORS(app)

@app.route('/api/find-olympics', methods=['POST'])
def find_given_olympics():
    olympics = request.json['olympics']
    all_golds = {name: athlete for name, athlete in all_data.items() if athlete['Games'] == olympics and athlete['Medal'] == 'Gold'}
    return jsonify({'all_golds': all_golds})

@app.route('/api/random-olympian', methods=['GET'])
def random_olympian():
    random_name = random.choice(list(all_data.keys()))
    random_athlete = all_data[random_name]
    print(f"Factfile for {random_name}:")
    return jsonify({
        "athlete_name": random_name,
        "summary": f"{random_name} won {random_athlete['Medal']} at the {random_athlete['Games']} Olympic Games in {random_athlete['City']}. Completing in the {random_athlete['Sport']},  {random_name} made their nation of {random_athlete['Team']} proud at the age of {random_athlete['Age']}."})