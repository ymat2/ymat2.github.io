---
title: "Hugoで生成したサイトをGithub Pagesでホストする"
date: 2023-01-15T12:31:31+09:00
draft: true
---

- 参考: https://sat8bit.github.io/posts/hugo-with-github-pages/
- Hugo公式: https://gohugo.io/hosting-and-deployment/hosting-on-github/
- Github Pages: https://docs.github.com/ja/pages/getting-started-with-github-pages/about-github-pages

ローカルでのサイト構築は[こちら]({{< ref "hugo.md" >}})を参照。

## Quick & Minimal start（非推奨）
1. Githubで<username>.github.ioという名の[リポジトリを作成]({{< ref "git.md" >}})。
1. ローカルにサイトを構築して[`git init`]({{< ref "git.md" >}})。
	```
	hugo new site <username>.github.io && cd <username>.github.io
	git init
	git commit --allow-empty -m "Create my site"
	git remote add origin https://github.com/<username>/<username>.github.io.git
	git branch -M main
	git push -u origin main
	```
1. `contents/`にページを作成。
	```
	hugo new contents/example.md
	echo "hello, world!" > contents/example.md
	```
1. ビルド。`public/`にページが生成される。
	```
	hugo
	```

