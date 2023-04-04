---
title: "静的ウェブサイトの作成"
date: 2022-11-03T22:02:28+09:00
---

本サイトはマークダウンで書いたページをHugo + Git + Github Pagesでビルド&公開している。おおまかな手順としては、
1. hugoをインストールしてローカルにサイトの骨組みを作る。
2. コンテンツをgithubに`push`する。
3. Github Actionsでビルドコマンドを走らせ、Github Pagesにホストさせる。

という流れで構築している。

Hugoのインストールにはhomebrewを用いている。またGithubのアカウントがあることを前提としている。

## Documents
