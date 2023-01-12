---
title: "Pandas - データ解析支援ライブラリ"
date: 2022-11-02T11:03:16+09:00
---

```Python
import pandas as pd
```

## 基本操作
```Python
df = pd.read_csv("PATH_TO_FILE", sep = ',')	# 表データの読み込み
df.head(n)	# 先頭n行
df.tail(n)	# 末尾n行
```

- 要約統計
	```Python
	df.mean()
	df.sum()
	df.max()
	df.min()
	df.std()	# 不偏標準偏差
	df.describe()	# 列ごとのcount,mean,std,min,25%,50%,75%,max
	df.corr()	# 列同士の相関係数
	df.shape	# (行数, 列数)
	df.size	# 行数×列数
	df.T	# 転地
	```

- 行・列の抽出
	```Python
	df[['species']]	# DataFrame with 1 column
	df['species']	# Series
	df.species	# Series (not recommended)
	
	# label-based
	df.loc[0]
	df.loc[:,'sepal_width']
	
	# integer-based
	df.iloc[0]
	df.iloc[:,1]
	```

- DataFrame・Seriesの操作
	```Python
	df.sort_values('species',ascending=True)	# 行の並べ替え。デフォルトは降順。
	df['species'].drop_duplicates()	# カテゴリカルデータの重複を取り除く。
	df['species'].value_counts()	# 値ごとの数を数える。	
	```

## データ内容の処理
### 欠損値
- 欠損値の有無を調べる:
	```Python
	df.isnull()	# 欠損値をTrueとするdataframeを返す
	df.isnull().sum()	# 列ごとに欠損値の数をカウント
	```

- 欠損値を含む行を削除:
	```Python
	df.dropna(inplace=False)
	```
