---
title: "遺伝研スパコン"
date: 2022-11-02T11:03:16+09:00
---

https://sc.ddbj.nig.ac.jp/

## バッチジョブ
CPU コアを 1 コアだけ使用するプログラムを少数実行する場合に用いる。
```Shell
## ジョブスクリプトを投げる
qsub test.sh

## コマンドライン引数として投げる
qsub -S /bun/bash -cwd "echo 'hoge' > test.txt"
```

- コマンドライン引数。ジョブスクリプト内で`#$`につづけて渡すこともできる。
    - `-cwd`<br>: バッチジョブをカレントディレクトリ上で実行する。デフォルトは`$HOME`
    - `-V`<br>: `qsub`を実行した際の環境変数を全てバッチジョブ(を実行する計算ノード）に引き継ぐ。
    - `-l short`<br>: キューの指定。今のところ64GB以上なら`medium`程度の認識。
    - `-l d_rt=00:10:00`,`s_rt=00:10:00`<br>: バッチジョブの実行上限時間。デフォルトは`72:00:00`(=3日間)
    - `-l s_vmem=4G`,`-l mem_req=4G`<br>: 使用するメモリ量の指定。
    - `-N an_example`<br>: ジョブ名の指定。
    - `-S /bin/bash`<br>: インタープリタの指定。
	- `-o`,`-e`<br>: 標準出力/標準エラーファイルの出力先。デフォルトはカレントディレクトリ。

## アレイジョブ、パラレルジョブ
CPUコアを複数もちいるジョブ。順次多数実行していくのがアレイジョブ。同時に少数実行するのがパラレルジョブくらいの認識。

### アレイジョブの書き方
```Shell
#$ -S /bin/bash
#$ -t 1-6:1
#$ -tc 3
#$ -cwd 
seq_ids=(SRR030253 SRR030254 SRR030255 SRR030256 SRR030257 SRR030258)
seq_id=${seq_ids[$SGE_TASK_ID-1]}

mv ${seq_id}.hoge ${seq_id}.fuga
```

- アレイジョブ、パラレルジョブ関連の引数
	- `-pe def_slot 8`<br>: スレッド数の指定。中で動くプログラムの指定と合わせる。
		```Shell
		# 例
		#$ -S /bin/bash
		#$ -pe def_slot 5
		#$ -cwd

		orthofinder -f ./fasta/ -t 5 -a 5
		```
	- `-t 1-N`<br>: N個のタスクを持つアレイジョブとして投入する。
	- `-tc M`<br>: 一度に実行されるアレイジョブのタスク数の上限を指定。これをやらないとユーザーに割り振られた計算機数をオーバーしてしまうことがある
		- `qquota`でリソースを確認できる。2022/9/28時点で300。

### メモリ指定
- 64GB未満のジョブ：Thinノードで実行可
	```Shell
	qsub -l s_vmem=32G -l mem_req=32G test.sh 
	```
- 64GB以上、2000GB未満のジョブ：Mediumノードを指定する。
	```Shell
	qsub -l medium -l s_vmem=128G -l mem_req=128G test.sh 
	```

- パラレルジョブの総メモリはスロット数と`-l`で指定した数字の掛け算になる。
	```Shell
	# 総メモリ数は4×32GB=128GB
	qsub -pe def_slot 4 -l medium -l s_vmem=32G -l mem_req=32G test.sh 
	```

## Singularity
バイオインフォマティクスでよく使われる解析ツールがバージョン別に`/usr/local/biotools/`に配置されており、インストール不要で使うことができる。
```sh
## どんなツールが使えるか見てみる。たとえばblast。
## biotools/の、各ツールの頭文字ディレクトリを参照。
ls /usr/local/biotools/b/blast*
```

### 使用例
```
singularity exec /usr/local/biotools/b/blast:2.6.0--boost1.60_0 blastp -h
```


## Misc.
### Pythonの外部ライブラリをインストールする場合
遺伝研で外部ライブラリを利用するには、
```sh
python3 -m pip install --user ライブラリ名
```
とすることでユーザのホームにライブラリをインストールできる。（が、再現性の観点では`venv`で仮想環境を構築する方がいい、らしい。）
