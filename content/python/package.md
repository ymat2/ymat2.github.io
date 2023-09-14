---
title: "Package作成"
subtitle: "初めて作ったときの備忘録"
date: 2023-09-12T18:18:12+09:00
draft: true
---

参考
- https://heavywatal.github.io/python/packaging.html
- https://docs.python.org/3/tutorial/modules.html
- https://docs.python.org/3/reference/import.html
- https://packaging.python.org/
- https://chayarokurokuro.hatenablog.com/entry/2021/01/24/081215
- https://github.com/kfuku52/csubst


`setuptools` に依存する `setup.py` は現在は非推奨らしい。
`pyproject.toml` で一元管理する方法が主流で、[Poetry](https://python-poetry.org/) など
パッケージ作成をラクに行えるツールがあるっぽい。


でも使い方いまいちわかんないし、依存ライブラリのない簡単な構造のうちはそんな変わらんだろうと踏んで
`setup.py` で作ってみる。


## ひとまず `setup.py` で書いてみる

ファイル構成:

```
mython/
├── LICENSE
├── README.md
├── setup.py
├── mython/
│   ├── __init__.py
│   └── mython
└── tests/
```

`__init__.py` はひとまず空にしておいて、
`mython/mython` と `setup.py` をそれぞれ書く。

`mython/mython`:

```pyhton
#! /usr/bin/env python3

import argparse

def main():
  parser = argparse.ArgumentParser()
  parser.add_argument("-t", "--to")
  args = parser.parse_args()

  say_hello(args.to)


def say_hello(str):
  print("Hello,", str, "!")


if __name__ == "__main__":
  main()
```

`setup.py`:

```python
from setuptools import setup

setup(
  name = "mython",
  version = "0.1.0",
  python_requires = ">=3.6",
  scripts = ["mython/mython",]
)
```


これで最低限の雛形ができたはずなので、
ディレクトリを移動して `pip` でインストール:

```sh
pip3 install -e ~/work/mython/
# Defaulting to user installation because normal site-packages is not writeable
# Obtaining file:///home/yukimatsu/work/mython
#   Preparing metadata (setup.py) ... done
# Installing collected packages: mython
#   Running setup.py develop for mython
# Successfully installed mython-0.1.0
```

`pip3 list` で確認するとちゃんと入ってる。

いざ動かしてみる:

```sh
mython -t world
# Hello, world !
```

ちゃんと動いてる。感動。


### Subpackageの追加とGitHubから `pip3` で入れるテスト

Subpackageを追加してみる。
https://docs.python.org/3/tutorial/modules.html を参考に、ちゃんと書かないとうまく動かない。

ファイル構成を変更:

```
mython/
├── LICENSE
├── README.md
├── setup.py
├── mython/
│   ├── __init__.py
│   ├── mython
│   └── util/
│       ├── __init__.py
│       ├── bye.py
│       └── hello.py
└── tests/
```

`util/__init__.py`
: `from mython.util import *` のような形で非明示的に全部読み込むには、
  どのスクリプトを含めるかをちゃんと書いておかないといけない。
: ```python
  __all__ = ["hello", "bye"]
  ```

`mython/mython` に追記:

```python
from mython.util import *
```

で、これを `github` にアップロードして開発で使ってないマシンにインストールしてみる:

```sh
pip3 install git+https://github.com/ymat2/mython
# Defaulting to user installation because normal site-packages is not writeable
# Collecting git+https://github.com/ymat2/mython
#   Cloning https://github.com/ymat2/mython to /private/var/folders/fv/v04jv6qj0s706gpx_1xmtb6h0000gn/T/pip-req-build-wybszzlv
#   Running command git clone --filter=blob:none --quiet https://github.com/ymat2/mython /private/var/folders/fv/v04jv6qj0s706gpx_1xmtb6h0000gn/T/pip-req-build-wybszzlv
#   Resolved https://github.com/ymat2/mython to commit 768582b5d3b1beeb907c7069ad9e1262ceff8e8a
#   Preparing metadata (setup.py) ... done
# Building wheels for collected packages: mython
#   Building wheel for mython (setup.py) ... done
#   Created wheel for mython: filename=mython-0.1.0-py3-none-any.whl size=2184 sha256=e027f1c56c0875027c675bae7ed8e6e930d5eda94ba56a3c89c8ab7a44d5c9cd
#   Stored in directory: /private/var/folders/fv/v04jv6qj0s706gpx_1xmtb6h0000gn/T/pip-ephem-wheel-cache-h9514znu/wheels/ff/f8/78/b8c23ba02469077c837d9d6e6265973e5322a7fae67b897fdf
# Successfully built mython
# Installing collected packages: mython
# Successfully installed mython-0.1.0
```

入った。Pathも通ってる。でも動かしてみると `ModukeNotFound` となる:

```sh
mython -t world
# Traceback (most recent call last):
#   File "/Users/yukimatsuda/Library/Python/3.9/bin/mython", line 4, in <module>
#     from mython.util import *
# ModuleNotFoundError: No module named 'mython'

which mython
# /Users/yukimatsuda/Library/Python/3.9/bin/mython
```

どうもPythonまたは `pip` のバージョンの問題だったよう。
Pathの通った `python3` 越しに `pip` を使うとうまくいった。

```sh
python3 -m pip install git+https://github.com/ymat2/mython
```

これはパッケージ以前の問題っぽいな。
