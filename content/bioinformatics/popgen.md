---
title: "NGS解析②"
subtitle: "集団ゲノミクス"
date: 2023-10-08T12:30:37+09:00
draft: true
---


## Requirements

```sh
bwa       # brew install bwa
bcftools  # brew install bcftools
snpEff    # brew install snpEff
IGV       # brew install --cask IGV
```

## Quality control

詳細は[NGS解析①]({{< ref rna-seq.md >}})を参照。

```sh
prefetch ERR2442475
fasterq-dump ERR2442475/ERR2442475.sra
fastp -i ERR2442475_1.fastq -I ERR2442475_2.fastq \
  -o qc_ERR2442475_1.fq.gz -O qc_ERR2442475_2.fq.gz \
  -q 30 -u 30 -h ERR2442475.qc.html
```


## Read mapping

参照配列取得:

```sh
wget
wget
gunzip -d
gunzip -d
```

インデックス作成とマッピング:

```sh
bwa index Gallus_gallus.bGalGal1.mat.broiler.GRCg7b.dna.toplevel.fa
bwa mem -t 4 -M Gallus_gallus.bGalGal1.mat.broiler.GRCg7b.dna.toplevel.fa \
  qc_ERR2442475_1.fq.gz qc_ERR2442475_2.fq.gz > ERR2442475.sam
```

samtoolsによる操作:

```sh
samtools view -b -F 4 ERR2442475.sam > ERR2442475.f.bam   # BAMファイルへ
samtools rmdup -s ERR2442475.f.bam ERR2442475.fr.bam      # 重複削除
samtools sort ERR2442475.fr.bam -o ERR2442475.sfr.bam     # ソート
samtools index ERR2442475.sfr.bam                         # index作成
```

### BWA

- https://bio-bwa.sourceforge.net/
- https://github.com/lh3/bwa

RNA-seqやDNA-seqのロングリードマッピングによく用いられる。
リードの特性に応じて複数のアルゴリズムが用意されており、
ショートリード (70-100bp) にはBWA-backtrack (`bwa aln`, [Li and Durbin 2009](https://doi.org/10.1093/bioinformatics/btp324))、
ロングリードにはBWA-SW (`bwa bwasw`, [Li and Durbin 2010](https://doi.org/10.1093/bioinformatics/btp698))、
ギャップを多く含むリードにはBWA-MEM (`bwa mem`) が推奨されている。


## [Variant calling](https://samtools.github.io/bcftools/howtos/variant-calling.html)

変異の検出:

```sh
bcftools mpileup -f Gallus_gallus.bGalGal1.mat.broiler.GRCg7b.dna.toplevel.fa ERR2442475.sfr.bam | bcftools call --ploidy 2 -v -c -o ERR2442475.vcf
```

`--ploidy`
: ハプロイドは1, ディプロイドは2

`-v`, `--variants-only`
: 変異のみ出力する

低品質変異の除去:

```sh
bcftools filter -i 'QUAL>30' ERR2442475.vcf > hq_ERR2442475.vcf
```


## [Variant annotation](https://samtools.github.io/bcftools/howtos/annotate.html)

### データベースを拾ってきて使う

データベースを探す:

```sh
snpEff databases | grep Gallus
# Galgal4.75 Gallus_gallus http://downloads.sourceforge.net/project/snpeff/databases/v4_3/snpEff_v4_3_Galgal4.75.zip
# Gallus_gallus-5.0.86 Gallus_gallus OK http://downloads.sourceforge.net/project/snpeff/databases/v4_3/snpEff_v4_3_Gallus_gallus-5.0.86.zip
```

データベースをダウンロード:

```sh
snpEff download -v Gallus_gallus-5.0.86
```

アノテーション:

```sh
snpEff Gallus_gallus-5.0.86 hq_ERR2442475.vcf > hq_ERR2442475_snpeff.vcf
```

### データベースを作って使う

データベースが落ちてなくても、gtfやgffから作成することができる。らしい。


## [Create consensus sequence](https://samtools.github.io/bcftools/howtos/consensus-sequence.html)

`bgzip` でvcfを圧縮する:

```sh
bgzip hq_ERR2442475.vcf               # vcfの圧縮
bcftools index hq_ERR2442475.vcf.gz   # indexの作成
```

`bgzip` の `-i` オプションや `-r` オプションで作られるindex `.gzi` は使えない。
bcftools側で作るindex `.csi` を使う。

`bcftools` でコンセンサス配列作成:

```sh
bcftools consensus -f Gallus_gallus.bGalGal1.mat.broiler.GRCg7b.dna.toplevel.fa hq_ERR2442475.vcf.gz > ERR2442475.consesus.fa
```


## Merge multiple VCF

参照配列が同じでサンプルが異なる複数のVCFを横方向に結合する。

```sh
bcftools merge A.vcf.gz B.vcf.gz C.vcf.gz -0 -o ABC_merged.vcf
```

`-0`
: SNP情報がないサンプルのカラムを `REF/REF` (`0/0`) であるものとする。
: このオプションなしだと欠損扱い `./.` になって厄介な場合がある。
