---
title: "オブジェクト指向とclass"
date: 2022-11-02T11:03:16+09:00
---

## これはなに？

`class` の使い方を、**オブジェクト指向**とは何か、から理解するためのノート。


## オブジェクト指向とは

**オブジェクト指向**とはプログラミングやソフトウェア開発における考え方の1つで、
データとその処理の仕方をひとまとまりのモノ（オブジェクト）として扱う方法をいう。

例えばRPGなどにおける「勇者」というオブジェクトには、
「HP」や「MP」といったデータ（**属性**という）と、
「攻撃する」や「回復する」といった処理（**メソッド**という）がひとまとまりとなっている。
同様に「魔法使い」や「魔王」などのオブジェクトにも属性とメソッドがあり、
これらオブジェクトを基準にプログラムを組み立てていく。


## Pythonにおけるオブジェクト指向プログラミング

Pythonにおいては、データ（**インスタンス**）と、
その処理の仕方（**メソッド**）をまとめて記述したもの（**オブジェクト**）を格納しておく雛形が **`class`** である。

RPGの勇者を例に、シンプルな `class` を定義していく。

この勇者には「`atk`: 攻撃力」と「`hp`: 体力」という属性があり、
「`powerup`: 攻撃力を上げる」と「`recover`: 回復する」
という処理があるものとする。

```python
# シンプルなclassの例
class RpgHero:

  atk = 50 # 攻撃力
  hp = 100   # 体力

  def powerup(self, i):
    self.atk = self.atk + i

  def recover(self, j):
    self.hp = self.hp + j


# 作成したクラスを使うためにインスタンス化:
yoshihiko = RpgHero()

# 最初の状態をprint:
print("ATK:", yoshihiko.atk)
print("HP:", yoshihiko.hp)
# >>> ATK: 50
# >>> HP: 100

# メソッドを呼び出す:
yoshihiko.powerup(10)   # 攻撃力を上げてみる
yoshihiko.recover(25)   # 体力も回復させてみる

# 再び確認:
print("ATK:", yoshihiko.atk)
print("HP:", yoshihiko.hp)
# >>> ATK: 60
# >>> HP: 125
```

## コンストラクタとは

クラスをインスタンス化した時に最初に呼ばれるメソッドを**コンストラクタ**とよぶ。
データの初期化をするものだと思えばいい。
class内で `__init__()` で定義する。

```python
class RpgHero:

  def __init__(self):
    self.atk = 50   # 攻撃力
    self.hp = 100   # 体力

  def powerup(self, i):
    self.atk = self.atk + i

  def recover(self, j):
    self.hp = self.hp + j


yoshihiko = RpgHero()

print("ATK:", yoshihiko.atk)
print("HP:", yoshihiko.hp)
# >>> ATK: 50
# >>> HP: 100
```

インスタンス化のときに値を渡すことでより柔軟にclassを利用できる:

```python
class RpgHero:

  def __init__(self, atk = 0, hp = 0):  # デフォルト値を持たせておくこともできる
    self.atk = atk   # 攻撃力
    self.hp = hp     # 体力

  def powerup(self, i):
    self.atk = self.atk + i

  def recover(self, j):
    self.hp = self.hp + j


yoshihiko = RpgHero(atk = 50, hp = 100)
dai = RpgHero(hp = 110)   # daiはHPだけ与えてみる

print("ATK:", yoshihiko.atk)
print("HP:", yoshihiko.hp)
# >>> ATK: 50
# >>> HP: 100

print("ATK:", dai.atk)
print("HP:", dai.hp)
# >>> ATK: 0
# >>> HP: 110
```


## クラスの継承

一般的な場合の処理を記述したクラスを引き継いで、より特殊な場合のデータと処理を記述することを**クラスの継承**という。

例えば勇者がレベルアップした「マスター」というオブジェクトがあるとする。
このマスターには、もともと勇者が持っていた属性と処理に加えて、
「`mp`: 魔法力」という属性と「`enhance`: 魔法力の分だけ攻撃力を上げる」という処理が加わるとする。

継承先のクラス内では、`super()`を使うことで継承元のメソッドを呼び出すことができる。

```python
class RpgHero:

  def __init__(self):
    self.atk = 50   # 攻撃力
    self.hp = 100   # 体力

  def powerup(self, i):
    self.atk = self.atk + i

  def recover(self, j):
    self.hp = self.hp + j

# 「勇者」クラスを継承する「マスター」のクラス
class RpgMaster(RpgHero):

  def __init__(self, atk=0, hp=0, mp = 0):
    super().__init__(atk, hp)
    self.mp = mp

  def enhance(self):
    super().powerup(self.mp)


yoshihiko = RpgMaster(atk = 50, hp = 100, mp = 20)
yoshihiko.enhance()

print("ATK:", yoshihiko.atk)
# >>> ATK: 70
```
