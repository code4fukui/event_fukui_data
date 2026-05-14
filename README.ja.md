# event_fukui_data

福井県のイベントポータルサイトである[ふくいイベントNet (fuku-e.com)](https://www.fuku-e.com/070_event/)からイベントデータを抽出し、CSVファイルとして保存するウェブスクレイパーです。

## 機能

- `fuku-e.com` からイベント一覧をスクレイピングします。
- 冗長なネットワークリクエストを最小限に抑えるため、取得したHTMLをローカルの `cache/` ディレクトリにキャッシュします。
- イベントの主要な詳細情報（タイトル、説明、日時、場所、画像URL、料金、連絡先情報）を抽出します。
- スクレイピングしたデータと手動で管理されているCSVをマージし、最終的な結合済みイベントリストを生成します。

## 必要環境

- [Deno](https://deno.land/) ランタイム環境

## 使い方

1. リポジトリをクローンします:
    ```sh
    git clone https://github.com/code4fukui/event_fukui_data.git
    ```
2. プロジェクトディレクトリに移動します:
    ```sh
    cd event_fukui_data
    ```
3. スクレイパースクリプトを実行します:
    ```sh
    deno run --allow-net --allow-read --allow-write download.js
    ```
    スクリプトは最新のデータを取得し、`data/` ディレクトリに出力ファイルを生成します。

## データ

本プロジェクトは [ふくいイベントNet](https://www.fuku-e.com/070_event/) をデータソースとしています。スクリプトは、`data/` ディレクトリにある以下のCSVファイルを生成および結合します。

- **`data/event_fukuidotcom.csv`**: `fuku-e.com` から直接スクレイピングした生データが含まれます。このファイルはスクリプトを実行するたびに上書きされます。
- **`data/event_code4fukui.csv`**: 他のソースから手動で収集・管理されているイベントリストです。このファイルはスクリプトによって読み込まれますが、変更されることはありません。
- **`data/event_fukui.csv`**: 最終的な結合出力です。`event_fukuidotcom.csv` と `event_code4fukui.csv` の両方のすべてのイベントが含まれます。

## ライセンス

MIT License — 詳細は [LICENSE](LICENSE) を参照してください。
