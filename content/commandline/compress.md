---
title: "ファイル・ディレクトリの圧縮と解凍"
date: 2022-11-28T09:18:25+09:00
---

## ファイルの圧縮と展開
```sh
## .zip
zip test.txt.zip test.txt  # 圧縮
unzip test.txt.zip  # 展開

## .gz
gzip test.txt  # 圧縮
gunzip test.txt.zip  # 展開

## .bz
bzip2 test.txt  # 圧縮
bunzip2 test.txt.bz2  # 展開
```

圧縮率は`.bz2`が最も高い


## ディレクトリの圧縮と展開
```sh
## tar.gz
tar -czvf hoge.tar.gz hoge  # 圧縮
tar -xzvf hoge.tar.gz  # 展開

## tar.bz2
tar -cjvf hoge.tar.bz2 hoge  # 圧縮
tar -xjvf hoge.tar.bz2  # 展開
```

### `tar`コマンドオプション
|option|意味|
|:---|:---|
|`-c`,`--create`|アーカイブを作成する。|
|`-x`,`--extract`|アーカイブを展開する。|
|`-z`,`--gzip`|gzip形式。|
|`-j`,`--bzip2`|bzip2形式。|
|`-J`,`--xz`|xz形式。|
|`-v`,`--verbose`|ログの冗長表示。|
|`-f`,`--file`|ファイル名の指定。使う場合は一番右に置く。|


