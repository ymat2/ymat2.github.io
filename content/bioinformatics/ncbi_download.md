---
title: "NCBIからゲノムデータを一括ダウンロード"
date: 2022-11-21T08:00:21+09:00
---

- https://www.ncbi.nlm.nih.gov/datasets/docs/v2/download-and-install/
- https://www.ncbi.nlm.nih.gov/genome/doc/ftpfaq/

`rsync`, `wget`, `curl`などが使えるらしい。公式には `datasets` コマンドが推奨されている。


## data_hubから分類群を指定してダウンロード
1. https://www.ncbi.nlm.nih.gov/data-hub/genome/ にアクセス。
2. <kbd>Selected taxa</kbd>で分類群を指定。（例えば"Aves"）
3. <kbd>Filters</kbd>でフィルタリング。
4. Assemblyを選択して<kbd>Download</kbd>。
	- Download Tableは検索結果の表。
	- Download Packageはfile type(gff, fna, faaなど)を指定してダウンロード。
5. <kbd>Select columns</kbd>からゲノムサイズやGene Contentなども表示させることができる。

## コマンドラインで一括ダウンロード
### Accessionを指定してダウンロード

- `datasets` コマンドを使う方法:

	https://www.ncbi.nlm.nih.gov/datasets/docs/v2/how-tos/genomes/download-genome/

	`datasets` コマンドをインストールする:

	```sh
	## Linux
	curl -o datasets 'https://ftp.ncbi.nlm.nih.gov/pub/datasets/command-line/v2/linux-amd64/datasets'
	chmod +x datasets	# 実行権限を付与

	## Mac
	curl -o datasets 'https://ftp.ncbi.nlm.nih.gov/pub/datasets/command-line/v2/mac/datasets'
	chmod +x datasets
	```

	accessionを指定してダウンロード:

	```sh
	datasets download genome accession GCF_000001405.40 \
		--filename human_GRCh38_dataset.zip \
		--include genome
	```
	`--include` でファイルを指定。デフォルトは `genomic.fna`。
	他に `gtf`, `gff`, `cds`, `protein`, `rna` など。
	`none` を指定するとdata reportだけ取得する。

- `curl` コマンドを使う方法:

	```sh
	curl -OJX GET "https://api.ncbi.nlm.nih.gov/datasets/v1/genome/accession/GCF_000002315.6/download?exclude_sequence=True&include_annotation_type=PROT_FASTA&filename=GCF_000002315.6.zip" -H "Accept: application/zip"

	# exclude_sequence=True: genomic.fnaを除外
	# include_annotation_type: GENOME_GFF,RNA_FASTA,CDS_FASTA,PROT_FASTAから
	```
