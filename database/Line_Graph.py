import pandas as pd
import matplotlib.pyplot as plt
from pymongo import MongoClient
import sys

arguments = sys.argv

def get_fossil_energy_data(country_name):
    # Connect to MongoDB
    client = MongoClient('mongodb+srv://gonzaloba2002:Mt6o7Cd2SzSTM3Mw@cluster0.wwmzyc9.mongodb.net/')
    db = client['energy_consumption']
    collection = db['country_energy']

    # Query data for the specified country
    cursor = collection.find({'country': country_name})

    # Convert cursor to DataFrame
    df = pd.DataFrame(list(cursor))

    # Close MongoDB connection
    client.close()

    # Filter relevant columns (fossil energy consumption)
    df = df[['year', 'coal_consumption', 'oil_consumption', 'gas_consumption']]

    # Set year as index
    df.set_index('year', inplace=True)

    plt.figure(figsize=(10, 6))
    plt.plot(df.index, df['coal_consumption'], label='Coal Consumption')
    plt.plot(df.index, df['oil_consumption'], label='Oil Consumption')
    plt.plot(df.index, df['gas_consumption'], label='Gas Consumption')

    # Add labels and title
    plt.title(f'Fossil Energy Consumption in {country_name}')
    plt.xlabel('Year')
    plt.ylabel('Energy Consumption (TWh)')

    # Add legend
    plt.legend()

    # Show plot
    plt.grid(True)
    plt.tight_layout()
    plt.show()


fossil_energy_data = get_fossil_energy_data(arguments[1])

