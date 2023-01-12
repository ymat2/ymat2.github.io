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
デフォルトで編集画面の下部に書いてある。

## Configuration
基本的な設定は[コマンドラインオプション][cmd]で指定することもできるが、一時的な設定でなければconfigファイルに書いてしまった方が楽。

読み込まれる順番は、まず`/etc/nanorc`、次に`~/.nanorc`または`~/.config/nano/nanorc`。

Linuxでは`/etc/nanorc`や`/usr/share/doc/nano/examples/samples.nanorc`に、Macにbrewで入れた場合は`/usr/local/Cellar/nano/6.4/share/doc/nano/sample.nanorc`にドキュメントとコマンドがコメントアウトされて書いてあるので、これを`~/.nanorc`または`~/.config/nano/nanorc`にコピーして編集する。

自分で書いてしまってもいい。たとえば:
```sh
set autoindent	# 改行時にインデントを揃える
set nowrap	# 横に長い行を勝手に改行しない
set smooth	# スクロールがスムーズに（あんまり実感したことはない）
set tabsize 4	# タブサイズ（スペースの数）の設定
```

[cmd]: https://www.nano-editor.org/dist/latest/nano.html#Nanorc-Files:~:text=6%20Command%2Dline%20Options


### Syntax highlight
デフォルトの見た目は非常に寂しい。

Linuxでは`/usr/share/nano/`、Macでは`/usr/local/share/nano/`や`/usr/local/Cellar/nano/6.4/share/doc/nano/`にハイライト定義ファイルが置いてあるので、これらの設定を`~/.nanorc`に加える。または野生の定義ファイルを使う手もある。: https://github.com/scopatz/nanorc

```sh
include '/usr/share/nano/*.nanorc'
```

