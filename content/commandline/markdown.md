---
title: "Markdownチートシート"
date: 2022-11-02T11:03:16+09:00
---

いちいち調べるのも億劫なので自分でまとめる。HTMLにした際の挙動はどのパーサーを使うかによって微妙に異なる。HUGOの場合は[Goldmark](https://gohugo.io/getting-started/configuration-markup/#goldmark)。
一応たまに参照する記事も貼っておく:
- https://qiita.com/Qiita/items/c686397e4a0f4f11683d
- https://gist.github.com/mignonstyle/083c9e1651d7734f84c99b8cf49d57fa

## 見出し
```md
# 見出し1
## 見出し2
### 見出し3
#### 見出し4
##### 見出し5
###### 見出し6
```

# 見出し1
## 見出し2
### 見出し3
#### 見出し4
##### 見出し5
###### 見出し6

## 段落と改行
```md
### 空行を挟むと段落
段落1
(空行)
段落2

### スペースを二つ挟むと改行
hoge(スペース×2)
fuga
```

段落1

段落2 

hoge  
fuga

## 引用
```md
> 引用
>> 多重引用
```

> 引用
>> 多重引用

## コード
````md
```python
print 'hoge'
```
````

```python
print 'hoge'
```

[シンタックスハイライト](https://blog.katsubemakito.net/articles/github-markdown-syntaxhighlighting)

## インラインコード
```md
標準出力を`print`でおこなう。
```

標準出力を`print`でおこなう。

## 水平線
```md
***
---
___(アンダースコア)
```

***
---
___

## 箇条書き
```md
- hoge
	+ fuga
		* piyo

1. hoge
1. fuga
	1. fuga1
	1. fuga2
1. piyo

- [ ] task1
- [x] task2
```

- hoge
    + fuga
        * piyo

1. hoge
1. fuga
    1. fuga1
	1. fuga2
1. piyo

- [ ] task1
- [x] task2

## 定義リスト
```md
用語
:	説明文１
:	説明文２
```

用語
:	説明文１
:	説明文２

## リンク
```md
### ハイパーリンク
[Google](https://www.google.co.jp/)

### 外部参照
[Googleを見る][Google]
(空行)
[Google]: http://www.yahoo.co.jp
```

[Google](https://www.google.co.jp/)

[Googleを見る][Google]

[Google]: http://www.yahoo.co.jp

## 強調、斜体、打消し線
```md
### Bold
**hoge**
__fuga__

### Italic
*hoge*
_fuga_

### Italic&Bold
***hoge***
___fuga___

### StrikeThrough
~~hoge~~
```

**hoge**
__fuga__

*hoge*
_fuga_

***hoge***
___fuga___

~~hoge~~

## 表
```md
| TH1 | TH2 |
----|---- 
| TD1 | TD3 |
| TD2 | TD4 |
```

| TH1 | TH2 |
----|---- 
| TD1 | TD3 |
| TD2 | TD4 |

```md
| 左揃え | 中央揃え | 右揃え |
|:---|:---:|---:|
|1 |2 |3 |
|4 |5 |6 |
```

| 左揃え | 中央揃え | 右揃え |
|:---|:---:|---:|
|1 |2 |3 |
|4 |5 |6 |

## 便利なHTMLタグ
### キーボード表示
```HTML
<kbd>Ctrl</kbd>+<kbd>C</kbd>
```

<kbd>Ctrl</kbd>+<kbd>C</kbd>

### 詳細折りたたみ要素
```HTML
<details>
    <summary>タイトルは表示される</summary>
内容は隠される
</details>
```

<details>
    <summary>タイトルは表示される</summary>
内容は隠される
</details>
