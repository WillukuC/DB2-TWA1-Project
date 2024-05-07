import matplotlib.pyplot as plt
from pymongo import MongoClient
import sys

def generate_pie_charts(year, countries):
    # Connect to MongoDB
    client = MongoClient('mongodb+srv://gonzaloba2002:Mt6o7Cd2SzSTM3Mw@cluster0.wwmzyc9.mongodb.net/')
    db = client['energy_consumption']
    collection = db['country_energy']

    energies = ['biofuel_consumption', 'solar_consumption', 'hydro_consumption', 'wind_consumption']
    e_label = ['Biofuel', 'Solar', 'Hydro', 'Wind']

    # Initialize figure for subplots
    num_countries = len(countries)
    num_rows = 1 if num_countries <= 2 else 2
    num_cols = num_countries if num_countries <= 2 else 2
    fig, axes = plt.subplots(num_rows, num_cols, figsize=(5*num_cols, 5*num_rows))

    # Query sustainable energy consumption data for the specified year and countries
    for i, country in enumerate(countries):
        # Calculate subplot indices based on number of rows and columns
        row_idx = i // num_cols
        col_idx = i % num_cols

        # Query data for the current country and year
        data = collection.find_one({'country': country, 'year': int(year)})

        if data:
            energy_values = [data[energy] for energy in energies if energy in data]
 
            if len(energy_values) < 4:
                print(f'Not enough data available for {country} in {year}.')
                continue

            # Plot pie chart for the current country
            if num_countries <= 2:
                ax = axes[col_idx]
            else:
                ax = axes[row_idx, col_idx]
            
            ax.pie(energy_values, autopct='%1.1f%%', startangle=140)
            ax.set_title(f'{country}')
        else:
            print(f"No data found for {country} in {year}")

    # Show the pie charts
    plt.suptitle(f'Sustainable Energy Consumption Distribution by Country ({year})')
    plt.legend(labels = e_label, loc='upper right')
    plt.tight_layout()
    plt.show()

    # Close MongoDB connection
    client.close()

# Parse arguments
year = int(sys.argv[1])
countries = sys.argv[2:]

# Generate pie charts
generate_pie_charts(year, countries)