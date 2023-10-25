---
title: "Python 環境構築"
date: 2023-09-24T14:33:42+09:00
---

pythonを使うための環境構築に関するメモ。
基本的には[Python環境構築ガイド](https://www.python.jp/install/install.html)の写経。


## ガイドライン

### Pythonのインストール方針

- [Google Colab](https://colab.research.google.com/)で事足りない？
- Pythonの入手元として、公式版とAnaconda経由が存在。目的に応じて選択する。
- [Pyenvは必要？](https://www.python.jp/install/docs/doyouneedpyenv.html)(特に初学者向けには非推奨)

<div style="
   background-color:#f9f9ff ;
   border-radius: 8px;
   padding-inline: 1em;
   padding-block: 0.1em;
">

ℹ **Anaconda**

データサイエンスや科学技術計算のためのさまざまなツールやライブラリの実行環境。
パッケージ管理も仮想環境も全部担う。

</div>

### PythonとAnaconda

Pythonパッケージをどう利用するか。

1. `pip` を使って[The Python Package Index(PyPI)](https://pypi.org/)から取得する。
2. `conda` を使って[Anaconda](https://www.anaconda.com/)から取得する。

PyPIとAnacondaの併用は困難。
プログラミング入門の場合はPyPI、データサイエンス・科学技術計算にはAnaconda。

<!--
### 自分の方針

`pyenv` またはHomebrewでインストールしたPythonを使い、
プロジェクトごとに `venv` で仮想環境をつくってその中で
`pip` を使ってパッケージを管理する。

`pyenv` は使うけど複数バージョンの使い分けは基本しない。LinuxでOS標準のPython環境を汚さない目的で使う。
-->

## Pythonのインストール

### MacOS

[MacOS用のインストーラ](https://www.python.org/downloads/mac-osx/)か、[Homebrew](Homebrew)を使う。

```sh
# Homebrewによるpythonインストール
# Homebrewのインストールは割愛

berw install python3

# 複数バージョンのインストール
brew install python@3.7  # バージョンを指定してインストール
ln -s /usr/local/opt/python@3.7/bin/python3.7 /usr/local/bin/python3.7  # /usr/local/bin/にシンボリックリンク
```

### Ubuntu

```sh
sudo apt update
sudo apt install build-essential libbz2-dev libdb-dev \
  libreadline-dev libffi-dev libgdbm-dev liblzma-dev \
  libncursesw5-dev libsqlite3-dev libssl-dev \
  zlib1g-dev uuid-dev tk-dev
```

[ダウンロードページ](https://www.python.org/)からソースコードをダウンロードして解凍、ビルド:

```sh
tar xJf Python-3.x.y.tar.xz
cd Python-3.x.y
./configure
make
sudo make install
```

デフォルトでは `usr/local/bin` にインストールされる。

#### Ubuntuの `pip`

```sh
sudo apt install python3-pip
```

OS標準のPython環境のパッケージ管理は `pip` ではなく `apt` を介して行うのが安全。
`apt` との衝突を避けるためか、Ubuntu標準の `pip` は `sudo` なしで実行すると
`--user` つきで実行された扱いになってパッケージは `~/.local/` にインストールされる。

### `pyenv` によるインストール

`pyenv` は複数バージョンのPythonを切り替えながら利用するためのツール。
Python x.y.zのマイナーバージョンまで切り替えて使えるが、そこまで必要か？という説もある。

1. 必要に応じて[ビルド環境の用意](https://github.com/pyenv/pyenv/wiki#suggested-build-environment)

1. `pyenv` のインストール:

   ```sh
   git clone https://github.com/pyenv/pyenv.git ~/.pyenv
   # or
   brew install pyenv
   ```

1. 環境設定:

   `~/.bash_profile` など

   ```sh
   export PYENV_ROOT="$HOME/.pyenv"
   export PATH="$PYENV_ROOT/bin:$PATH"
   eval "$(pyenv init -)"
   ```

1. バージョンを探してインストール:

   ```sh
   pyenv install --list
   pyenv install 3.11.3
   ```

1. バージョンを切り替える:

   ```sh
   pyenv global 3.11.3  # システム全体で切り替え
   pyenv local 3.11.3   # 実行したディレクトリのみで切り替え
   ```


## `pip`

PyPIに公開されているPythonパッケージを扱うコマンド。
Python3.4以降、標準で搭載されている。

```sh
python3 -m pip install pillow
# pip3 install pillow
python3 -m pip uninstall pillow
```


## `venv`

プロジェクトごとに専用のPython実行環境を作成する。

1. プロジェクトを作成する:

   ```sh
   mkdir proj
   cd proj
   ```

1. 仮想環境を作成する:

   ```sh
   python3 -m venv .venv
   ```

1. 仮想環境へ切り替える:

   ```sh
   source .venv/bin/activate
   # or
   . .venv/bin/activate
   (.venv) $
   ```

   ターミナル先頭に `(.venv)` と表示され、仮想環境での実行状態になる。

   ```sh
   (.venv) $ deactivate  # 仮想環境の終了
   ```

1. パッケージのインストール:

   仮想環境中でインストールしたパッケージはその環境内でのみ使用できる。
   `requirements.txt` を使った環境のコピーも可能。

   ```sh
   python3 -m pip install pandas
   python3 -m pip freeze > requirements.txt     # パッケージ一覧を書き出し
   python3 -m pip install -r requirements.txt   # まとめてインストール
   ```

   仮想環境でのパッケージのインストール先は `.venv/lib/python3.11/site-packages/` になる。
   バイナリ実行ファイルは `.venv/bin/` にあり、`python3`, `pip` もここにPATHが通る。
