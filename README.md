# event_fukui_data

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A web scraper that extracts event data from Fukui Prefecture's event portal, [ふくいイベントNet (fuku-e.com)](https://www.fuku-e.com/070_event/), and saves it as CSV files.

## Features

- Scrapes event listings from `fuku-e.com`.
- Caches fetched HTML locally in a `cache/` directory to minimize redundant network requests.
- Extracts key event details: title, description, date, location, image URL, price, and contact information.
- Merges the scraped data with a manually maintained CSV to produce a final, combined event list.

## Requirements

- [Deno](https://deno.land/) runtime environment

## Usage

1.  Clone the repository:
    ```sh
    git clone https://github.com/code4fukui/event_fukui_data.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd event_fukui_data
    ```
3.  Run the scraper script:
    ```sh
    deno run --allow-net --allow-read --allow-write download.js
    ```
    The script will fetch the latest data and generate the output files in the `data/` directory.

## Data

This project sources data from [ふくいイベントNet](https://www.fuku-e.com/070_event/). The script generates and combines the following CSV files located in the `data/` directory:

-   **`data/event_fukuidotcom.csv`**: Contains the raw data scraped directly from `fuku-e.com`. This file is overwritten each time the script runs.
-   **`data/event_code4fukui.csv`**: A manually curated list of events from other sources. This file is read by the script but not modified.
-   **`data/event_fukui.csv`**: The final, combined output. It contains all events from both `event_fukuidotcom.csv` and `event_code4fukui.csv`.

## License

MIT License — see [LICENSE](LICENSE).