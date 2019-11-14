# This is the python code to read the data csv file and get all distinct residues and beads.

import csv
import os

Types = []  # Residues
Systems = [] # Beads
Xs = []
Ys = []
Zs = []
Vxs = []
Vys = []
Vzs = []

with open(os.getcwd() + os.sep + 'data' + os.sep+ 'Cal.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    for row in csv_reader:
        if line_count == 0:
            print(f'Column names are {", ".join(row)}')
            line_count += 1
        else:
            Types.append(''.join([i for i in row[0] if not i.isdigit()]))
            Systems.append(row[1])
            pass

print(set(Types))
print(len(set(Types)))
print(set(Systems))
print(len(set(Systems)))