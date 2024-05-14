import pandas as pd
import matplotlib.pyplot as plt
from pymongo import MongoClient
import sys
import numpy as np
import os

arguments = sys.argv

# Initialize arrays
n_years = list(range(2011, 2021))
name_countries = []
amount_2011 = []
amount_2012 = []
amount_2013 = []
amount_2014 = []
amount_2015 = []
amount_2016 = []
amount_2017 = []
amount_2018 = []
amount_2019 = []
amount_2020 = []

def get_plot_comparison_bar_graph(metric):
    # Connect to MongoDB
    client = MongoClient('mongodb+srv://gonzaloba2002:Mt6o7Cd2SzSTM3Mw@cluster0.wwmzyc9.mongodb.net/')
    db = client['energy_consumption']
    collection = db['country_energy']

    # Get the directory of the script
    script_dir = os.path.dirname(os.path.abspath(__file__))

    # Construct the path to the 'images' folder
    images_path = os.path.join(script_dir, '..', 'images')

    # Query the top 5 countries with the highest greenhouse gas emissions for the year 2020
    top_countries_2020 = list(collection.find({'year': 2020}).sort(metric, -1).limit(5))

    # Extract the country names for 2020
    name_countries = [country['country'] for country in top_countries_2020]

    # Add Canada to the name_countries list if it's not already in the top 5
    if 'Canada' not in name_countries:
        name_countries.append('Canada')

    # Loop through the years from 2011 to 2020
    for year in range(2011, 2021):
        # Query the greenhouse gas emissions for the top 5 countries in the current year
        emissions = []
        for country in name_countries:
            country_data = collection.find_one({'year': year, 'country': country})
            if country_data:
                emissions.append(country_data[metric])
            else:
                emissions.append(0)
        
        # Assign the emissions to the corresponding year's amount arrays
        globals()[f'amount_{year}'] = emissions

    # Close the MongoDB connection
    client.close()

    # Setting the positions and width for the bars
    pos = np.arange(len(n_years))
    width = 0.15  # Adjust the width as needed

    # Plotting the bars
    fig, ax = plt.subplots(figsize=(14, 8))

    for i, country in enumerate(name_countries):
        # Get the emissions data for the current country
        emissions = [globals()[f'amount_{year}'][i] for year in n_years]
        
        # Plot the bars for each country
        ax.bar([p + i * width for p in pos], emissions, width, alpha=0.7, label=country)

    # Setting the x and y axis labels
    ax.set_ylabel(f'{metric.capitalize()}')
    ax.set_xlabel('Year')

    # Setting the chart's title
    ax.set_title(f'Top 5 Countries + Canada with highest {metric.capitalize()} (2011-2020)')

    # Setting the position of the x ticks
    ax.set_xticks([p + 2.5 * width for p in pos])

    # Setting the labels for the x ticks
    ax.set_xticklabels(n_years)

    # Adding the legend and showing the plot
    plt.legend(loc='upper right')
    plt.grid()
    plt.savefig(os.path.join(images_path, 'Top_5_Countries_+_Canada_(2011-2020).png'))
    plt.show()

    # Close MongoDB connection
    client.close()

plot_comparison_bar_graph = get_plot_comparison_bar_graph(arguments[1])