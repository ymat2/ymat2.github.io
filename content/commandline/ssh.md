---
title: "SSH"
date: 2022-11-02T11:03:16+09:00
---

リモートのサーバーに安全に接続し、管理するためのツール。

## 公開鍵による認証
1. 公開鍵と秘密鍵を作成する。
	```sh
	ssh-keygen -t ed25519 -N '' -f id_ed25519_hoge
	```
	- `-t`<br>: 作成する鍵の種類の指定。ed25519の他にdsa, ecdsa, ecdsa-sk, ed25519-sk, rsaなどが指定できる。
	- `-f`<br>: 鍵のファイル名の指定。

1. 公開鍵をリモートホストに登録する。方法はそれぞれ。
	```sh
	## 公開鍵のコピー
	cat ~/.ssh/id_ed25519_hoge.pub | pbcopy
	```

## `~/.ssh/config`
一般的な接続方法:
```sh
ssh username@example.com	# 毎回打つのは面倒！
```

そこで`.ssh/config`に以下のような設定を追記:
```
Host hoge
	Hostname example.com	# ホスト名(@のうしろ)
	User username			# ユーザー名
	IdentityFile ~/.ssh/id_ed25519_hoge	# 秘密鍵へのPATH
```

こうすると以下の二つは等価:
```sh
ssh username@example.com
ssh hoge
```

rsyncでリモートに接続するときも記述を省略できて便利:
```sh
rsync -auvz src/ username@example.com:dest/
rsync -auvz src/ hoge:dest/
```
