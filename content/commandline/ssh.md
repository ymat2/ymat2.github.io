---
title: "ssh"
date: 2022-11-02T11:03:16+09:00
---

リモートのマシンに安全に接続し、管理するためのツール。

## サーバー(`ssh`される側)の設定
- `openssh-server`をインストールして起動を確認。
```bash
sudo apt -y install openssh-server
sudo systemctl status sshd.service  # Active: active (running) となっていれば起動している。
```
- この状態でいったん同一LAN内の別のマシンから`ssh`してみる。
```bash
ssh ユーザー名@ipアドレス
#
#
# Are you sure you want to continue(yes/no/[fingerprint])? yes
# ユーザー名@ipアドレス's password: 
```

### `/etc/ssh/sshd_config`の設定
`openssh-server`をインストールしたことで設定ファイルが`/etc/ssh/`に生成される。これを編集することでどの接続を許可してどれを弾くかを設定する。

```bash
# ssh公開鍵の種類を指定する。
HostKey /etc/ssh/ssh_host_rsa_key
HostKey /etc/ssh/ssh_host_ecdsa_key
HostKey /etc/ssh/ssh_host_ed25519_key
# ルートユーザーとしてのログインを禁止する。
PermitRootLogin prohibit-password
# SSHサーバーへの認証の最大試行回数を制限する。
MaxAuthTries 5
# 公開鍵による接続を許可する。
PubkeyAuthentication yes
# パスワードによる接続を許可する。公開鍵の登録を終えたら`no`に変える。
PasswordAuthentication yes
# 空のパスワードでの接続を無効にする。
PermitEmptyPassword no
# キーボードインタラクティブ認証を無効にする。公開鍵で接続する場合は無効にしたほうが良い。
KbdInteractiveAuthentication no
```

## クライアント(`ssh`する側)の設定
### 公開鍵の作成と登録
1. 公開鍵と秘密鍵を作成。
	```bash
	ssh-keygen -t ed25519
	# Generating public/private ed25519 key pair.
	# Enter file in which to save the key:
	# Enter passphrase (empty for no passphrase):
	# Enter same passphrase again:
	```
	- `-t (rsa/ecdsa/ed25519/etc.)`<br>: 作成する鍵の種類の指定。ed25519の他にdsa, ecdsa, ecdsa-sk, ed25519-sk, rsaなどが指定できる。

	- `-f filename`<br>: 鍵のファイル名の指定。デフォルトは`~/.ssh/id_鍵タイプ`

2. 公開鍵をサーバーに登録する。方法はそれぞれ。
	- サイトに登録する場合などは公開鍵をコピー&ペースト
	```bash
	## 公開鍵のコピー
	cat ~/.ssh/id_ed25519.pub | pbcopy
	```
	- コマンドで送る場合(`PasswordAuthentication yes`である必要がある):
	```bash
	cat id_ed25519.pub | ssh ユーザー名@ipアドレス "mkdir ~/.ssh; cat>>~/.ssh/authorized_keys"
	```

### `~/.ssh/config`の設定
一般的な接続方法:
```bash
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
```bash
ssh username@example.com
ssh hoge
```

rsyncでリモートに接続するときも記述を省略できて便利:
```bash
rsync -auvz src/ username@example.com:dest/
rsync -auvz src/ hoge:dest/
```
