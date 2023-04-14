---
title: "OrthoFinder"
date: 2022-11-02T11:03:16+09:00
---
 
- 公式: https://github.com/davidemms/OrthoFinder
- Qiita: [OrthoFinderを用いたOrthologous解析](https://qiita.com/okuman/items/c7ef9588e990a670d3ee)

## Usage
解析したい種の遺伝子の配列(fastaファイル)を1つのディレクトリ(ex. fasta_dir)に用意して`-f`に渡すだけ。

```bash
orthofinder -f fasta_dir
```

## 出力
出力は`-f`に渡したディレクトリ中に`Result_*date*`ディレクトリが作られてその中に入る。以下は`ver2.5.2`の例。

- `Phylogenetic_Hierarchical_Orthogroups`
- `Single_Copy_Orthologue_Sequences`: シングルコピーオーソログの配列がOGごとに入る。
- `Orthogroup_Sequences`: 全OGのごとに配列が入る。
- `Comparative_Genomics_Statistics`
	- `Duplications_per_Orthogroup.tsv`: OGごとの重複（*）の数
	- `OrthologuesStats_Totals.tsv`: 1種対1種のオーソログの数
	- `OrthologuesStats_one-to-many.tsv, many2one, many2many`: 同上
	- `Statistics_PerSpecies.tsv`: 種ごとのオーソログの数に関する要約統計
	- `Duplications_per_Species_Tree_Node.tsv`: 種ごとの重複（*）の数
	- `Orthogroups_SpeciesOverlaps.tsv`: OrthologuesStats_Totalsと何が違う？
	- `Statistics_Overall.tsv`: 全体の要約統計
- `Phylogenetically_Misplaced_Genes`
- `Species_Tree`: 種の系統樹（.txt）が入ってる
- `Gene_Duplication_Events`
	- `Duplication.tsv`: OGごとにどのノードでどの遺伝子とどの遺伝子が重複したかが書かれてる
	- `SpeciesTree_Gene_Duplications_0.5_Support.txt`: 種の系統樹と若干違う？
- `Orthogroups`
	- `Orthogroups.GeneCount.tsv`: OG×種ごとの遺伝子数
	- `Orthogroups.tsv/.txt`: OG×種ごとの遺伝子名
	- `Orthogroups_SingleCopyOrthologues.txt`: シングルコピーOG名
	- `Orthogroups_UnassignedGenes.tsv`: １種しかいないOG名
- `Putative_Xenologs`: 水平伝播したと推定される遺伝子があれば。
- `WorkingDirectory`
	- `Blastなどの途中ファイル(圧縮されてはいってる。)
	- `SpeciesIDs.txt`: 再解析(後述)をする際に必要。
- `Gene_Trees`: OGごとの系統樹（.txt）が入ってる。
- `Orthologues`
	- `Orthologues_*種名*`: 1種対1種のオーソログが書かれてる。
- `Resolved_Gene_Trees`: OGごとの種分化を考慮した系統樹。４遺伝子以上のOGまでしか書かれていない。

### Unassigned geneとSpecies-specific Orthogroup
両方とも系統特異的な遺伝子であると考えられ、Unassigned geneはそのうちシングルトンであるもの（自身の中にもパラログが存在しない）、Species-specific Orthogroupはそのうち重複遺伝子であるもの。系統特異的な重複とは異なる。

## 種の追加/除外
### 種の追加を行う場合
追加したい種のfastaファイルが入ったディレクトリを用意して、
```bash
orthofinder -b /Result_*/WorkingDirectory -f new_fasta_directory
```
結果は/WorkingDirectory/OrthoFinder/Result_*Date*/に出力される。

### 種を除外する場合
/Result_*/WorkingDirectory/にあるSpeciesIDs.txtを編集し、除外する種を`#`でコメントアウトする。その上で、
```bash
orthofinder -b /Result_*/WorkingDirectory
```
を実行する。`-f`で追加ディレクトリを指定すれば追加と除外を同時に行うことも可能。

## 遺伝研
`biotools`にある。
```bash
ls /usr/local/biotools/o/orthofinder*
```

### 並列化
種数にもよるが全種×全種で`blast`する都合上かなりメモリを食うので、`medium`に並列で投げることをおすすめする。下記は5スロットで投げる例。
```bash
#$ -S /bin/bash
#$ -cwd
#$ pe def_slot 5
#$ -l medium
#$ -l s_vmem=64G
#$ -l mem_req=64G

module load singularity
singularity exec /usr/local/biotools/o/orthofinder:%ver orthofinder -f dir -t 5 -a 5
```

