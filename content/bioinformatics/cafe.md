---
title: "CAFE - Computational Analysis of gene Family evolution"
date: 2022-11-02T11:03:16+09:00
---

遺伝子ファミリーサイズの進化（系統樹上のどのノードで、いくつ遺伝子が増減したか）を、MCMC法で推定するプログラム。

基本的な動かし方は、入力となるシェルスクリプトを書いてCAFEに渡す、という形になる。このシェルスクリプトを書く過程で、OrthoFinderの出力であるOrthogroups.GeneCount.tsvと種の系統樹（Species_Tree/SpeciesTree_rooted.txt）が必要。

### インストール
- 作者たちのgithubから[最新版のCAFEをダウンロード](https://github.com/hahnlab/CAFE/releases/latest)して、適当なディレクトリに置く。（例えば`~/bin/`）
- 解凍したらCAFEディレクトリまで`cd`して`configure`＆`make`。
	```sh
	~/bin/CAFE$ ./configure
	~/bin/CAFE$ make
	```
- PATHを通して動作確認。
	```
	~/$ cafe  # ctrl+C
	```

### こんな感じのシェルスクリプトを書く
```sh
#! cafe 
# version 
# date 
load -i data/example.tab -t 10 -l logfile.txt -p 0.05 
tree (((chimp:6,human:6):81,(mouse:17,rat:17):70):6,dog:93) 
lambda -s -t (((1,1)1,(2,2)2)2,2) 
report resultfile
```

- `load`<br>: 基本的なオプション。
	- `-i`<br>: 種/遺伝子ファミリーごとの遺伝子数のテーブル。
	- `-t`<br>: スレッド数。使っているコンピュータに合わせて。
	- `-l`<br>: ログファイルの名前。
	- `-p`<br>: 遺伝子数の増減が急速であるとする有意水準。
	- `-filter`<br>: 全種の共通祖先における遺伝子数が0であると推定される遺伝子ファミリーを除くオプション。これをつける場合はload行より上にtree行を書く。
- `tree`<br>: rootから各種までの距離が同じである（ultrametricな）系統樹。
- `lambda`<br>: 単位時間あたりの遺伝子数の増減速度λの設定。
	- `-l`<br>: λを指定する場合。
	- `-s`<br>: λを自動推定する場合。
	- `-t`<br>: λ構造。系統樹上の遺伝子増減速度が同じだと考えられる枝を同じ数字にする。全枝で同じだと仮定する場合すべて1にする。系統樹の枝長の部分を書き換えればいい。
- `report`<br>: 出力ファイルの名前。

### インプットとなるテーブル(example.tab)を用意する
OrthoFinderの出力であるOrthogroups.GeneCount.tsvなどを基に、CAFEの入力ファイルとして加工する。基本的には、
- Description列、ID列を作る。
- 全種の遺伝子数が同じである遺伝子ファミリーを除く。
- 1種の遺伝子数が100を超える遺伝子ファミリーを除く。
を満たしていればどう作ってもいい。

|Description|ID|Chicken|Lizard|Mouse|
|:---|:---|---:|---:|---:|
|OG00001|OG00001|12|14|21|
|OG00002|OG00002|9|13|5|
|OG00003|OG00003|7|0|4|

めんどくさい場合は下記のスクリプトを使ってもいい。
``` python
準備中...
```

```
python3 make_cafe_input.py Orthogroups.GeneCount.tsv Cafe_input.tsv
```

### ultrametricな系統樹を用意する
[TimeTree](http://www.timetree.org/)などから取得すると楽。OrthoFinderの出力系統樹を使う場合、遺伝的距離に基づく系統樹であるため、ultrametricに加工する必要がある。Rのapeなどを使うと便利。

``` R
tree = read.tree("tree.txt")
mrca = getMRCA(tree, tip=c('spA', 'spB')) #分岐年代推定に使うノードの指定
tree2 = chronopl(tree,
                 100000,
                 age.min = 36, #推定分岐年代の最小値(MYA)
                 age.max = 46, #推定分岐年代の最大値(MYA)
                 node = mrca, #getMRCAで指定したノード
                 S = 1,
                 tol = 1e-20,
                 CV = FALSE,
                 eval.max = 500,
                 iter.max = 500) 
is.ultrametric(tree2) #ultrametricかどうか確認
write.tree(tree2, file = "tree_ultrametric.nwk") #ultrametric系統樹の保存

# spAとspBが3.6~4.6億年前に分岐したという情報から全体の分岐年代を推定する。
```

**注意点**
- tipは遺伝子数のテーブルの列名に合わせる。
- bootstrapなどの余計な要素は消しておく。
- 枝長は少数でも構わないが、1以上のできるだけ小さい枝長になるように約分する。（大きすぎるとエラーになるっぽい。）

### CAFEを実行する
シェルスクリプトが用意できたら、次のコマンドでCAFEを実行する。

```sh
cafe example.sh
```

### 出力ファイルを加工する
CAFEの実行に成功すると、reportで指定した名前の.repファイルが出てくる。このままだと見づらいため、公式のスクリプトを使って加工する。

1. https://github.com/hahnlab/cafe_tutorial に行き、コードをダウンロード→解凍する。（緑色の<kbd>Code▼</kbd>から。）reportファイルのあるディレクトリに置いておくと便利。

2. 次のコマンドでreportファイルを加工する。4つのファイルが出力される。

```sh
python cafe_tutrial/python_scripts/cafetutorial_report_analysis.py -i resultfile.rep -o cafe_summary
```

- `-i`<br>: cafe本体の出力ファイル。
- `-o`<br>: 加工して生成されるファイル（4つ）の名前。
    - cafe\_summary_fams.txt
    - cafe\_summary_anc.txt
    - cafe\_summary_pub.txt
    - cafe\_summary_node.txt

### トラブルシューティング
- `Failed to load tree from provided string (branch length missing)`<br>系統樹の枝長に0が含まれているとダメ。自分は該当するノードを除外した。
- `No species ‘anolis_carolinensis’ was found in the tree`<br>系統樹を読み込む際に内部でtip nameを書き換えているようで、長すぎる種名やアンダースコアが原因と思われるエラー。tip nameを短く書き換える。（`AnoCal`とか）
- `Lambda values were not set. Please set lambda values with the lambda or lambdamu command.`<br>λを自動推定する際に、系統樹の枝長がでかい数字だとこうなるっぽい。できるだけ短くなるように約分する。
