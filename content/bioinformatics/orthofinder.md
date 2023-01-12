---
title: "OrthoFinder"
date: 2022-11-02T11:03:16+09:00
---
 
- 公式: https://github.com/davidemms/OrthoFinder
- Qiita: [OrthoFinderを用いたOrthologous解析](https://qiita.com/okuman/items/c7ef9588e990a670d3ee)

### 出力ディレクトリの構造
```
入力ディレクトリ/
└ OrthoFinder
	└ Result_*date*
		├ Phylogenetic_Hierarchical_Orthogroups
		├ Single_Copy_Orthologue_Sequences
		|	└ シングルコピーオーソログの配列がOGごとに入ってる
		|
		├ Orthogroup_Sequences
		|	└ 全OGのごとに配列が入ってる
		|
		├ Comparative_Genomics_Statistics
		|	└ Duplications_per_Orthogroup.tsv: OGごとの重複（*）の数
		|	└ OrthologuesStats_Totals.tsv: 1種対1種のオーソログの数
		|	└ OrthologuesStats_one-to-many.tsv, many2one, many2many: 同上
		|   └ Statistics_PerSpecies.tsv: 種ごとのオーソログの数に関する要約統計
		|   └ Duplications_per_Species_Tree_Node.tsv: 種ごとの重複（*）の数
		|   └ Orthogroups_SpeciesOverlaps.tsv: OrthologuesStats_Totalsと何が違う？
		|   └ Statistics_Overall.tsv: 全体の要約統計
		|
		├ Phylogenetically_Misplaced_Genes
		|
		├ Species_Tree
		|	└ 種の系統樹（.txt）が入ってる
		|
		├ Gene_Duplication_Events
		|   └ Duplication.tsv: OGごとにどのノードでどの遺伝子とどの遺伝子が重複したかが書かれてる
		|   └ SpeciesTree_Gene_Duplications_0.5_Support.txt: 種の系統樹と若干違う？
		|
		├ Orthogroups
		|   └ Orthogroups.GeneCount.tsv: OG×種ごとの遺伝子数
		|   └ Orthogroups.tsv/.txt: OG×種ごとの遺伝子名
		|   └ Orthogroups_SingleCopyOrthologues.txt: シングルコピーOG名
		|   └ Orthogroups_UnassignedGenes.tsv: １種しかいないOG名
		|
		├ Putative_Xenologs
		|   └ 水平伝播した遺伝子の何か？
		|
		├ WorkingDirectory
		|   └ Blastなどの途中ファイル
		|
		├ Gene_Trees
		|   └ OGごとの系統樹（.txt）が入ってる
		|
		├ Orthologues
		|   └ Orthologues_*種名*
		|		└ 1種対1種のオーソログが書かれてる
		|
		└ Resolved_Gene_Trees
			└ OGごとの種分化を考慮した系統樹。４遺伝子以上のOGまでしか書かれていない。
```

### Unassigned geneとSpecies-specific Orthogroup
両方とも系統特異的な遺伝子であると考えられ、Unassigned geneはそのうちシングルトンであるもの（自身の中にもパラログが存在しない）、Species-specific Orthogroupはそのうち重複遺伝子であるもの。系統特異的な重複とは異なる。

### 種の追加を行う場合
追加したい種のfastaファイルが入ったディレクトリを用意して、
```
orthofinder -b /Result_*/WorkingDirectory -f New_fasta_directory
```
結果は/WorkingDirectory/OrthoFinder/Result_*Date*/に出力される。

### 種を除外する場合
/Result_*/WorkingDirectory/にあるSpeciesIDs.txtを編集し、除外する種を`#`でコメントアウトする。その上で、
```
orthofinder -b /Result_*/WorkingDirectory
```
を実行する。`-f`で追加ディレクトリを指定すれば追加と除外を同時に行うことも可能。
