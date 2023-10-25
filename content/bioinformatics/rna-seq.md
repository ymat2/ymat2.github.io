---
title: "NGS解析①"
subtitle: "RNA-seq"
toc: true
date: 2023-10-07T15:35:27+09:00
draft: true
---


## Requirements

```sh
sratoolkit    # brew install sratoolkit
fastp         # brew install brewsci/bio/fastp
adoptopenjdk  # brew install --cask adoptopenjdk
trinity       # brew install brewsci/bio/trinity
hisat2        # brew install brewsci/bio/hisat2
stringtie     # brew install stringtie
RSEM          # https://github.com/deweylab/RSEM
IGV           # brew install --cask IGV
```


## `.fastq` format

```txt
@SRR9665770.23/1 23 length=40               # @配列ID
GGACCAAGAATAGTAAGCTCCATTGGGTTACTCGATCCAG    # 配列
+SRR9665770.23/1 23 length=40               # +
CCCCCG@FCFFCFFFD<EFGGGGF,,,BF8C;@,,CFGF,    # クオリティ値
```

クオリティ値

: クオリティ値の記号は[ASCⅡコード](https://www.ascii-code.com/)に従う。
  (リンク先の表でDEC33から。ただし1文字表記のみのため-33する。)

: sequencing error の確率を *p* としたとき、
  *Q* = -10 × log<sub>10</sub>*p*

: 例えば *Q* = 30 (`?`) ならエラー率 *p* = 10<sup>-3</sup>、
  *Q* = 40 (`I`) なら *p* = 10<sup>-4</sup>


## クオリティコントロール

配列の取得:

```sh
prefetch ERR459065                      # SRAデータの取得
fasterq-dump ERR459065/ERR459065.sra    # バイナリファイルを.fastqに変換
```

クオリティコントロール:

```sh
# single-end
fastp -i ERR459065.sra.fastq -o qc_ERR459065.sra.fastq.gz -q 20 -u 40 -h report.html
# paired-end + options
fastp -i SRR9665770_1.fastq -I SRR9665770_2.fastq \
  -o qc_SRR9665770_1.fastq.gz -O qc_SRR9665770_2.fastq.gz \
  -h report.html -q 30 -u 30 -f 1 -F 1 -t 2 -T 2
```

`-i`, `-I`
: インプットファイル

`-o`, `-O`
: アウトプットファイル
: 拡張子を `.gz` にして圧縮したままの操作も可能

`-h`
: 出力htmlファイル (クオリティコントロールの概要)

`-q`
: クオリティ値の下限 (デフォルトは15)

`-u`
: クオリティ値下限を下回る塩基が何%以上含まれている配列を除くか
  (デフォルトは40)

`-f`, `-F`, `-t`, `-T`
: それぞれ5'側、3'側のトリミング長


## 参照配列あり

ゲノム配列、遺伝子位置情報の取得:

```sh
wget https://ftp.ensembl.org/pub/release-110/fasta/saccharomyces_cerevisiae/dna/Saccharomyces_cerevisiae.R64-1-1.dna.toplevel.fa.gz
wget https://ftp.ensembl.org/pub/release-110/gtf/saccharomyces_cerevisiae/Saccharomyces_cerevisiae.R64-1-1.110.gtf.gz
gunzip -d Saccharomyces_cerevisiae.R64-1-1.dna.toplevel.fa.gz
gunzip -d Saccharomyces_cerevisiae.R64-1-1.110.gtf.gz
```

readマッピング:

```sh
# インデックス作成
hisat2-build Saccharomyces_cerevisiae.R64-1-1.dna.toplevel.fa ScerGenome
# single-end
hisat2 -x ScerGenome -U qc_ERR459065.sra.fastq.gz -S ERR459065_hisat2.sam -p 4
# paired-end
hisat2 -x ScerGenome -1 qc_SRR9665770_1.fastq.gz -2 qc_SRR9665770_2.fastq.gz -S SRR9665770_hisat2.sam -p 4
```

`-x`
: 参照配列のインデックス

`-1`, `-2`, `-U`
: インプットファイル。`.gz` や `.bz2` でもOK。

`-S`
: 出力SAMファイル

`-p`
: CPU数

readの可視化:

```sh
# ソートとBAMへの圧縮
samtools sort -O BAM SRR9665770_hisat2.sam -o SRR9665770_hisat2.s.bam
# インデックスの作成
samtools index SRR9665770_hisat2.s.bam
# 閲覧 (?でhelp表示, qで閲覧画面から出る)
samtools tview SRR9665770_hisat2.s.bam  Saccharomyces_cerevisiae.R64-1-1.dna.toplevel.fa.gz
```

発現量推定:

```sh
stringtie -e SRR9665770_hisat2.s.bam -G Saccharomyces_cerevisiae.R64-1-1.110.gtf -o SRR9665770_stringtie.gtf
```


## 参照配列なし

SRA readsを *de novo* assembly して参照配列を作成する。

*de novo* assembly:

```sh
## single-end
Trinity --CPU 4 --max_memory 8G --full_cleanup --seqType fq \
  --single qc_ERR459065.sra.fastq.gz \    # カンマ(,)で複数繋げることも可
  --output trinity_ERR459065
## paired-end
Trinity --CPU 4 --max_memory 8G --full_cleanup --seqType fq \
  --left qc_SRR9665770_1.fastq.gz --right qc_SRR9665770_2.fastq.gz \
  --output trinity_SRR9665770
```

`--full_cleanup`
: 中間ファイルの削除


## Misc.

### インデックスの作成とは

readをマッピングをするにはそのreadの配列がゲノム上のどの領域に由来するのかを決める必要がある。
HISAT2やBWAなどのマッピングツールは、**FM index**とよばれる文字列検索アルゴリズムを用いてマッピングを行う。
