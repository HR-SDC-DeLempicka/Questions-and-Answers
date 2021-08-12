# ETL Process

* I first analyzed the csv files to determine what the names of columns are
* I analyzed what tables were needed and the relationship between them
* I created three tables within my atelier database
* I then created three more tables that are copies of those three tables
* I loaded the data into the copies of the tables from the csvs
* Then I transferred the data from the copies into the actual tables, excluding the id so the actual tables would correctly increment their ids