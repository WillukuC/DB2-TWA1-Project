import csv
import os
import json

# Function to read the countries from a CSV file and return them as a list
def read_countries_from_csv(file_path):
    countries = []
    with open(file_path, mode='r', newline='', encoding='utf-8') as csvfile:
        csvreader = csv.reader(csvfile)
        # Skip the header
        next(csvreader)
        # Read each country from the CSV and add it to the list
        for row in csvreader:
            countries.append(row[0])
    return countries

# Specify the path to your CSV file
csv_file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)),'countries.csv')

# Get the list of countries
countries_list = read_countries_from_csv(csv_file_path)

# Print the list of countries
print(json.dumps(countries_list))
