---
title: "ETE Toolkit"
date: 2023-09-11T13:50:19+09:00
draft: true
---

http://etetoolkit.org/documentation/ete-evol/

ETE Toolkitの*ete-evol*はCodeMLやSlrの自動化を手助けするpython製コマンドラインツール。


## Installation

### `ete4`

```sh
# pip3 install lap  # if needed
pip3 install https://github.com/etetoolkit/ete/archive/ete4.zip
```

### `ete3`

*ete-evol* は外部ツールに依存するため、
`conda` を使ってインストールすることが推奨されている。

```sh
conda create -n ete3 python=3
conda activate ete3
conda install -c etetoolkit ete3 ete_toolchain
ete3 build check
conda activate ete3

## Linuxでcondaを介さないインストール
sudo apt-get install python-numpy python-qt4 python-lxml python-six
pip3 install --upgrade ete3
ete3 upgrade-external-tools
```

### 遺伝研

```sh
ls /usr/local/biotools/e/ete*
```

2023/09/11時点で `ete2` と `ete3` が利用可能。


## 基本的な使い方

```sh
ete3 evol -t tree_file --alg fasta_file -o outdir/ --models models --cpu N
```

`--models`

: |Model|Description|type|Citation|
|:---|:---|:---|:---|
|M0|negative-selection|null|[Yang 2000][Y00]|
|M1|relaxation|site|"|
|M2|positive-selection|"|"|
|M3|discrete|"|"|
|M4|frequencies|"|"|
|M5|gamma|"|"|
|M6|2 gamma|"|"|
|M7|relaxation|"|"|
|M8|positive-selection|"|"|
|M8a|relaxation|"|"|
|M9|beta and gamma|"|"|
|M10|beta and gamma + 1|"|"|
|M11|beta and normal > 1|"|"|
|M12|0 and 2 normal > 2|"|"|
|M13|3 normal > 0|"|"|
|SLR|positive/negative selection|"|[Massingham 2005][M05]|
|bsA|positive-selection|branch-site|[Zhang 2005][Z05]|
|bsA1|relaxation|"|"|
|bsB|positive-selection|"|[Yang 2002][Y02]|
|bsC|different-ratios|"|"|
|bsD|different-ratios|"|[Yang 2002][Y02], [Bielawski 2004][B04]|
|b_free|positive-selection|branch|[Yang 2002][Y02]|
|b_neut|relaxation|"|"|
|fb|free_ratios|"|"|
|fb_anc|free-ratios|"|"|

[Y00]: http://www.genetics.org/content/155/1/431.short
[M05]: http://www.genetics.org/content/169/3/1753.abstract
[Z05]: http://mbe.oxfordjournals.org/content/22/12/2472.short
[Y02]: https://doi.org/10.1093/oxfordjournals.molbev.a004148
[B04]: http://link.springer.com/article/10.1007/s00239-004-2597-8


### Marking trees

`--mark` で指定する。スペースで繋ぐことで複数の指定もできる。
2種をカンマで繋ぐ。カンマ3つだと共通祖先からの全ての枝を、カンマ2つだと共通祖先の枝のみ。

`--mark Human_EDN,,,Hylobates_EDN,Macaq_EDN,,,Papio_EDN`
: <img src="http://etetoolkit.org/static/img/evol_tree_marked_cplx1.png" width="480">

`--mark Macaq_ECP,,Macaq2_ECP,Human_ECP,,Goril_ECP`
: <img src="http://etetoolkit.org/static/img/evol_tree_marked_cplx2.png" width="480">

<small>画像は[ドキュメントページ](http://etetoolkit.org/documentation/ete-evol/)から引用</small>
