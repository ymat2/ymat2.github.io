---
title: "Juliaのインストール"
date: 2023-02-08T02:51:57+09:00
draft: true
---

:paperclip:https://julialang.org/downloads/

## Homebrew
MacOSなら`cask`でインストールできる。
```
brew install --cask julia
```

## Linux, Windows(Ubuntu)
1. ダウンロードサイトからインストーラをダウンロードして解凍する。
	```
	wget https://julialang-s3.julialang.org/bin/linux/x64/1.8/julia-1.8.5-linux-x86_64.tar.gz
	tar -xzvf julia-1.8.5-linux-x86_64.tar.gz
	```

2. 適当なディレクトリに移動する。（例えば`~/bin/`）
	```
	mv julia-1.8.5 ~/bin/
	```

3. `/usr/local/bin/`にシンボリックリンクを貼って動作確認。
	```
	sudo ln -s ~/bin/julia-1.8.5/bin/julia /usr/local/bin/julia
	julia --version
	```
