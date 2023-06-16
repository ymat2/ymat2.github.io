---
title: "ファイルの読み書き"
date: 2023-03-09T01:05:42+09:00
---

https://docs.python.org/ja/3/tutorial/inputoutput.html#reading-and-writing-files


## Short Summary

ファイルの読み書き:

```python
with oepn(filename, mode, encoding=None) as f:
```

ファイルオブジェクトに対するメソッド:

```python
### すべて読む
f.read()

### 一行だけ読む
f.readline()

### 一行ずつ読む
for line in f:

### 行ごとにリストに格納
f.readlines()
list(f)

### 書く
f.write(str)
```


## `open()`

### `f = open(filename, mode, encoding=None)`

`filename`
:	ファイルのパス。

`mode`
:	`r` は読み込み専用。`mode` を省略した場合はこれで開かれる。
:	`w` は書き込み専用。同名ファイルがあれば上書きされる。
:	`a` は追記。ファイルの終端に追加していく。
:	`r+` は読み書き両用。

### `with open(filename, mode, encoding=None) as f:`

`with` を使ってファイルを開くとブロックの終わりで自動的にファイルが `close()` される。
むしろ、生の `open()` を使ったときに `close()` し忘れるとリソースを圧迫したり、
`f.write()` が正常に書き込まれなかったりするので習慣的に `with` を使うほうが良い。


## readメソッド

`f.read(size)`
:	サイズを指定して開く。（テキストモードでは文字数、バイナリモードではbyte数。）

`f.readline()`
:	一行だけ読む。

`for line in f:`
:	一行ずつ読む。

`f.readlines()`
:	各行を要素とするリストに格納。

### 例
sample.txt
```
hoge
fuga
koke
piyo
```

```python
## fとして読み込む

## read()
print(f.read(7))
# hoge
# fu

## readline()
print(f.readline())
# hoge

print(f.readline())
# fuga

## for line in f:
for line in f:
	print(line)
# hoge
# fuga
# koke
# piyo

### readlines()
print(f.readlines())
# ['hoge\n', 'fuga\n', 'koke\n', 'piyo\n']
```


## writeメソッド

`f.write(string)`
:	fに文字列を書き込む。
	書き込めるのは**文字列型**のみなので、他の型は `str()` で変換する必要がある。
