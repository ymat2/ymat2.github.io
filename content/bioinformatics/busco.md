---
title: "BUSCO"
date: 2022-11-25T08:05:55+09:00
---

https://busco.ezlab.org/

Universal Single Copy Orthologsが、アセンブルされた配列中にどれだけあるか調べることでゲノムや遺伝子セットの完全性を評価する。どの遺伝子がユニバーサルシングルコピーかは[OrthoDB](http://www.orthodb.org/)に基づいており、分類群ごとに数は異なる。（公式サイトの[リスト](https://busco.ezlab.org/list_of_lineages.html)から参照可能。）


## インストール
### Docker Image
```sh
docker pull ezlabgva/busco:v5.4.3_cv1
docker run -u $(id -u) -v $(pwd):/busco_wd ezlabgva/busco:v5.4.3_cv1
```

### Conda Package
```sh
conda install -c conda-forge -c bioconda busco=5.4.2
```

### Homebrew
```sh
brew install busco
```


## 使い方
```sh
busco -i [SEQUENCE_FILE] -l [LINEAGE] -o [OUTPUT_NAME] -m [MODE] [OTHER OPTIONS]
```

`-i`, `--in`
:	塩基配列またはアミノ酸配列のFastaファイル。

`-o`, `--out`
:	出力。ここで指定した名前のディレクトリが生成される。

`-m`, `--mode`
:	ゲノムなら`genome`、トランスクリプトームなら`transcriptome`、タンパク質なら`protein`。

`-l`, `--lineage_dataset`
:	ユニバーサルシングルコピーのデータセット。相対パス`./bacteria_odb10`か、絶対パス`/home/user/bacteria_odb10`で指定する。前者の場合はデータセットが自動的にダウンロードされ、後者の場合は既存であることを想定する。が、前者の場合もあらかじめ用意しておいた方が安全。(https://busco-data.ezlab.org/v4/data/lineages/)

`--auto-lineage`
:	`-l `の代わりに自動でデータベースを選ばせることも可能。だが個人的にあまりお勧めしない。


## 出力
`-o`で指定したディレクトリ下に`short_summary.*.lineage_odb10.out.txt`というファイルができる。
```
# BUSCO version is: 5.4.3 
# The lineage dataset is: aves_odb10 (Creation date: 2020-09-10, number of genomes: 8338, number of BUSCOs: 62)
# Summarized benchmarking in BUSCO notation for file /home/yukimatsu/avian-locom/blst/GCA_013389925.1.pep.fa
# BUSCO was run in mode: proteins

    ***** Results: *****

    C:72.8%[S:72.4%,D:0.4%],F:7.4%,M:19.8%,n:8338   
    6067    Complete BUSCOs (C)         
    6037    Complete and single-copy BUSCOs (S) 
    30  Complete and duplicated BUSCOs (D)  
    618 Fragmented BUSCOs (F)           
    1653    Missing BUSCOs (M)          
    62  Total BUSCO groups searched     

Dependencies and versions:
    hmmsearch: 3.1
    busco: 5.4.3
```

このような形で、完全長がシングルコピー、または重複して存在する（Complete）、断片化して存在する（Fragmented）、ロストしている（Missing）遺伝子の割合が確認できる。


## 遺伝研でBUSCOを動かす
`singularity`で用意されているものを使うのが楽。

1. けっこうメモリを食うので、多めのメモリを指定してログイン:
	```sh
	qlogin -l mem_req=32G,s_vmem=32G
	```

2. 使えるバージョンを見てみる:
	```sh
	ls /usr/local/biotools/b/busco*
	```

3. `singularity`で動かす:
	```sh
	singularity exec -e /usr/local/biotools/b/busco:version busco -i hoge.fa -o fuga -l bacteria_odb10 -m protein
	```

