---
title: "Hugo - 静的サイトを高速生成"
date: 2022-11-03T22:09:12+09:00
---

https://gohugo.io/about/

マークダウンで書いたファイルからHTMLを生成し、静的ウェブサイトを構築するフレームワーク。本サイトもhugoでビルドしたものをGithub Pagesでホストしている。

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
	mkdir path_to_site
	cd path_to_site
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

## `hugo new site`
ウェブサイトの骨組みを作る。

`config.toml`
:	設定ファイル。例: https://github.com/ymat2/ymat2.github.io/blob/main/hugo.toml
:	version`0.110.0`以降、`config.toml`に代わって`hugo.toml`というファイル名が[推奨されている](https://gohugo.io/getting-started/configuration/#hugotoml-vs-configtoml)。

`content/`
:	この中にマークダウンでページを書いていく。

`public/`
:	後述の`hugo`コマンドを走らせたときにhtmlファイルがこの中に生成される。

`static/`
:	image, css, javascriptなどの置き場。

`themes/`
:	サイトの見た目を決めるテーマを入れる。 https://themes.gohugo.io/ から好きなテーマを選んで`git clone`する。
:	自分で作ってもいい。例: https://github.com/ymat2/hugo-theme-mindoc


## `hugo new`
新しいページを作る。`archetype/`や`theme/`、`layout/`内の`default.md`からヘッダーが生成される。

```
---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: true
---
```


## `hugo server`
サイトをビルドしてサーバーを起動する。`http://localhost:1313`で閲覧できる。

`-D`
:	`draft: true`のファイルも含めて公開。

`-w`
:	ファイルの変更をすぐに反映する。

`-p 1234`
:	ポート番号の指定。デフォルトは1313。


## `hugo`
`public/`にhtmlを生成する。Github Pagesでホストする場合、この中身を公開する。
