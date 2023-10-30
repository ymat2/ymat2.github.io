---
title: "HUGO"
subtitle: "静的サイトを高速生成"
date: 2022-11-03T22:09:12+09:00
---

https://gohugo.io/about/

マークダウンで書いたファイルからHTMLを生成し、静的ウェブサイトを構築するフレームワーク。
本サイトもHUGOでビルドしたものをGithub Pagesでホストしている。


## インストール

Macならhomebrew、Ubuntuならaptで一発。

```sh
## homebrew
brew install hugo

## apt
sudo apt install hugo
```


## Quick Start

1. サイトの骨組みを作る。

	```sh
	mkdir path_to_site
	cd path_to_site
	hugo new site .
	```

1. 生成される `content/` ディレクトリの中に記事を書いていく。

	```sh
	hugo new content/about.md
	```

	```md
	---
	title: "デモページ"
	date: 2022-11-03T22:09:12+09:00
	---

	これは**テストページ**です。
	```

2. サーバーを走らせて http://localhost:1313/about にアクセス。

	```sh
	hugo server -D -w .
	```


## Commands

### `hugo new site`

ウェブサイトの骨組みを作る。

`config.toml`
:	設定ファイル (c.f. https://github.com/ymat2/ymat2.github.io/blob/main/hugo.toml )
:	version`0.110.0`以降、`config.toml`に代わって`hugo.toml`というファイル名が[推奨されている](https://gohugo.io/getting-started/configuration/#hugotoml-vs-configtoml)。

`content/`
:	この中にマークダウンでページを書いていく。

`public/`
:	後述の `hugo` コマンドを走らせたときにhtmlファイルがこの中に生成される。

`static/`
:	画像, css, javascriptなどの置き場。

`themes/`
:	サイトの見た目を決めるテーマを入れる。
	https://themes.gohugo.io/ から好きなテーマを選んで `git clone` する。
:	自分で作ってもいい。(c.f. https://github.com/ymat2/hugo-theme-mindoc )


### `hugo new`

新しいページを作る。
`archetype/` や `theme/`、`layout/` 内の `default.md` からヘッダーが生成される。

```txt
---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: true
---
```


### `hugo server`

サイトをビルドしてサーバーを起動する。
http://localhost:1313 で閲覧できる。

`-D`
:	`draft: true` のファイルも含めて公開。

`-w`
:	ファイルの変更をすぐに反映する。

`-p 1234`
:	ポート番号の指定。デフォルトは1313。


### `hugo`

`public/` にhtmlを生成する。
Github Pagesでホストする場合、この中身を公開する。


## Github Actionsによる自動デプロイ

- 参考: https://sat8bit.github.io/posts/hugo-with-github-pages/
- Hugo公式: https://gohugo.io/hosting-and-deployment/hosting-on-github/
- Github Pages: https://docs.github.com/ja/pages/getting-started-with-github-pages/about-github-pages

1. Githubで`ユーザ名.github.io`という名の[リポジトリを作成]({{< ref "git.md" >}})

1. ローカルにサイトを構築して [`git init`]({{< ref "git.md" >}}):

	```sh
	hugo new site <username>.github.io && cd <username>.github.io
	git init
	git commit -m "Create site"
	git remote add origin https://github.com/<username>/<username>.github.io.git
	git branch -M main
	git push -u origin main
	```

1. `contents/` にページを作成:

	```sh
	hugo new contents/index.md
	echo "hello, world!" > contents/index.md
	```

1. Actionsの設定

	`git push` をトリガーに、自動でビルドコマンドを走らせて
	`gh-pages` ブランチにページを生成するように[Actions](https://github.co.jp/features/actions)を設定する。

	[`.github/workflows/gh-pages.yml`](https://github.com/ymat2/ymat2.github.io/blob/main/.github/workflows/gh-pages.yml)
	に以下のように記述する。

	```yml
	name: GitHub Pages

	on:
		push:
			branches:
				- main  # Set a branch name to trigger deployment
		pull_request:

	jobs:
		deploy:
			runs-on: ubuntu-22.04
			steps:
				- uses: actions/checkout@v3
					with:
						submodules: true  # Fetch Hugo themes (true OR recursive)
						fetch-depth: 0    # Fetch all history for .GitInfo and .Lastmod

				- name: Setup Hugo
					uses: peaceiris/actions-hugo@v2
					with:
						hugo-version: 'latest'

				- name: Build
					run: hugo

				- name: Deploy
					uses: peaceiris/actions-gh-pages@v3
					# If you're changing the branch from main,
					# also change the `main` in `refs/heads/main`
					# below accordingly.
					if: ${{ github.ref == 'refs/heads/main' }}
					with:
						github_token: ${{ secrets.GITHUB_TOKEN }}
						publish_dir: ./public
	```
