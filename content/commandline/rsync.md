---
title: "rsync"
date: 2022-11-02T11:03:16+09:00
---

ファイルやディレクトリの同期/バックアップを行うツール。<br>2つのディレクトリの差分を検出して差分のみ反映するといった使い方が可能。

## 基本
```sh
### Local
rsync -option src/ dest/

### Access via remote shell:
# Push:
rsync -option src/ user@host:dest/
# Pull:
rsync -option user@host:dest/ src/
```

- `src/ dest/`: src配下のファイルがdst/にコピーされる。
- `src dset/`: srcごとdst/にコピーされる。

## Option
- `-a`,`--archive`<br>: ?
- `-u`,`--update`<br>: dest側で更新されているファイルをスキップする。
- `-v`,`--verbose`<br>: メッセージを冗長に表示させる。
- `-z`,`--compress`<br>: 送受信中にファイルを圧縮する。
