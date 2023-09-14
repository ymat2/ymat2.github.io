---
title: "KEGGパスウェイ"
subtitle: "clusterProfilerによる濃縮解析"
date: 2023-06-26T16:36:11+09:00
---

- https://bioconductor.org/packages/release/bioc/html/clusterProfiler.html
- https://www.genome.jp/kegg/kegg_ja.html

KEGG(Kyoto Encyclopedia of Genes and Genomes)は、
主にモデル生物における遺伝子やタンパク質の分子間ネットワークに関する情報を体系化したデータベース。


## KEGG enrichment analysis

https://yulab-smu.top/biomedical-knowledge-mining-book/clusterprofiler-kegg.html

```R
BiocManager::install("clusterProfiler")
library(clusterProfiler)
```

利用可能な生物種を探す:

```R
search_kegg_organism('hsa', by='kegg_code')
search_kegg_organism('Homo sapiens', by='scientific_name')
```

[KEGG Organismsのページ](https://www.genome.jp/kegg/catalog/org_list.html)から探してもいい。

GOエンリッチメント解析と同様に、興味のある遺伝子/ない遺伝子で区切る解析と、
なんらかのスコアに基づいてソートした時に上位に濃縮するパスウェイを調べる解析がサポートされている。


### KEGG pathway over-representation analysis

興味のある遺伝子/ない遺伝子で区切って、興味のある遺伝子たちに濃縮するKEGGパスウェイを調べる。


```R
data(geneList, package="DOSE")
gene <- names(geneList)[abs(geneList) > 2]

kk <- enrichKEGG(
  gene,
  organism = "hsa",
  keyType = "kegg",
  pvalueCutoff = 0.05,
  pAdjustMethod = "BH",
  universe = geneList,
  minGSSize = 10,
  maxGSSize = 500,
  qvalueCutoff = 0.2,
  use_internal_data = FALSE
)
head(kk)
```

### KEGG pathway gene set enrichment analysis

遺伝子をなんらかのスコア(P値とかlog2FCとか)で並べて、上位の遺伝子に濃縮するKEGGパスウェイを調べる。

```R
data(geneList, package="DOSE")

kk2 <- gseKEGG(
  geneList,
  organism = "hsa",
  keyType = "kegg",
  exponent = 1,
  minGSSize = 10,
  maxGSSize = 500,
  eps = 1e-10,
  pvalueCutoff = 0.05,
  pAdjustMethod = "BH",
  verbose = FALSE,
  use_internal_data = FALSE,
  seed = FALSE,
  by = "fgsea",
  scoreType = "pos"  # or neg
)
head(kk2)
```

渡す `geneList` はスコアの降順で並んでいる必要がある。
`scoreType` はデフォルトでは `"pos"` でスコアが高いほど上位であるとして濃縮を見ているが、
`"neg"` にすればスコアが低いほど上位であるとすることができる。


## `setReadable`

ENTREZ_IDのままだとどの遺伝子か分かりにくい。
`setReadable` は `org.Hs.eg.db` とかからIDとgene_symbolの対応を取得して変換する。

```R
library(org.Hs.eg.db)
kk2 |> setReadable(OrgDb = org.Hs.eg.db, keyType="ENTREZID")
```


## 可視化

- https://yulab-smu.top/biomedical-knowledge-mining-book/enrichplot.html
- https://yulab-smu.top/biomedical-knowledge-mining-book/clusterprofiler-kegg.html#visualize-enriched-kegg-pathways

```R
dotplot(kk2, showCategory = 10, title = "Enriched Pathways" , split=".sign")
# とか
cnetplot(kk2, showCategory = 5, categorySize="pvalue")
# とか
```

パスウェイの図が欲しければ `pathview` とか:

```R
library("pathview")
pathview(
  gene.data = geneList,
  pathway.id = "hsa04110",
  species = "hsa",
  limit = list(gene=max(abs(geneList)), cpd=1)
)
```
