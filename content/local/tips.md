---
title: "Tips - いつかまとめるかも"
date: 2023-01-29T16:58:44+09:00
draft: true
---

## `awk`で列の集計
例えば下の`sample.tab`みたいなファイルの2行目を合計したかったら、
```sh
awk '{s += $2} END {print s}' < sample.tab
```

例：sample.tab
|A|B|C|
|:---:|:---:|:---:|
|1|2|3|
|2|4|6|
|1|2|1|

