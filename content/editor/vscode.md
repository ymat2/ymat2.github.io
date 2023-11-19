---
title: "Visual Studio Code"
date: 2023-05-09T12:52:36+09:00
---

https://code.visualstudio.com/


## WSL

https://learn.microsoft.com/ja-jp/windows/wsl/tutorials/wsl-vscode

### VSCode本体と拡張機能のインストール

https://code.visualstudio.com/download

1. VSCodeを(WSLではなく)Windowsにインストールする。

1. インストール中に "追加タスクの選択" が求められたときは、"PATH への追加" オプションをオンにする。

1. [Remote Development 拡張機能](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)をインストールする。

Remote Development拡張機能なしでWSLにアクセスすることは非推奨とされている。

### Linuxディストリビューションの更新と必要なパッケージのインストール

```sh
sudo apt update
sudo apt install wget ca-certificates
```

### プロジェクトを開く

WSLから `code .` 、もしくはVSCodeから <kbd>Control</kbd><kbd>Shift</kbd><kbd>P</kbd> でコマンドパレットを開いて "WSL: Connect to WSL" を選択。

なお、WSLからVSCodeを立ち上げた場合、ログインシェルの設定( `~/.bash_profile`, `~/.zprofile` )は読まれない。

### 環境設定

VSCode本体はWindowsのものなのでユーザー設定もWindows側。WSLで使う場合これをWSL用の設定が上書きする。
- 拡張機能は `.vscode/extensions/`
- 環境設定は `/AppData/Roaming/Code/User/settings.json`
- キーボードショートカットは `/AppData/Roaming/Code/User/keybindings.json`

WSLでVSCodeを使う場合、ユーザーホームに `.vscode-server/` が作られてこの中で設定をいじったりする。
- 拡張機能は `.vscode-server/extensions/`
- 環境設定は `.vscode-server/data/Machine/settings.json`


## Mac

### VSCodeのインストール

https://code.visualstudio.com/download

1. Mac版のVSCodeをダウンロードして解凍。

1. `Visual Studio Code.app` を `/Applications` フォルダに移動。

### terminalからVSCodeを起動する設定

`code` の実行ファイルは `/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code` にある。
ここに `$PATH` を通せばいい。

公式のやり方
: VSCodeを起動してコマンドパレットを開き( <kbd>Command</kbd><kbd>Shift</kbd><kbd>P</kbd> )、
  "shell" と検索して出てくる "Shell Command: Install 'cpde' command in PATH" をクリック。
: これで上記の実行ファイルPATHが `/usr/local/bin/` にシンボリックリンクされる。

もしくは
: `.zshrc` とかに上記のPATHを通す。

### 環境設定

MacのVSCodeの環境設定ファイルは `/Library/application Support/Code/User/settings.json` にある。

### WSLとの設定の共有

[他人の `dotfiles` ](https://github.com/shuntaka9576/dotfiles/tree/master/vscode)を見てみると、
MacとWSLそれぞれの環境設定ファイルに共通の `settings.json` をシンボリックリンクしているよう?

ということで自分もいったんその方針でやってみる:
https://github.com/ymat2/dotfiles/tree/main/.config/Code


## SSH

https://code.visualstudio.com/docs/remote/ssh-tutorial

マシン自体にSSHの設定をしてあれば、拡張機能をインストールするだけでSSHホストのファイルにアクセスできる。
コマンドパレットを開いて "ssh" で検索し、"Romote-SSH: Connect to host..." を選択して接続先を選ぶだけ。

WSLで使う場合すでにRemoteで使っている扱いになるからかSSHできない...?

- これはWindows側のホームを参照してコマンドプロンプトから `ssh` しようとするかららしい。

- 解決策を調べてみると鍵をWindowsホームに置くとか出るけどほんとにそれでええんか？

- WSLで動かしてるときはWSLのホームを参照する、みたいな設定できないだろうか。
  - これは[偉大な先人たちが試している](https://github.com/microsoft/vscode-remote-release/issues/937)けどどうも `settings.json` の設定では無理らしい。windows側に.batおいてwslのssh使わせれば行けるらしいがそこまでするのは気が引ける。

- WSLでLinuxのVSCode入れれば解決する気がするけどWSLでVSCode使う公式のやり方には従いたい。


## Quarto

https://quarto.org/docs/tools/vscode.html

### 準備

1. VSCodeに[Quartoの拡張機能](https://marketplace.visualstudio.com/items?itemName=quarto.quarto)をインストールする。

2. Quarto CLIをマシンにインストールする。

   ```sh
   ## Macならhomebrewで
   brew install --cask quarto

   ## WSLは.debを落としてくるのが正攻法？
   sudo curl -LO https://quarto.org/download/latest/quarto-linux-amd64.deb
   # sudo apt-get install gdebi-core  # if needed
   sudo gdebi quarto-linux-amd64.deb
   ```

### render

右上のRenderボタンから、もしくは <kbd>Control/Command</kbd><kbd>Shift</kbd><kbd>K</kbd>。


## R

1. Rに `languageserver` を入れる。
   ```R
   install.packages("languageserver")
   ```

1. VSCodeに[Rの拡張機能](https://marketplace.visualstudio.com/items?itemName=REditorSupport.r)を入れる。

1. 環境設定
   1. `settings.json`

      ```json
      "r.sessionWatcher": true
      ```

   1. `keybindings.json`

      ```json
      # ctrl+enterでコマンドをターミナルに送るための設定
      [
        {
          "key": "ctrl+enter",
          "command": "workbench.action.terminal.runSelectedText",
          "when": "editorTextFocus"
        }
      ]
      ```

1. コマンドパレットを開いて"R: Create R terminal"。