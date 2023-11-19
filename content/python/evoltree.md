---
title: "EvolTree"
subtitle: "python で dN/dS解析"
date: 2023-10-25T16:19:47+09:00
---

[ETE toolkit](http://etetoolkit.org/) の
[ete-evol]({{< ref ete-toolkit.md >}}) を
pythonスクリプトの中で動かす。

- reference: http://etetoolkit.org/docs/latest/reference/reference_evoltree.html
- tutorial: http://etetoolkit.org/docs/latest/tutorial/tutorial_adaptation.html


## Installation

[ete-toolkit]({{< ref ete-toolkit.md >}}) を参照。


## 準備

系統樹とアライメントを読み込む:

```python
from ete3 import EvolTree

tree = EvolTree(
  "((Hylobates_lar,(Gorilla_gorilla,Pan_troglodytes)),Papio_cynocephalus);",
  binpath = path_to_codeml
)
tree.link_to_alignment("""
  >Hylobates_lar
  ATGGCCAGGTACAGATGCTGCCGCAGCCAGAGCCGGAGCAGATGTTACCGCCAGAGCCGGAGCAGATGTTACCGCCAGAGGCAAAGCCAGAGTCGGAGCAGATGTTACCGCCAGAGCCAGAGCCGGAGCAGATGTTACCGCCAGAGACAAAGAAGTCGGAGACGAAGGAGGCGGAGCTGCCAGACACGGAGGAGAGCCATGAGGTGT---CGCCGCAGGTACAGGCTGAGACGTAGAAGCTGTTACCACATTGTATCT
  >Papio_cynocephalus
  ATGGCCAGGTACAGATGCTGCCGCAGCCAGAGCCGAAGCAGATGCTATCGCCAGAGCCGGAGCAGATGTAACCGCCAGAGACAGAGCCAAAGCCGGAGAAGCTGCTATCGCCAGAGCCAAAGCCGGAGCAGATGTTACCGCCAGAGACAGAGAAGTCGTAGACGAAGGAGGCGACGCTGCCAGACACGGAGGAGAGCCATGAGGTGCTTCCGCCGCAGGTACAGGCTGAGGCGTAGGAGGCCCTATCACATCGTGTCT
  >Gorilla_gorilla
  ATGGCCAGGTACAGATGCTGTCGCAGCCAGAGCCGCAGCAGATGTTACCGGCAGAGCCGGAGCAGGTGTTACCGGCAGAGACAAAGCCAGAGCCGGAGCAGATGCTACCGGCAGAGCCAAAGCCGGAGCAGGTGTTACCGGCAGAGACAAAGAAGTCGCAGACGTAGGCGGAGGAGCTGCCAGACACGGAGGAGAGCCATGAGGTGCTGCCGCCGCAGGTACAGACTGAGACGTAGAAGACCCTATCATATTGTATCT
  >Pan_troglodytes
  ATGGCCAGGTACAGATGCTGTCGCAGCCAGAGCCGGAGCAGATGTTACCGGCAGAGACGGAGCAGGTGTTACCGGCAAAGGCAAAGCCAAAGTCGGAGCAGATGTTACCGGCAGAGCCAGAGACGGAGCAGGTGTTACCGGCAAAGACAAAGAAGTCGCAGACGAAGGCGACGGAGCTGCCAGACACGGAGGAGAGCCATGAGGTGCTGCCGCCGCAGGTACAGACTGAGACGTAAAAGATGTTACCATATTGTATCT
""")
tree.workdir = "/path_to/my_working_directory/"
```

`binpath` は何も指定しないと `ete3` と同じPATHを探しにいって怒られる。
(`codeml` に `PATH` を通していても。)


## 共通

`tree.mark_tree(node_ids, marks)`
: branchモデルやbranch-siteモデルに使う系統樹のマーキングをする。
: `node_ids`、`marks` には、同じ長さのリストを渡す。
: (例) `tree.mark_tree([2,3], marks=["#1", "#2"])`

`tree.run_model(model_name)`
: `binpath` で指定した `codeml` でモデルを推定する。
: モデルの種類については [ete-evol]({{< ref ete-toolkit.md >}}) を参照。

`tree.get_evol_model(model_name)`
: 推定したモデルのパラメータなどが入った `Model` オブジェクトを返す。

`tree.get_most_likely(altn, null)`
: 対立仮説 vs 帰無仮説での尤度比検定のp-valueを返す。


## Site モデル

`M2` vs `M1` で正の自然選択が働いたサイトを検出:

```python
tree.run_model("M1")    # 帰無仮説
tree.run_model("M2")    # 対立仮説

m2 = tree.get_evol_model("M2")
pval = tree.get_most_likely("M2", "M1")

if pval < 0.05:
  for site in range(len(m2.sites["BEB"]["aa"])):
    if m2.sites["BEB"]["p2"][site] > 0.95:
      print("Positively selected site %s at position: %s, with probability: %s" % (model2.sites['BEB']['aa'][site], site+1, model2.sites['BEB']['p2'][site]))
else:
  print("Model M1 is not rejected.")
```

`model.sites["BEB"]` にはBEB法 (Bayes empirical Bayes法) により求められたサイトごとのパラメータが入っている。
`model.sites["BEB"]["p2"]` はそのサイトがω>1で正の選択下にある事後確率であり、
一般的にはこの事後確率が0.95や0.99を超えていた場合に正の選択が働いたサイトとする。


## Branch モデル

`tree.mark_tree()` が `node_id` でしか動かないのが少し不便。
tip名でうまく指定できるように関数を書く:

```python
def get_node_ids(tree, names: list[str]) -> list[int]:
  node_ids = [ leaf.node_id for leaf in tree if leaf.name in names ]
  return node_ids


def get_mrca_node_ids(tree, names: list[str]) -> list[int]:
  node_ids = [ get_node(tree, name) for name in names ]
  anc = tree.get_common_ancestor(node_ids)
  return [anc.node_id]
```

`Gorilla_gorilla` と `Pan_troglodytes` の共通祖先の枝を指定:

```python
node_ids = get_mrca_node_ids(tree, ["Gorilla_gorilla", "Pan_troglodytes"])
tree.mark_tree(node_ids, marks=['#1']*len(node_ids))
print(tree.write())
# ((Hylobates_lar,(Gorilla_gorilla,Pan_troglodytes) #1),Papio_cynocephalus);
```

`b_free` vs `M0` で特定の枝でωが異なるかを検定:

```python
tree.run_model("b_free")
tree.run_model("M0")

b_free = tree.get_evol_model("b_free")
pval = tree.get_most_likely("b_free", "M0")

def get_omega(tree, model):
  """
  b_freeからωを取得するのもちょっとメンドいので関数書いちゃう
  """
  mark2omega = {}
  result = tree.get_evol_model(model)
  for attr in result.branches.values():
    mark = attr.get('mark')
    omega = attr.get('w')
    mark2omega[mark] = omega
  return mark2omega

if pval < 0.05:
  wfgb = get_omega(tree, "b_free")[" #1"]
  wbgb = get_omega(tree, "b_free")[" #0"]
  print("Foreground branches evolving at omega value of %s significantly diferent from %s.' % (wfrg, wbkg)")
else:
  print("Model b_neut is not rejected.")
```

正の選択かどうか調べたければ `b_free` vs `b_neut` をやって `wfgb > 1` かどうかみる。


## Branch-site モデル

Branch モデルの時と同じ枝で、
`bsA` vs `bsA1` で正の選択が働いたサイトを検出:

```python
tree.run_model('bsA')
tree.run_model('bsA1')

pval = tree.get_most_likely('bsA', 'bsA1')
bsA = tree.get_evol_model('bsA')

if pval < 0.05:
  for site in range(len(bsA.sites["BEB"]["aa"])):
    if bsA.sites["BEB"]["p2"][site] > 0.95:
      print("Positively selected site %s at position: %s, with probability: %s" % (bsA.sites['BEB']['aa'][site], site+1, bsA.sites['BEB']['p2'][site]))
else:
  print("Model bsA1 is not rejected.")
```
