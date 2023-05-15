---
title: "CSUBST"
date: 2023-05-14T17:53:14+09:00
draft: true
---

系統樹上の複数の独立した枝における収斂的なアミノ酸置換を検出する。

- https://github.com/kfuku52/csubst
- [Fukushima and Pollock (2023)](https://www.nature.com/articles/s41559-022-01932-7)

## Installation
`csubst`を実行するうえでIQ-TREEが必要。IQ-TREEのインストールは[ここ](http://www.iqtree.org/doc/Quickstart#installation)を参照。

```bash
# pipを使ってインストール。必要に応じてPATHを通す。
python3 -m pip install numpy cython # NumPy and Cython should be available upon csubst installation
python3 -m pip install git+https://github.com/kfuku52/csubst
```

## Quick start
付属のテストデータを使って動かしてみる。

```bash
# テストデータを生成。
csubst dataset --name PGK

# csubst analyzeを実行。
csubst analyze \
  --alignment_file alignment.fa \
  --rooted_tree_file tree.nwk \
  --foreground foreground.txt
```

IQ-TREEはversion`2.0.0`より新しいものが求められる。自分でバイナリ版を落として来たりして実行コマンドが`iqtree2`になっている場合、`--iqtree_exe`オプションで指定する。

```bash
csubst analyze \
  --alignment_file alignment.fa \
  --rooted_tree_file tree.nwk \
  --foreground foreground.txt \
  --iqtree_exe iqtree2
```
