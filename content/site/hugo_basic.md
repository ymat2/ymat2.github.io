---
title: "Hugo - 静的サイトを高速生成"
date: 2022-11-03T22:09:12+09:00
---

https://gohugo.io/about/

## インストール
Macならhomebrew、Ubuntuならaptで一発。
```bash
## homebrew
brew install hugo

## apt
sudo apt install hugo
```

## Quick Start
1. サイトの骨組みを作る。
	```bash
	mkdir PATH_TO_SITE
	cd PATH_TO_SITE
	hugo new site .
	```

2. 生成される`./content/`ディレクトリの中に記事を書いていく。
	```bash
	hugo new content/about.md
	```

	```md
	---
	title: "デモページ"
	date: 2022-11-03T22:09:12+09:00
	---

	これは**テストページ**です。
	```

3. サーバーを走らせて[http://localhost:1313/about](http://localhost:1313/about)にアクセス。
	```bash
	hugo server -D -w .
	```
