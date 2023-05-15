---
title: "PAML"
date: 2023-04-02T16:25:54+09:00
draft: true
---

<u>P</u>hylogenetic <u>A</u>nalysis by <u>M</u>aximum <u>L</u>ikelihood

DNAやタンパク質の配列を最尤法で系統解析するための種々のプログラムを含むパッケージ。

## 遺伝研
`/usr/local/biotools/p/`にいくつかのバージョンが用意されている。
```bash
singularity exec /usr/local/biotools/p/paml:%ver codeml
```

## `codeml`
### コントロールファイル: `codeml.ctl`
`seqfile`
:	DNAまたはタンパク質の配列

`treefile`
:	系統樹。tipは`seqfile`と一致している必要がある。

`outfile`
:	出力ファイル。

`noisy`
:	0,1,2,3,9から指定。大きい数を指定するほど標準出力が増える。

`verbose`
:	0: conciseな出力。アライメントなしで出力。
:	1: detailedな出力。アライメントありで出力。

`runmode`
:	..

`seqtype`
:	..

`CodonFreq`
:	..

`clock`
:	..

`model`
:	系統樹の各branchにおけるω=dN/dSの設定。
:	0: 系統樹全体で均一のωを推定。
:	1: branchごとに異なるωを推定。
:	2: `treefile`のbranchに`#`, `#1`などの記号を振って各記号のbranchで異なるωを推定。

`NSsite`
:	塩基/アミノ酸サイトごとのdN/dSの設定。
:	0: サイト間でωが同じと仮定。branchモデルの時はこれ。
:	1: Neutral
:	2: Positive

`icode`
:	コドン暗号表どれ使うか。

`fix_kappa`
:	..

`kappa`
:	kappaの初期値。

`fix_omega`
:	ω=dN/dSを固定するかどうか。
:	0: 初期値から最尤推定する。
:	1: 初期値で固定する。

`omega`
:	ω=dN/dSの初期値。

`fixed_alpha`
:	..

`alpha`
:	alphaの初期値。

`Malpha`
:	..

`ncatG`
:	..

`getSE`
:	..

`RateAncestor`
:	..

`fix_blength`
:	..

`method`
:	..
