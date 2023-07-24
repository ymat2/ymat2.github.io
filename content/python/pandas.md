---
title: "Pandas"
subtitle: "データ解析支援ライブラリ"
date: 2022-11-02T11:03:16+09:00
---

```python
import pandas as pd
```


## 基本操作

```python
df = pd.read_csv("PATH_TO_FILE", sep = ',')	# 表データの読み込み
df.head(n)	# 先頭n行
df.tail(n)	# 末尾n行
```

要約統計:

```python
df.mean()
df.sum()
df.max()
df.min()
df.std()			# 不偏標準偏差
df.describe()	# 列ごとのcount,mean,std,min,25%,50%,75%,max
df.corr()			# 列同士の相関係数
df.shape			# (行数, 列数)
df.size				# 行数×列数
df.T					# 転地
```

行・列の抽出:

```python
df[['species']]		# DataFrame with 1 column
df['species']			# Series
df.species				# Series (not recommended)
# label-based
df.loc[0]
df.loc[:,'sepal_width']
# integer-based
df.iloc[0]
df.iloc[:,1]
```

DataFrame・Seriesの操作:

```python
df.sort_values('species',ascending=True)	# 行の並べ替え。デフォルトは降順。
df['species'].drop_duplicates()						# カテゴリカルデータの重複を取り除く。
df['species'].value_counts()							# 値ごとの数を数える。
```

## データ内容の処理

### 欠損値

欠損値の有無を調べる:

```python
df.isnull()					# 欠損値をTrueとするdataframeを返す
df.isnull().sum()		# 列ごとに欠損値の数をカウント
```

欠損値を含む行を削除:

```python
df.dropna(inplace=False)
```

## 小技集

### 任意の2列から辞書を作る

```python
df = pd.DataFrame({"en": ["cat", "dog", "monkey"], "ja" : ["猫", "犬", "サル"]})
print(df)
#        en  ja
# 0     cat   猫
# 1     dog   犬
# 2  monkey  サル

en2ja = dict(zip(df["en"], df["ja"]))
# {'cat': '猫', 'dog': '犬', 'monkey': 'サル'}
```
