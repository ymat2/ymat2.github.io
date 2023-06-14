---
title: "Subprocess"
subtitle: "pythonからコマンドラインの実行"
date: 2023-02-14T20:55:18+09:00
draft: true
---

https://docs.python.org/ja/3/library/subprocess.html

## 基本
例えば`ls -l`というコマンドを実行する場合、以下のようなスクリプトを書く。

```python
import subprocess
subprocess.run(['ls', '-l'])
```

## 注意
- `run()`関数が実装されたのは`Python3.5`以降。それ以前のバージョンでは`pip install subprocess.run`でインストールして使う。
- 実行スクリプトを`subprocess.py`にしているとエラーになる。
