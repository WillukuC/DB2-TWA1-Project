import matplotlib.pyplot as plt
from pymongo import MongoClient
import sys
import os

# This visualization will help us understand how nuclear energy usage has changed over the years and its contribution to overall 
# electricity generation and per capita consumption.

def generate_nuclear_graph(countries):
    # Connect to MongoDB
    client = MongoClient('mongodb+srv://gonzaloba2002:Mt6o7Cd2SzSTM3Mw@cluster0.wwmzyc9.mongodb.net/')
    db = client['energy_consumption']
    collection = db['country_energy']

    nuclear_fields = ['nuclear_consumption', 'nuclear_electricity', 'nuclear_energy_per_capita']
    n_labels = ['Nuclear Consumption', 'Nuclear Electricity', 'Nuclear per Capita']

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
        # Query data for the current country
        data = collection.find({'country': countries[0], 'year': {'$gte': 1990, '$lte': 2015}}).sort([('country', 1), ('year', 1)])

        years = []
        nuclear_data = {field: [] for field in nuclear_fields}
        for doc in data:
            years.append(doc['year'])
            for field in nuclear_fields:
                nuclear_data[field].append(doc.get(field, 0))

        for field, data in nuclear_data.items():
            ax.plot(years, data, label=field.replace('_', ' ').capitalize())

        # Add labels, title, and legend
        ax.set_xlabel('Year')
        ax.set_ylabel('Value')
        ax.set_title(f'Nuclear Energy Trends over Time ({countries[0]})')

        plt.xticks(years, rotation=90)
        plt.legend(labels=n_labels, loc='upper right')
        plt.tight_layout()
        plt.savefig(os.path.join(images_path, 'Nuclear_Energy_Comparison.png'))
        plt.show()

        # Close MongoDB connection
        client.close()
    else:
        # Query and plot data for each country
        for i, country in enumerate(countries):
            # Calculate subplot indices based on number of rows and columns
            row_idx = i // num_cols
            col_idx = i % num_cols

            # Query data for the current country
            data = collection.find({'country': country, 'year': {'$gte': 1990, '$lte': 2015}}).sort([('country', 1), ('year', 1)])

            years = []
            nuclear_data = {field: [] for field in nuclear_fields}
            for doc in data:
                years.append(doc['year'])
                for field in nuclear_fields:
                    nuclear_data[field].append(doc.get(field, 0))

            # Plot the line chart
            for field, data in nuclear_data.items():
                if num_countries <= 2:
                    ax = axes[col_idx]
                else:
                    ax = axes[row_idx, col_idx]

                ax.plot(years, data, label=field.replace('_', ' ').capitalize())

                # Add labels, title, and legend
                ax.set_xlabel('Year')
                ax.set_ylabel('Value')
                ax.set_title(f'{country}')
                ax.legend(labels = n_labels, loc='upper right')

        # Show the line charts
        if num_countries == 3:
            axes[-1, -1].axis('off')

        plt.suptitle('Nuclear Energy Trends by Country')
        plt.tight_layout()
        plt.savefig(os.path.join(images_path, 'Nuclear_Energy_Comparison.png'))
        plt.show()

        # Close MongoDB connection
        client.close()

# Parse arguments
countries = sys.argv[1:]

# Generate line charts
generate_nuclear_graph(countries)