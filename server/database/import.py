import pandas as pd
import pymongo as py
import sys

arguments = sys.argv

def import_data_csv(owid, country):
    country_data = pd.read_csv(country)
    owid_data = pd.read_csv(owid)
    filtered = owid_data[owid_data['country'].isin(country_data['country'])]

    client = py.MongoClient('mongodb+srv://gonzaloba2002:Mt6o7Cd2SzSTM3Mw@cluster0.wwmzyc9.mongodb.net/')
    db = client['energy_consumption']

    collection = db['country_energy']

    existing_countries = collection.distinct("country")
    
    new_data = filtered[~filtered['country'].isin(existing_countries)]

    if not new_data.empty:
        new_data_records = new_data.to_dict('records')
        collection.insert_many(new_data_records)
        print("New data added successfully.")
    else:
        data = filtered.to_dict('records')
        collection.insert_many(data)

import_data_csv(arguments[1], arguments[2])