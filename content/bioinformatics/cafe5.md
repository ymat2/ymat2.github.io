---
title: "CAFE5"
date: 2023-01-27T07:37:02+09:00
---

[CAFE]({{< ref "cafe.md" >}})のメジャーアップデート版。
- Github: https://github.com/hahnlab/CAFE5
- 論文: https://doi.org/10.1093/bioinformatics/btaa1022

ドキュメントが丁寧に書いてあるので助かる。
- https://github.com/hahnlab/CAFE5/blob/master/README.md
- https://github.com/hahnlab/CAFE5/blob/master/docs/tutorial/tutorial.md

## 新しい機能
- 各遺伝子ファミリーが異なる速度で進化することを仮定したパラメータ推定を行う。
- シェルスクリプトを書く必要がなくなった。
- エラーモデルの最適化やサマリーテーブルの出力が内部で行われるようになった。（Pythonスクリプトが不要になった。）

## インストール
### Download
- https://github.com/hahnlab/CAFE5/releases から
- または、`git clone https://github.com/hahnlab/CAFE5.git`

### Compile
```sh
cd CAFE5
./configure
make
```
実行ファイルは`CAFE5/bin/`にあるので、ここに`$PATH`を通す。

### OSXの場合
`src/matrix_cache.cpp:2:10: fatal error: 'omp.h' file not found`などコンパイラが見つからない系のエラーが出る場合があるらしい。`gcc`を入れてシンボリックリンクを張る：
```sh
brew install gcc
find / -name omp.h
ln -sv path/to/omp.h /usr/local/include/
```
改めて、
```sh
make
```

### 遺伝研
`singularity`が楽。
```sh
ls /usr/local/biotools/c/cafe:5*
```

## Quick Start
基本的に必要なファイルは以前のCAFEと同じ。

1. 種ごと、遺伝子ファミリーごとの遺伝子数のテーブル（タブ区切り）。[OrthoFinder]({{< ref "orthofinder.md" >}})とかOrthoMCLとかでつくる。

	例：gene_families.txt
|Description|ID|Chicken|Lizard|Mouse|
|:---|:---|---:|---:|---:|
|OG00001|OG00001|12|14|21|
|OG00002|OG00002|9|13|5|
|OG00003|OG00003|7|0|4|

2. Newick形式の系統樹。binary, rooted, ultrametricである必要がある。（cf. Rパッケージ`ape::is.binary()`, `ape::is.rooted()`, `ape::is.ultrametric()`）

	例：species_tree.txt
	```
	(Mouse:319.00000000,(Lizard:281.10000000,Chicken:281.10000000):37.90000000);
	```

3. cafeコマンドを実行。
	- 遺伝子ファミリー間で進化速度が一定であるという仮定の下で、遺伝子ファミリーの進化速度を推定:
		```sh
		cafe5 -i gene_families.txt -t species_tree.txt
		```

	- 遺伝子ファミリーごとの進化速度が異なるという仮定の下で、遺伝子ファミリーの進化速度を推定:
		```sh
		cafe5 -i gene_families.txt -t species_tree.txt -k 3
		```

	- 特定の系統で遺伝子ファミリーの進化速度が異なることを仮定する場合、以前のバージョンと同じようにλ構造を規定したNewickファイルを用意する:

		例：lambda_structure.txt
		```
		(Mouse:1,(Lizard:1,Chicken:2):1);  # Chickenの系統で進化速度が異なることを仮定。
		```
		```sh
		cafe5 -i gene_families.txt -t species_tree.txt -y lambda_structure.txt
		```

## 出力ファイル
`-o`で出力先を指定しなければ実行ディレクトリに`result/`ディレクトリが作られてその中に格納される。

- *model*_asr.tre<br>: 各遺伝子ファミリーごとに再構成された系統樹が書かれている。ノード名＋アンダースコアに続く形でそのノードでの推定遺伝子数が書かれており、有意な増減があったノードには`*`がふってある。
- *model*\_family\_results.txt<br>: 遺伝子ファミリー、P値、変化が有意であるかどうか（y/n）がタブ区切りで記述されている。
- *model*\_clade\_results.txt<br>: 各ノードごとに遺伝子数が増加/減少したファミリーの数が書いてある。
- *model*\_branch\_probabilities.txt<br>: 各ノード、各遺伝子ファミリーにおける確率（なんの？）のタブ区切りリスト。ガンマモデルの場合、有意な変化があったファミリーについてのみ書かれている。
- *model*\_family\_likelihoods.txt<br>: Baseモデルでは各ファミリーごとの尤度、ガンマモデルではそれに加えて事後確率がタブ区切りで書かれている。
- *model*_result.txt<br>: 選択されたモデルの名前、そのモデルの最終的な尤度、遺伝子数の進化速度にあたるLambdaなどが書かれている。
- *model*_change.txt<br>: 各遺伝子ファミリーについて、各ノードにおける親ノードからの遺伝子数の変化量が書いてある。
- *model*_count.txt<br>: 各遺伝子ファミリーについて、各ノードにおける推定遺伝子数。
