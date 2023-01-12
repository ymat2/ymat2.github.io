---
title: "ArgumentParser - コマンドライン引数の実装"
date: 2022-11-02T11:03:16+09:00
---

- https://docs.python.org/ja/3/library/argparse.html
- https://qiita.com/kzkadc/items/e4fc7bc9c003de1eb6d0

Pyhtonプログラム実行時にコマンドライン引数を受け取る処理を簡単に実装できる標準ライブラリ。[`sys`](https://docs.python.org/ja/3/library/sys.html?highlight=sys#module-sys)とかでも似たことは実現できるけど使い勝手と可読性は`argparse`の方が圧倒的にいい。


## 基本的な使い方
```python
import argparse

parser = argparse.ArgumentParser()

# オプション引数
parser.add_argument('--input')
# ハイフン1つの省略形も追加できる
parser.add_argument('-o', '--output')
# ポジション引数
parser.add_argument('arg1')
# --helpしたときの説明を書いておける
parser.add_argument('arg2', help="２つ目のポジション引数")

args = parser.parse_args()

print('arg1='+args.arg1)
print('arg2='+args.arg2)
print('arg3='+args.input)
print('arg4='+args.output)
```

実行する。
```sh
$ python3 test.py hoge fuga --input koke -o piyo
arg1=hoge
arg2=fuga
arg3=koke
arg4=piyo

# ポジション引数は順番通りならどこでもいい
$ python3 test.py hoge --input koke -o piyo fuga
arg1=hoge
arg2=fuga
arg3=koke
arg4=piyo
```

`-h`,`--help`でヘルプを表示できる。
```sh
$ python3 test.py -h
usage: test.py [-h] [--input INPUT] [-o OUTPUT] arg1 arg2

positional arguments:
  arg1
  arg2                  ２つ目のポジション引数

optional arguments:
  -h, --help            show this help message and exit
  --input INPUT
  -o OUTPUT, --output OUTPUT
```


## ポジション引数
`parser.add_argument('argN')`とすると必須引数扱いになり、指定しないとエラーになる。

## オプション引数
### デフォルト値と型の指定
オプション引数は指定しないと`None`が入る。これ以外にデフォルト値を設定したり、データ型を指定することができる。
```python
parser.add_argument('-n', '--number', type=float, default=0.0)
```


### あらかじめ引数の選択肢を設定
```python
parser.add_argument('-l', '--letter', choice=["hoge", "fuga", "piyo"])
```
選択肢以外の引数を指定するとエラーになる。


### 複数個の引数を受け取る
```python
parser.add_argument('-a', '--alphabet', nargs='*')
args = parser.parse_args()
print(args.alphabet)
```

受け取った引数はリストになって利用できる。

```sh
$ python3 test.py --alphabet A G X
['A', 'G', 'X']
```


### オプション引数を必須引数にする
```python
parser.add_argument('-n', '--neeed', requied=True)
```
