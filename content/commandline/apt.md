---
title: "apt"
subtitle: "debian Linuxでのパッケージ管理"
date: 2023-01-08T14:34:31+09:00
---

`apt`はUbuntuなどdebin系Linuxにおけるパッケージ管理コマンド。

- https://tracker.debian.org/pkg/apt
- https://www.debian.org/doc/manuals/debian-faq/pkgtools.ja.html#apt-get


## Usage

- パッケージ一覧を更新:

	```sh
	sudo apt update
	```

- インストール済みのソフトウェアを更新:
  (必要に応じて依存パッケージをインストールすることがある。移行前の `apt-get` だと新規インストールは起こらない。)

	```sh
	sudo apt upgrade
	```

- 更新に伴い、必要なくなったパッケージを削除:

	```sh
	sudo apt autoremove
	```

- パッケージのダウンロード:

	```sh
	sudo apt install パッケージ名
	```

- パッケージの削除:

	```sh
	sudo apt remove パケージ名
	sudo apt purge パッケージ名		# 設定ファイルを含め完全削除
	```

- パッケージの検索:

	```sh
	apt search 検索キーワード
	```

- パッケージの表示:

	```sh
	apt list --upgradable		# 更新可能なパッケージ一覧を表示
	apt list --installed		# インストール済みのパッケージ一覧を表示
	```

- おまけ:

	```sh
	apt moo
	```
	```
             (__)
             (oo)
       /------\/
      / |    ||
     *  /\---/\
        ~~   ~~
	..."Have you mooed today?"...
	```


## `apt-get`, `apt-cache`

`apt` はパッケージの管理を担う `apt-get` と検索を担う `apt-cache` の統合を図るコマンド。
それぞれのコマンドの対応は以下のようになっている。

```sh
apt-get update             ->  apt update
apt-get upgrade            ->  apt upgrade
apt-get dist-upgrade       ->  apt full-upgrade
apt-get install package    ->  apt install package
apt-get remove package     ->  apt remove package
apt-get autoremove         ->  apt autoremove
apt-cache search string    ->  apt search string
apt-cache policy package   ->  apt list -a package
apt-cache show package     ->  apt show package
apt-cache showpkg package  ->  apt show -a package
```
