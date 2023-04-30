---
title: "nano - smallでfriendlyなテキストエディタ"
date: 2022-11-29T18:09:52+09:00
---

- 公式: https://www.nano-editor.org/
- マニュアル: https://www.nano-editor.org/dist/latest/nano.html

## Install
もともと入っているものを使うか、`brew`でインストールする。
```bash
which -a nano
```
```bash
brew install nano
```

## Usage
```bash
## 新規作成
nano

## 既存のファイルを編集
nano hoge.txt
```

### Keyboard shortcuts
デフォルトで編集画面の下部に書いてある。表は編集画面でのショートカット。nanoのバージョンによって異なるものもあるっぽい。

|Key|コマンド|操作|
|:---|:---|:---|
|<kbd>Ctrl</kbd>+<kbd>G</kbd>|Help|ヘルプ画面へ|
|<kbd>Ctrl</kbd>+<kbd>X</kbd>|Exit|編集画面を抜ける|
|<kbd>Ctrl</kbd>+<kbd>O</kbd>|Write Out|ファイル名を指定して書き込み|
|<kbd>Ctrl</kbd>+<kbd>R</kbd>|Read File|ファイル名を指定して読み込み|
|<kbd>Ctrl</kbd>+<kbd>W</kbd>|Where Is|ファイル内検索|
|<kbd>Ctrl</kbd>+<kbd>\ </kbd>|Replace|ファイル内置換|
|<kbd>Ctrl</kbd>+<kbd>K</kbd>|Cut|選択範囲を切り取り|
|<kbd>Ctrl</kbd>+<kbd>U</kbd>|Paste|カーソル位置に文字列を貼り付け|
|<kbd>Ctrl</kbd>+<kbd>T</kbd>|Execute|コマンドラインの操作を実行して出力を貼り付け|
|<kbd>Ctrl</kbd>+<kbd>J</kbd>|Justify|均等割付|
|<kbd>Ctrl</kbd>+<kbd>C</kbd>|Location|カーソル位置の表示|
|<kbd>Ctrl</kbd>+<kbd>/</kbd>|Go To Line|行数を指定してジャンプ|
|<kbd>Ctrl</kbd>+<kbd>]</kbd>|Complete|ファイル中にあるほかの単語を探して補完|
|<kbd>Meta</kbd>+<kbd>U</kbd>|Undo|ひとつ前の状態に戻す|
|<kbd>Meta</kbd>+<kbd>E</kbd>|Redo|同じ操作をおこなう|
|<kbd>Meta</kbd>+<kbd>A</kbd>|Set Marl|選択範囲の開始点をセット|
|<kbd>Meta</kbd>+<kbd>6</kbd>|Copy|選択範囲をコピー|

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
set mouse	# マウスを使えるようにする
```

`set mouse`の挙動について
:	設定しなくても一応使える。普通に文章を選択して<kbd>Ctrl</kbd><kbd>C</kbd>したり<kbd>Ctrl</kbd><kbd>V</kbd>したり。ただカーソルは動かせないっぽい。
:	`set mouse`すると完全に`nano`の中の挙動になる。カーソルも動く。ダブルクリックで範囲選択開始(`Set Mark`)、次のクリックで範囲決定。もう一度クリックすると解除(`Unset Mark`)。

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
