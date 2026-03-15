# event_fukui_data

This project is a web scraper that extracts event data from the website "www.fuku-e.com" and saves it as CSV files.

## Features
- Fetches event data from the website and saves it in a local cache to avoid redundant requests
- Extracts relevant event information such as title, description, date, location, price, and contact details
- Combines the extracted data with a pre-existing CSV file and saves the combined data in a new CSV file

## Requirements
- Deno runtime environment

## Usage
1. Clone the repository:
```
git clone https://github.com/code4fukui/event_fukui_data.git
```
2. Change into the project directory:
```
cd event_fukui_data
```
3. Run the script:
```
deno run --allow-net --allow-read --allow-write download.js
```
This will generate the `data/event_fukui.csv` file containing the combined event data.

## Data / API
This project uses data from the "www.fuku-e.com" website, which is an event listing website for the Fukui prefecture in Japan.

## License
This project is licensed under the MIT License.