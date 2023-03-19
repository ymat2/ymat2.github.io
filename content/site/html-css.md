---
title: "最低限のHTML・CSS"
date: 2022-11-30T08:32:29+09:00
draft: true
---

HUGOはマークダウンでページを書くだけでHTMLのページが生成され、また豊富なテーマが整備されているのでHTML・CSSの知識がなくてもサイトを構築することができる。

そうは言っても、サイトをカスタマイズしたり、自分でテーマを作ったりすることを考えると、最低限のHTML・CSSの知識はあっても損はない。


## HTML
HTML(Hyper Text Markup Language)は、WEBページに表示される文字の役割を決める言語である。（対してCSS(Cascading Style Sheet)はその見た目を決める。）

マークダウンが`##`（見出し）や`**`（斜体）、`-`（リスト）など記号で文字の役割を定めるのに対して、HTMLでは **タグ(<></>)** を用いることで同じことをする。


### HUGOにおけるマークダウンとHTMLタグの対応
#### 見出し
```md
# 見出し1
## 見出し2
### 見出し3
#### 見出し4
##### 見出し5
###### 見出し6
```
```html
<h1>見出し1</h1>
<h2>見出し2</h2>
<h3>見出し3</h3>
<h4>見出し4</h4>
<h5>見出し5</h5>
<h6>見出し6</h6>
```

#### 段落・改行
```md
段落1
(空行)
段落2

hoge(スペース2つ)
fuga
```
```html
<p>段落1</p>
<p>段落2</p>

hoge<br>
fuga
```

#### 引用
```md
> 引用
>> 多重引用
```
```html
<blockquote>
	<p>引用</p>
	<blockquote>
		<p>多重引用</p>
	</blockquote>
</blockquote>
```

#### コード
````md
```
print hoge
```
````
```html
<pre><code>print hoge</code><pre>
```
＊シンタックスハイライトをつけたりするともう少し複雑になる。

#### インラインコード
```md
これは`print`です。
```
```html
これは<code>print</code>です。
```

#### 水平線
```md
***
---
___(アンダースコア)
```
```html
<hr>
<hr>
<hr>
```

#### 箇条書き
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
```html
<ul>
	<li>hoge
	<ul>
		<li>fuga
		<ul>
			<li>piyo</li>
		</ul>
		</li>
	</ul>
	</li>
</ul>

<ol>
	<li>hoge</li>
	<li>fuga
	<ol>
		<li>fuga1</li>
		<li>fuga2</li>
	</ol>
	</li>
	<li>piyo</li>
</ol>

<ul>
	<li><input disabled="" type="checkbox"> task1</li>
	<li><input checked="" disabled="" type="checkbox"> task2</li>
</ul>
```

#### リンク
```md
[Google](https://www.google.co.jp/)
```
```html
<a href="https://www.google.co.jp/">Google</a>
```

#### 強調・斜体・取り消し
```md
**hoge**

*hoge*

***hoge***

~~hoge~~
```
```html
<strong>hoge</strong>
<em>hoge</em>
<em><strong>hoge</strong></em>
<del>hoge</del>
````

#### 表
```md
| TH1 | TH2 |
----|---- 
| TD1 | TD3 |
| TD2 | TD4 |
```
```html
<table>
	<thead>
		<tr>
			<th>TH1</th>
			<th>TH2</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>TD1</td>
			<td>TD3</td>
		</tr>
		<tr>
			<td>TD2</td>
			<td>TD4</td>
		</tr>
	</tbody>
</table>
```


## CSS
CSS(Cascading Style Sheet)はHTMLで書いた文字の位置や色、大きさなど見た目を決める言語である。HUGOの場合、`static/`に自分で書いたものを置いたり、`themes/`内で書かれていたりする。

`*.css`として書いた外部ファイルをHTML内で`link`して参照する他、HTMLに直接書き込むことも可能。HUGOの場合`<link rel="stylesheet" href=*.css />`の形で参照することが多い。

