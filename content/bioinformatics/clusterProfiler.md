---
title: "KEGGパスウェイ"
subtitle: "clusterProfilerによる濃縮解析"
date: 2023-06-26T16:36:11+09:00
draft: true
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
)
head(kk2)
```
