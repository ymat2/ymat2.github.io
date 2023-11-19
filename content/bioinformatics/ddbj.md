---
title: "遺伝研スパコン"
date: 2022-11-02T11:03:16+09:00
---

https://sc.ddbj.nig.ac.jp/


## バッチジョブ

CPU コアを 1 コアだけ使用するプログラムを少数実行する場合に用いる。

```sh
## ジョブスクリプトを投げる
qsub test.sh

## コマンドライン引数として投げる
qsub -S /bun/bash -cwd "echo 'hoge' > test.txt"
```

オプションはコマンドライン引数でも、ジョブスクリプト内で `#$` につづけて渡すこともできる。

`-cwd`
:	バッチジョブをカレントディレクトリ上で実行する。デフォルトは `$HOME`

`-V`
:	`qsub` を実行した際の環境変数を全てバッチジョブ(を実行する計算ノード)に引き継ぐ。

`-l short`
:	キューの指定。今のところ64GB以上なら `medium` 程度の認識。

`-l d_rt=00:10:00`, `s_rt=00:10:00`
:	バッチジョブの実行上限時間。デフォルトは `72:00:00` (=3日間)

`-l s_vmem=4G`, `-l mem_req=4G`
:	使用するメモリ量の指定。

`-N an_example`
:	ジョブ名の指定。

`-S /bin/bash`
:	インタープリタの指定。

`-o`, `-e`
:	標準出力/標準エラーファイルの出力先。デフォルトはカレントディレクトリ。


## アレイジョブ、パラレルジョブ

CPUコアを複数もちいるジョブ。
順次多数実行していくのがアレイジョブ。
同時に少数実行するのがパラレルジョブくらいの認識。

### アレイジョブの書き方

```sh
#$ -S /bin/bash
#$ -t 1-6:1
#$ -tc 3
#$ -cwd
seq_ids=(SRR030253 SRR030254 SRR030255 SRR030256 SRR030257 SRR030258)
seq_id=${seq_ids[$SGE_TASK_ID-1]}

mv ${seq_id}.hoge ${seq_id}.fuga
```

### アレイジョブ、パラレルジョブ関連の引数

`-pe def_slot 8`
:	スレッド数の指定。中で動くプログラムの指定と合わせる。

	```sh
	# 例
	#$ -S /bin/bash
	#$ -pe def_slot 5
	#$ -cwd

	orthofinder -f ./fasta/ -t 5 -a 5
	```

`-t 1-N`
:	N個のタスクを持つアレイジョブとして投入する。

`-tc M`
:	一度に実行されるアレイジョブのタスク数の上限を指定。
	これをやらないとユーザーに割り振られた計算機数をオーバーしてしまうことがある
:	`qquota` でリソースを確認できる。2022/9/28時点で300。

### メモリ指定

- 64GB未満のジョブ：Thinノードで実行可

	```sh
	qsub -l s_vmem=32G -l mem_req=32G test.sh
	```

- 64GB以上、2000GB未満のジョブ：Mediumノードを指定する。

	```sh
	qsub -l medium -l s_vmem=128G -l mem_req=128G test.sh
	```

- パラレルジョブの総メモリはスロット数と`-l`で指定した数字の掛け算になる。
	```bash
	# 総メモリ数は4×32GB=128GB
	qsub -pe def_slot 4 -l medium -l s_vmem=32G -l mem_req=32G test.sh
	```


## Apptainer (Singularity)

https://sc.ddbj.nig.ac.jp/software/Apptainer

バイオインフォマティクスでよく使われる解析ツールがバージョン別に
`/usr/local/biotools/` に配置されており、インストール不要で使うことができる。

```sh
## どんなツールが使えるか見てみる。たとえばblast。
## biotools/の、各ツールの頭文字ディレクトリを参照。
ls /usr/local/biotools/b/blast*
```

### 使用例

```sh
singularity exec /usr/local/biotools/b/blast:2.6.0--boost1.60_0 blastp -h
```


## パッケージ管理

### `guix`

ユーザー権限で利用できるパッケージマネージャで、最初から使えるようになっている。

- [GNU Guix Reference Manual](https://guix.gnu.org/manual/en/html_node/index.html) (公式マニュアル)
- [遺伝研での使い方ページ](https://sc.ddbj.nig.ac.jp/software/guix)

前準備:

`~/.bashrc`に以下を追記:

```sh
export GUIX_DAEMON_SOCKET=guix://at111
export GUIX_PROFILE="$HOME/.guix-profile"
source "$GUIX_PROFILE/etc/profile"
```

`guix search`, `guix package --search`
:	利用可能なパッケージの検索。標準出力だと見切れるので `less` に渡す。
:	(例) `guix search paml | less`

`guix install`, `guix package --install`
:	パッケージのインストール
:	上記のように設定した場合のデフォルトのインストールパスは
  `$HOME/.guix-profile/bin/` になる。

`guix pull`
:	`guix` 本体を最新版に更新する。

`guix update`, `guix package --update`
:	インストールしたパッケージを最新版に更新する。
	正規表現でパッケージを指定可。

`guic remove`, `guix package --remove`
:	パッケージのアンインストール

バイオインフォマティクス関連のパッケージ:

- https://github.com/genenetwork/guix-bioinformatics
- https://guix.gnu.org/en/blog/2018/paper-on-reproducible-bioinformatics-pipelines-with-guix/
