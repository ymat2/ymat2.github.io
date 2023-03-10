---
title: "nano - シンプルで軽量なテキストエディタ"
date: 2022-11-29T18:09:52+09:00
---

- 公式: https://www.nano-editor.org/
- マニュアル: https://www.nano-editor.org/dist/latest/nano.html

## Install
もともと入っているものを使うか、`brew`でインストールする。
```sh
which -a nano
```
```sh
brew install nano
```

## Usage
```sh
## 新規作成
nano

## 既存のファイルを編集
nano hoge.txt
```

### Keyboard shortcuts
デフォルトで編集画面の下部に書いてある。表は編集画面でのショートカット。nanoのバージョンによって異なるものもあるっぽい。

|Key|コマンド|操作|
|:---|:---|:---|
|Ctrl+G|Help|ヘルプ画面へ|
|Ctrl+X|Exit|編集画面を抜ける|
|Ctrl+O|Write Out|ファイル名を指定して書き込み|
|Ctrl+R|Read File|ファイル名を指定して読み込み|
|Ctrl+W|Where Is|ファイル内検索|
|Ctrl+\ |Replace|ファイル内置換|
|Ctrl+K|Cut|選択範囲を切り取り|
|Ctrl+U|Paste|カーソル位置に文字列を貼り付け|
|Ctrl+T|Execute|コマンドラインの操作を実行して出力を貼り付け|
|Ctrl+J|Justify|均等割付|
|Ctrl+C|Location|カーソル位置の表示|
|Ctrl+/|Go To Line|行数を指定してジャンプ|
|Meta+U|Undo|ひとつ前の状態に戻す|
|Meta+E|Redo|同じ操作をおこなう|
|Meta+A|Set Marl|選択範囲の開始点をセット|
|Meta+6|Copy|選択範囲をコピー|

MetaキーはWindowsなら<kbd>alt</kbd>、Macなら<kbd>esc</kbd>。

## Configuration
基本的な設定は[コマンドラインオプション][cmd]で指定することもできるが、一時的な設定でなければconfigファイルに書いてしまった方が楽。

読み込まれる順番は、まず`/etc/nanorc`、次に`~/.nanorc`または`~/.config/nano/nanorc`。

Linuxでは`/etc/nanorc`や`/usr/share/doc/nano/examples/samples.nanorc`に、Macにbrewで入れた場合は`/usr/local/Cellar/nano/%v/share/doc/nano/sample.nanorc`にドキュメントとコマンドがコメントアウトされて書いてあるので、これを`~/.nanorc`または`~/.config/nano/nanorc`にコピーして編集する。(`%v`は`nano`のバージョン)

自分で書いてしまってもいい。たとえば:
```
set autoindent	# 改行時にインデントを揃える
set nowrap	# 横に長い行を勝手に改行しない
set smooth	# スクロールがスムーズに（あんまり実感したことはない）
set tabsize 4	# タブサイズ（スペースの数）の設定
```

[cmd]: https://www.nano-editor.org/dist/latest/nano.html#Nanorc-Files:~:text=6%20Command%2Dline%20Options


### Syntax highlight
デフォルトの見た目は非常に寂しい。

Linuxでは`/usr/share/nano/`、Macでは`/usr/local/share/nano/`や`/usr/local/Cellar/nano/%v/share/doc/nano/`にハイライト定義ファイルが置いてあるので、これらの設定を`~/.nanorc`に加える。または野生の定義ファイルを使う手もある。: https://github.com/scopatz/nanorc

```
include '/usr/share/nano/*.nanorc'
```

### Key Bind
キーボードショートカットは変更可能。例えば<kbd>Ctrl</kbd>+<kbd>Z</kbd>を`Undo`に割り当てたい場合、以下のように書く。

```
bind ^Z undo	main
```
