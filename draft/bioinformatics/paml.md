---
title: "PAML"
date: 2023-04-02T16:25:54+09:00
draft: true
---

<u>P</u>hylogenetic <u>A</u>nalysis by <u>M</u>aximum <u>L</u>ikelihood

DNAやタンパク質の配列を最尤法で系統解析するための種々のプログラムを含むパッケージ。

- 原著論文: [Yang 2007](https://doi.org/10.1093/molbev/msm088)
- 本家ビギナーズガイド: [Álvarez-Carretero et al. 2023](https://doi.org/10.1093/molbev/msad041)


## 遺伝研

`/usr/local/biotools/p/` にいくつかのバージョンが用意されている。

```sh
singularity exec /usr/local/biotools/p/paml:%ver codeml
```

## `codeml`

タンパク質コード遺伝子配列を解析し、同義・非同義置換率(dS, dN)を推定して正の自然選択を検出する。

### コントロールファイル: `codeml.ctl`

どの解析でも共通で変更するのは `seqfile`, `treefile`, `outfile` の3つ。
`model`, `NSsites`, `fix_omega`, `omega` は解析に応じて変更する。

`seqfile`
:	DNAまたはタンパク質の配列のファイルパス。

`treefile`
:	系統樹のファイルパス。tip名は `seqfile` のものと一致している必要がある。

`outfile`
:	出力ファイルのパス。

`noisy`
:	0,1,2,3,9から指定。大きい数を指定するほど標準出力が増える。

`verbose`
:	0: conciseな出力。アライメントなしで出力。
:	1: detailedな出力。アライメントありで出力。

`model`
:	系統樹の各branchにおけるω=dN/dSの設定。
:	0: 系統樹全体で均一のωを推定。
:	1: branchごとに異なるωを推定。
:	2: `treefile` のbranchに `#`, `#1` などの記号を振って各記号のbranchで異なるωを推定。

`NSsites`
:	塩基/アミノ酸サイトごとのdN/dSの設定。
:	0: サイト間でωが同じと仮定。branchモデルの時はこれ。
:	1: Neutral
:	2: Positive

`icode`
:	コドン暗号表どれ使うか。

`fix_kappa`
: kappaを固定するかどうか。
:	0: kappaを推定する。
: 1: kappaを固定する。

`kappa`
:	kappaの初期値。

`fix_omega`
:	ω=dN/dSを固定するかどうか。
:	0: 初期値から最尤推定する。
:	1: 初期値で固定する。

`omega`
:	ω=dN/dSの初期値。

`fixed_alpha`
: alphaを固定するかどうか。
:	0: alphaを推定する。
: 1: alphaを固定する。


### Branch model

系統樹上のある枝で正の自然選択が起きたかどうかを検定する。

大まかな流れとしては、「注目する枝で自然選択が働いていない = 他の枝と同じdN/dSである」という帰無仮説に対して、
「注目する枝で自然選択が働いた = 他の枝と異なるdN/dSである」という対立仮説を尤度比検定により検証する。

1. **対立仮説**

   「注目する枝で自然選択が働いた = 他の枝と異なるdN/dSである」という仮定のもとcodemlでdN/dSを計算する。

   `codeml.ctl` は下記の2箇所を変更する:

   ```ctl
   NSsites = 0
   model = 2
   ```

   インプットとしてコドンベースのアライメントファイルと、自然選択が起きたと想定する枝に `#1` を振ったnewickファイルを用意する:

   ```md
   (((Human, Chimpanzee)#1, Mouse), (Dog, Cat));
   #
   #              +----------- Dog
   # +------------|
   # |            +----------- Cat
   # |
   # |        +------------ Mouse
   # +--------|
   #          |        +--------- Chimpanzee
   #          +--------|
   #              #1   +--------- Human
   ```

   codemlはこのnewickファイルを読んで、異なる記号のついた枝ではdN/dSが異なるものとして複数のdN/dSを計算する。

   特定クレードの内部の枝全てに振ったり、複数の異なる記号を振ってもよい:

   ```md
   (((Human#1, Chimpanzee#1)#1, Mouse), (Dog, Cat#2));
   #
   #              +----------- Dog
   # +------------|
   # |            +----------- Cat
   # |                 #2
   # |        +------------ Mouse
   # +--------|
   #          |        +--------- Chimpanzee
   #          +--------|    #1
   #              #1   +--------- Human
   #                        #1
   ```

1. **帰無仮説**

   つづいて、「注目する枝で自然選択が働いていない = 他の枝と同じdN/dSである」という仮説でdN/dSを計算する。

   対立仮説で用いた `codeml.ctl` の `model` を０にして系統樹全体で単一のdN/dSを計算する:

   ```ctl
   NSsites = 0
   model = 0
   ```

3. **尤度比検定**

### Site model

### Branch-site model

[Yang and Nielsen 2002](https://doi.org/10.1093/oxfordjournals.molbev.a004148)

branchモデルとsiteモデルをあわせたモデル。
興味のある枝(foreground branch)のあるサイトに働いた自然選択を検出する。

1. **対立仮説**

   「注目する枝で正の自然選択が働いたサイトがある」という仮定でcodemlを実行する。

   `codeml.ctl` は下記の3箇所を変更する:

   ```ctl
   NSsites = 2
   model = 2
   fix_omega = 0
   ```

   各サイトはforeground branchのωとbackground branchのωによって4種類に分けられ、
   `outfile` 内に下のような表が得られる。

   |site class|0|1|2a|2b|
   |:---|---:|---:|---:|---:|
   |proportion|p<sub>0</sub>|p<sub>1</sub>|(1–p<sub>0</sub>–p<sub>1</sub>)p<sub>0</sub>/(p<sub>0</sub>+p<sub>1</sub>)|(1–p<sub>0</sub>–p<sub>1</sub>)p<sub>1</sub>/(p<sub>0</sub>+p<sub>1</sub>)|
   |background ω|ω<sub>0</sub>|ω<sub>1</sub>|ω<sub>0</sub>|ω<sub>1</sub>|
   |foreground ω|ω<sub>0</sub>|ω<sub>1</sub>|ω<sub>2</sub>|ω<sub>2</sub>|

   4種類の `site class` はそれぞれ、

   `0`
   :  background branchとforeground branchの両方でdN/dS<1 (i.e. purifying selection)であるサイト

   `1`
   :  background branchとforeground branchの両方でdN/dS=1 (i.e. neutral selection)であるサイト

   `2a`
   :  background branchではdN/dS<1、foreground branchではdN/dS>1 (i.e. positive selection)であるサイト

   `2b`
   :  background branchではdN/dS=1、foreground branchではdN/dS>1 (i.e. positive selection)であるサイト

2. **帰無仮説**

   「注目する枝で正の自然選択が働いたサイトがない」=「全ての枝でdN/dS<1である」という仮定のもとcodemlを実行する。

   対立仮説で使用した`codeml.ctl` の下記の2箇所を変更し、dN/dSを固定する（これでなんでdN/dS<1のサイトも出てくるんだろう）:

   ```ctl
   fix_omega = 1
   omega = 1
   ```
