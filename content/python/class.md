---
title: "PythonのClassを理解したい！"
date: 2022-11-02T11:03:16+09:00
---

いまだにクラスのありがたさを実感できていない。オブジェクト指向言語であるPythonにおいて、データ（**インスタンス**）と、その処理の仕方（**メソッド**）をまとめて記述したもの（**オブジェクト**）を格納しておく雛形が**クラス**というもの。らしい。

```python
# シンプルなclassの例
class SimpleData:

  a = 0
  b = 0

  def sum(self):
    return self.a + self.b
  
  def set(self, a, b):
    self.a = a
    self.b = b

# 作成したクラスを使うためにインスタンス化
data1 = SimpleData()
data2 = SimpleData()

# メソッドを呼び出す
data1.set(3, 4)
print(data1.sum())  >>> 7

data2.set(2.5, 8.3)
print(data2.sum())  >>> 10.8
```

## コンストラクタとは
クラスをインスタンス化した時に最初に呼ばれるメソッドを**コンストラクタ**とよぶ。データの初期化をするものだと思えばいい。

```python
class SimpleData:

  def __init__(self):
    self.a = 0
    self.b = 0

  def sum(self):
    return self.a + self.b
  
  def set(self, a, b):
    self.a = a
    self.b = b

data3 = SimpleData()
print(data3.sum())  >>> 0
```

~~コンストラクタは複数作ることができ、引数を与えることもできる。~~ どうも嘘松っぽい。1つのクラスが持てるコンストラクタは1つだけ。

```python
class SimpleData:

  def __init__(self):
    self.a = 0
    self.b = 0
  
  def __init__(self,a,b):
    self.a = a
    self.b = b

  def sum(self):
    return self.a + self.b
  
  def set(self, a, b):
    self.a = a
    self.b = b

data4 = SimpleData(4, 5)
print(data4.sum())  >>> 9

data5 = SimpleData(3)
print(data5.sum())  # 引数が足りないと怒られる

data5_1 = SimpleData()
print(data5_1.sum())  # 引数の数で自動判別もしない
```

渡す引数の数に応じて`__init__()`したければ、デフォルト値を持たせておくのが賢い方法らしい。

```python
class SimpleData:

  def __init__(self,a=0,b=0):
    self.a = a
    self.b = b

  def sum(self):
    return self.a + self.b
  
  def set(self, a, b):
    self.a = a
    self.b = b

data4 = SimpleData(4, 5)
print(data4.sum())  >>> 9

data5 = SimpleData(3)
print(data5.sum())  >>> 3

data5_1 = SimpleData()
print(data5_1.sum())  >>> 0
```


## クラスの継承
一般的な場合の処理を記述したクラスを引き継いで、より特殊な場合のデータと処理を記述することを**クラスの継承**という。

継承先のクラス内では、`super()`を使うことで継承元のメソッドを呼び出すことができる。

```python # a,bの2変数に対する一般的なclass
class SimpleData:
  
  def __init__(self,a,b):
    self.a = a
    self.b = b

  def sum(self):
    return self.a + self.b
  
  def set(self, a, b):
    self.a = a
    self.b = b

# 不変項cを付加したより特殊な場合に用いるclass
class ComplexData(SimpleData):
  
  def __init__(self, a=0, b=0):
    super().__init__(a, b)
    self.c = 1
  
  def sum(self):
    return super().sum() + self.c
    # return self.a + self.b + self.c
  
data6 = ComplexData(3, 5)
print(data6.sum())  >>> 9
```
