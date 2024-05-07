import pandas as pd
import matplotlib.pyplot as plt
import sys

df = pd.read_csv('./testing/tesla-stock-price.csv')
arguments = sys.argv
x = df['date']
y = df['close']

# Create a Figure with custom parameters
fig = plt.figure(figsize=(8,6), dpi=100, facecolor='lightblue', edgecolor='black', linewidth=2, frameon=True)
 
# Add an Axes to the Figure
ax = fig.add_subplot()

ax.plot(x, y, marker='o', linestyle='-', color='red', label='Data')
 
# Set labels and title
ax.set_title('Example Plot')
ax.set_xlabel('X-axis label')
ax.set_ylabel('Y-axis label')
ax.grid(True) # will put background grid
 
#Add a legend
ax.legend()
# Save the plot
plt.savefig('simple_plot.png', dpi=300, format='png', transparent=False, bbox_inches='tight', pad_inches=0.1)
