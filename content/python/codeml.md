---
title: "Biopython①"
subtitle: "pythonでcodemlを動かす"
date: 2023-08-24T10:24:09+09:00
draft: true
---

https://biopython.org/wiki/PAML

Requirements
: Biopython >= 1.58
: PAML >= 4.1

PAML自体の使い方は[PAML]({{< ref paml.md >}})のページを参照


## 基本的な使い方

パッケージのインポート:

```python
from Bio.Phylo.PAML import codeml
```

`Codeml` コンストラクタを生成:

```python
cml = codeml.Codeml(
  alignment="align.phylip",   # アライメント
  tree="species.tree",        # 系統樹
  out_file="results.out",     # 出力ファイル
  working_dir="./scratch",    # 作業ディレクトリ
)
```

オプションの設定（freeモデルの場合の例）:

```python
cml.set_options(NSsites=[0])    # NSsitesはリストで渡す
cml.set_options(model=1)
```

オプションは `print_options` で確認できる。`None` になっているものは解析時に無視される:

```python
>>> cml.print_options()
noisy = None
verbose = None
runmode = None
seqtype = None
CodonFreq = None
ndata = None
clock = None
aaDist = None
aaRatefile = None
model = 1
NSsites = 0
icode = None
Mgene = None
fix_kappa = None
kappa = None
fix_omega = None
omega = None
fix_alpha = None
alpha = None
Malpha = None
ncatG = None
getSE = None
RateAncestor = None
Small_Diff = None
cleandata = None
fix_blength = None
method = None
rho = None
fix_rho = None
```
