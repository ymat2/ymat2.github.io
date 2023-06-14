---
title: "WSL"
subtitle: "Windows Subsystem for Linux"
date: 2022-11-25T14:56:42+09:00
---

## WSLとは
https://learn.microsoft.com/ja-jp/windows/wsl/

乱暴に言ってしまうとWindowsでLinuxを扱える仮想環境のこと。

## WSLのインストール: Windows11の場合
参考: https://chigusa-web.com/blog/wsl2-win11/

### wslのインストール
1. <kbd>Win</kbd>+<kbd>X</kbd> → <kbd>A</kbd>でターミナルを管理者として起動。
2. `wsl --install`

### 再起動と設定
1. マシンを再起動する。
2. 再起動後、インストール処理を経てUbuntuが起動する。
3. `Enter new UNIX usernaem:`と表示されたらユーザーネームを設定。<br>(NG: `松田`(日本語), `y matsuda`(スペース), `y.matsuda`(ピリオド))
4. `Enter new UNIX password:`と表示されたらパスワードを設定。`sudo`とかするときに要求される。
5. `Retype new UNIX password:`と表示されたらパスワードを再入力。

## WSLのインストール: Windows10の場合
参考: https://lab.sonicmoov.com/development/windows-bash/

### Windows subsystem for Linux(WSL)を有効化する
1. <kbd>Win</kbd>+<kbd>S</kbd> |> 「コントロールパネル」を検索 |> 「開く」
2. 「プログラム」を開く。
3. Windowsの機能の有効化または無効化」をクリック。
4. 「Windows Subsystem for Linux」にチェック |> 「OK」
5. 「今すぐ再起動(N)」

### Ubuntuのインストール
1. <kbd>Win</kbd>+<kbd>S</kbd> |> 「Microsoft Store」を検索 |> 「開く」
2. 「Ubuntu」を検索してクリック。
3. 「入手」

### Ubuntuの起動と設定
1. <kbd>Win</kbd>+<kbd>S</kbd> |> 「Ubuntu」を検索 |> 「開く」
2. `Enter new UNIX usernaem:`と表示されたらユーザーネームを設定。<br>(NG: `松田`(日本語), `y matsuda`(スペース), `y.matsuda`(ピリオド))
3. `Enter new UNIX password:`と表示されたらパスワードを設定。`sudo`とかするときに要求される。
4. `Retype new UNIX password:`と表示されたらパスワードを再入力。


## Ubuntuの更新・アップグレード
```bash
# 最新のパッケージ情報を取得
sudo apt update

# パッケージを最新に更新
sudo apt upgrade
```

## Windows標準のターミナル
`cd`, `cp`, `date`, `echo`, `find`, `mkdir`, `mv`, `rm`など基本的なコマンドはLinuxと共通。

### コマンドプロンプト
古のMicrosoft製CUI。

### PowerShell
コマンドプロンプトの後継（Windows7以降）。コマンドプロンプトで使えたコマンドも基本的に使える。

### Windows Terminal
コマンドプロンプト、PowerShell、bash (Linux 用 Windows サブシステム (WSL) 経由) など複数のコマンドラインシェルのホストアプリケーション。

- <kbd>Win</kbd><kbd>X</kbd> → <kbd>I</kbd>/<kbd>A</kbd>(管理者として実行)
- <kbd>Ctrl</kbd><kbd>,</kbd>で設定画面に。デフォルトのプロファイルや外観をいじれる。
