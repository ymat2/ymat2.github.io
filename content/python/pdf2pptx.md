---
title: "pdf2pptx"
subtitle: "PDFからPowerPointスライドへの簡易変換"
date: 2022-11-02T11:03:16+09:00
---

https://pypi.org/project/pdf2pptx/

## PDFをパワーポイントに変換
PDFをページごとにパワーポイントのスライドに貼り付けて使いたい、という単純な操作が、既存の方法だとページごとにスクショして貼る、という原始的な方法くらいしかなかった。

pdf2pptxは`pdf2pptx input`という単純なコマンドでPDFの各ページをPNGイメージとしてパワポに貼り付けてくれる。


## インストール
```bash
pip install pdf2pptx
```

ただし生のpipは非推奨なので自分の場合は
```bash
python3 -m pip install pdf2pptx
```
で入れた。


## Usage
```bash
pdf2pptx hoge.pdf
```
出力ファイルを指定しない場合、拡張子のみ変わった`hoge.pptx`が生成される。


## Option
```bash
pdf2pptx --help
```

`-o`, `--output`
:	出力ファイルの指定

`-r`, `--resolution`
:	1inchあたりのドット数で解像度を指定。デフォルトは300だが150とかでも十分可読でファイルサイズも抑えられる。

`-q`, `--quiet`
:	ログの非表示

`--from`
:	PDFの何ページ目からパワポに変換するか。

`--count`
:	PDFの何ページ分パワポに変換するか。
