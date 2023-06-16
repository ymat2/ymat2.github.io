---
title: "Hugoで生成したサイトをGithub Pagesでホストする"
date: 2023-01-15T12:31:31+09:00
---

- 参考: https://sat8bit.github.io/posts/hugo-with-github-pages/

- Hugo公式: https://gohugo.io/hosting-and-deployment/hosting-on-github/

- Github Pages: https://docs.github.com/ja/pages/getting-started-with-github-pages/about-github-pages

ローカルでのサイト構築は[こちら]({{< ref "hugo_basic.md" >}})を参照。


## Github Actionsによる自動デプロイ

1. Githubで`your_username.github.io`という名の[リポジトリを作成]({{< ref "git.md" >}})

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

	`git push` をトリガーに、自動でビルドコマンドを走らせて `gh-pages` ブランチにページを生成するように[Actions](https://github.co.jp/features/actions)を設定する。

	[`.github/workflows/gh-pages.yml`](https://github.com/ymat2/ymat2.github.io/blob/main/.github/workflows/gh-pages.yml) に以下のように記述する。

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
