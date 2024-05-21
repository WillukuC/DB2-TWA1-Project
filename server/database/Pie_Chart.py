import matplotlib.pyplot as plt
from pymongo import MongoClient
import sys
import os

def generate_pie_charts(year, countries):
    # Connect to MongoDB
    client = MongoClient('mongodb+srv://gonzaloba2002:Mt6o7Cd2SzSTM3Mw@cluster0.wwmzyc9.mongodb.net/')
    db = client['energy_consumption']
    collection = db['country_energy']

    energies = ['biofuel_consumption', 'solar_consumption', 'hydro_consumption', 'wind_consumption']
    e_label = ['Biofuel', 'Solar', 'Hydro', 'Wind']

    # Get the directory of the script
    script_dir = os.path.dirname(os.path.abspath(__file__))

    # Construct the path to the 'images' folder
    images_path = os.path.join(script_dir, '..', 'images')

    # Initialize figure for subplots
    num_countries = len(countries)
    if num_countries == 1:
        fig, ax = plt.subplots(figsize=(8, 8))
    else:
        num_rows = 1 if num_countries <= 2 else 2
        num_cols = num_countries if num_countries <= 2 else 2
        fig, axes = plt.subplots(num_rows, num_cols, figsize=(5*num_cols, 5*num_rows))

    if num_countries <= 1:
        # Query sustainable energy consumption data for the specified year and country
        country = countries[0]
        data = collection.find_one({'country': country, 'year': int(year)})

        if data:
            energy_values = [data[energy] for energy in energies if energy in data]
            if len(energy_values) < 4:
                print(f'Not enough data available for {country} in {year}.')
                return

            # Plot pie chart for the current country
            
            ax.pie(energy_values, autopct='%1.1f%%', startangle=140)
            ax.legend(labels = e_label, loc='upper right')
            plt.suptitle(f'Sustainable Energy Consumption {country} ({year})')
            plt.tight_layout()
            plt.savefig(os.path.join(images_path, 'Country_Consumption.png'))
            
        else:
            print(f"No data found for {country} in {year}")
    else:
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

        # Show the pie charts
        if num_countries == 3:
            axes[-1, -1].axis('off')
            
        ax.legend(labels = e_label, loc='upper right')
        plt.suptitle(f'Sustainable Energy Consumption Distribution by Country ({year})')
        plt.tight_layout()
        plt.savefig(os.path.join(images_path, 'Country_Consumption.png'))
        print('Country_Consumption.png')

    # Close MongoDB connection
    client.close()

# Parse arguments
year = int(sys.argv[1])
countries = sys.argv[2:]

# Generate pie charts
generate_pie_charts(year, countries)