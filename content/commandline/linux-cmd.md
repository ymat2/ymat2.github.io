---
title: "Linuxコマンド"
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
:	ディレクトリ新規作成

`touch`
:	ファイル新規作成（普段はnanoでやってる）

`mv`
:	`mv source/path destination/path`で移動、`mv before_name after_name`でリネーム（Windowsではできなかった記憶がある）

`cp`
:	ファイルのコピー。`-r`でディレクトリをコピー。

`rm`
:	`-f`で強制削除、`-r`でディレクトリ以下を削除。

`wc`
:	行数カウント。`-l`でファイル名も表示。

`cat`
:	ファイルの中身を標準出力。

`head/tail -n x`
:	ファイルの先頭/末尾x行を標準出力

`sort`,`uniq`
:	行単位でソート、重複行の削除

`sed -e 's/BEFORE/AFTER/g' file`
:	ファイル中の文字を置換。`-i`で上書き。

`less`
:	ファイル閲覧

`du`
:	ファイルの容量表示。`-h`でちょうどいい単位にしてくれる。`--max-depth N`で階層指定。

`ps`
:	いまターミナルで実行中のプロセスを表示

## `grep`
`grep STR FILE`
:	行単位でソート、重複行の削除。

`grep str -rl PATH`
:	中身にstrが含まれているファイルを再起的に取得。

## `ln`
`ln -s TARGET LINK_NAME`
:	`TARGET`のシンボリックリンクを`LINK_NAME`に作成。

`ln -nfs TARGET LINK_NAME`
:	`TARGET`を移動したときなどにリンクを張りなおす。
