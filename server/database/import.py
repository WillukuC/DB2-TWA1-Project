import pandas as pd
import pymongo as py
import sys

arguments = sys.argv

def import_data_csv(owid, country):
    country = pd.read_csv('countries.csv')
    owid = pd.read_csv('owid-energy-data_A_S.csv')
    filtered = owid[owid['country'].isin(country['country'])]

    client = py.MongoClient('mongodb+srv://gonzaloba2002:Mt6o7Cd2SzSTM3Mw@cluster0.wwmzyc9.mongodb.net/')
    db = client['energy_consumption']
    collection = db['country_energy']

    data = filtered.to_dict('records')

    collection.insert_many(data)

import_data_csv(arguments[1], arguments[2])