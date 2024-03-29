---
title: "Linuxコマンド小技集"
date: 2022-11-02T11:03:16+09:00
---


## 基本
`pwd`
:	カレントディレクトリの絶対パス

`ls`
:	カレントディレクトリにあるファイル

`cd`
:	ディレクトリ移動

`mkdir`
:	ディレクトリ新規作成。`-p` で必要に応じて親ディレクトリも作成。

`touch`
:	ファイル新規作成

`mv`
:	`mv source/path destination/path` で移動、`mv before_name after_name` でリネーム

`cp`
:	ファイルのコピー。`-r` でディレクトリをコピー。

`rm`
:	`-f` で強制削除、`-r` でディレクトリ以下を削除。

`wc`
:	行数カウント。`-l` でファイル名も表示。

`cat`
:	ファイルの中身を標準出力。

`head/tail -n x`
:	ファイルの先頭/末尾x行を標準出力

`sort`, `uniq`
:	行単位でソート、重複行の削除

`sed -e 's/BEFORE/AFTER/g' file`
:	ファイル中の文字を置換。`-i` で上書き。

`less`
:	ファイル閲覧

`du`
:	ファイルの容量表示。`-h` でちょうどいい単位にしてくれる。`--max-depth N` で階層指定。
: `| sort -rh` に渡すと容量の大きい順に出力。

`ps`
:	いまターミナルで実行中のプロセスを表示

`time`
:	`time sleep 30` など、コマンドの実行時間を表示する。


## `grep`, `find`でファイル検索

`find PATH -name string`
:	`PATH` 配下の"string"という名前のファイルをすべて表示する。
ワイルドカード `*` も使える。
`Operetion not permitted` する出力は邪魔になるので `2>/dev/null` に流す。

`grep string -rl PATH`
:	中身にstringが含まれているファイルを再起的に取得。


## シンボリックリンク

`ln -s TARGET LINK_NAME`
:	`TARGET` のシンボリックリンクを `LINK_NAME` に作成。

`ln -nfs TARGET LINK_NAME`
:	`TARGET` を移動したときなどにリンクを張りなおす。

相対PATHで書く場合、`TARGET` は作られる `LINK_NAME` から見た相対PATHで書く。

例えばカレントディレクトリ `dirB` の `file1.txt` を、一個上のディレクトリ `dirA` に `file2.txt` という名前でリンクする場合、
`ln -s ./file1.txt ../file2.txt` と書きたくなるが、正しくは `ln -s ./dirB/file1.txt ../file2.txt` となる。

```sh
ln -s ./dirB/file1.txt ../file2.txt
# dirA
#   L file2.txt(LINK_NAME)  ->  file1.txt
#   L dirB
#     L file1.txt(TARGET)
```


## たまに使う小技メモ

### `echo $PATH` の結果を1行ずつ表示する

```sh
echo $PATH | tr ":" "\n"
```


### `awk` で列の集計

例えば下の `sample.tab` みたいなファイルの2行目を合計したかったら、

```sh
awk '{s += $2} END {print s}' < sample.tab
```

例：sample.tab
|A|B|C|
|:---:|:---:|:---:|
|1|2|3|
|2|4|6|
|1|2|1|


### ディレクトリ配下で一定以上の行数であるファイルを表示

```
ls ./ | xargs wc | awk '$1 >= 20 { print }'  # 20行以上のファイルのみ表示
```

### 特定の文字列を含む行を削除

`grep` の反転マッチを使う。
例えば `sample.txt` から "some text" を含む行を削除する場合:

```sh
grep -v "some text" sample.txt > sample2.txt
```


## `pbcopy`

`pbcopy` は、ターミナルの標準出力をクリップボードにコピーするMac固有のコマンド。

```sh
cat hoge.txt | pbcopy  # hoge.txtの中身がクリップボードにコピーされる。
```

### Linuxでも `pbcopy` を使いたい

linuxでは `xsel` を使うことで `pbcopy` を再現できる。([参考](https://qiita.com/yoshikyoto/items/1676b925580717c0a443))

```sh
sudo apt install xsel  # xselをインストール
cat hoge.txt | xsel --clipboard --input  # hoge.txtの中身を標準出力し、クリップボードにコピー
```

`~/.bashrc` とかにエイリアスを作る。
```bash
alias pbcopy='xsel --clipboard --input'
```
