---
title: "Colors"
subtitle: "色使いの基本"
date: 2023-07-01T23:12:14+09:00
draft: true
---

- WEB色見本: https://www.colordic.org/
- COLORBREWER: https://colorbrewer2.org/


## 配色の基本

- 原色など彩度の高い色は避ける。

- 色の持つ意味から逸脱する使い方をしない。
  (「<span style="color: #4169e1;">危険</span>」、
  「<span style="color:  #ffd700;">暗い</span>」など)

- 使用する色の数は4色程度に抑える。
  (
    白背景+
    基本文字<span style="color: #444;">■</span>+
    メイン<span style="color: #0072B2;">■</span>+
    強調<span style="color: #E69F00;">■</span>
    など
  )

- 避けるべき背景色と文字色の組み合わせ
  - コントラストが弱い
    (
      <span style="color: #000;background-color: #0000cd;"> 濃い青に黒 </span>,
      <span style="color: #fff;background-color: #98fb98;"> 薄い緑に白 </span>
      など
    )

  - 彩度が高い文字色に同程度の明度の背景色
    (<span style="color: #ff0000;background-color: #808080;"> 灰色に赤 </span> など)

引用元: [伝わるデザイン - 配色](https://tsutawarudesign.com/miyasuku5.html)


## どの色の組み合わせを使うか

基本に沿っていれば好きな色を使うと良い。
多数の色を使う場合、色分けされる対象のもつ意味や見えやすさを考慮して、
既に考えられているパレットを使うのが安全。

### Sequential

連続値データの色分けに適している。

#### viridis:

<table>
  <thead>
    <tr class="header">
      <th style="text-align: left;">#FDE725</th>
      <th style="text-align: left;">#7AD151</th>
      <th style="text-align: left;">#22A844</th>
      <th style="text-align: left;">#2A788E</th>
      <th style="text-align: left;">#414487</th>
      <th style="text-align: left;">#440154</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="background-color: #FDE725;"></td>
      <td style="background-color: #7AD151;"></td>
      <td style="background-color: #22A844;"></td>
      <td style="background-color: #2A788E;"></td>
      <td style="background-color: #414487;"></td>
      <td style="background-color: #440154;"></td>
    </tr>
  </tbody>
</table>

#### plasma:

<table>
  <thead>
    <tr class="header">
      <th style="text-align: left;">#0D0887</th>
      <th style="text-align: left;">#6A00A8</th>
      <th style="text-align: left;">#B12A90</th>
      <th style="text-align: left;">#E16462</th>
      <th style="text-align: left;">#FCA634</th>
      <th style="text-align: left;">#F0F921</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="background-color: #0D0887;"></td>
      <td style="background-color: #6A00A8;"></td>
      <td style="background-color: #B12A90;"></td>
      <td style="background-color: #E16462;"></td>
      <td style="background-color: #FCA634;"></td>
      <td style="background-color: #F0F921;"></td>
    </tr>
  </tbody>
</table>

### Diverging

連続値データの色分けに適している。
特に、気温など0を基点に正負両側に値を取るデータに適する。

#### BrBG:

<table>
  <thead>
    <tr class="header">
      <th style="text-align: left;">#8C510A</th>
      <th style="text-align: left;">#D8B365</th>
      <th style="text-align: left;">#F6E8C3</th>
      <th style="text-align: left;">#F5F5F5</th>
      <th style="text-align: left;">#C7EAE5</th>
      <th style="text-align: left;">#5AB4AC</th>
      <th style="text-align: left;">#01665E</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="background-color: #8C510A;"></td>
      <td style="background-color: #D8B365;"></td>
      <td style="background-color: #F6E8C3;"></td>
      <td style="background-color: #F5F5F5;"></td>
      <td style="background-color: #C7EAE5;"></td>
      <td style="background-color: #5AB4AC;"></td>
      <td style="background-color: #01665E;"></td>
    </tr>
  </tbody>
</table>


#### RdYlBu:

<table>
  <thead>
    <tr class="header">
      <th style="text-align: left;">#D73027</th>
      <th style="text-align: left;">#FC8D59</th>
      <th style="text-align: left;">#FEE090</th>
      <th style="text-align: left;">#FFFFBF</th>
      <th style="text-align: left;">#E0F3F8</th>
      <th style="text-align: left;">#91BFDB</th>
      <th style="text-align: left;">#4575B4</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="background-color: #D73027;"></td>
      <td style="background-color: #FC8D59;"></td>
      <td style="background-color: #FEE090;"></td>
      <td style="background-color: #FFFFBF;"></td>
      <td style="background-color: #E0F3F8;"></td>
      <td style="background-color: #91BFDB;"></td>
      <td style="background-color: #4575B4;"></td>
    </tr>
  </tbody>
</table>

### Qualitative

カテゴリカルなデータの色分けに適している。

#### Okabe_Ito:

<table>
  <thead>
    <tr class="header">
      <th style="text-align: left;">#000000</th>
      <th style="text-align: left;">#E69F00</th>
      <th style="text-align: left;">#56B4E9</th>
      <th style="text-align: left;">#009E73</th>
      <th style="text-align: left;">#F0E442</th>
      <th style="text-align: left;">#0072B2</th>
      <th style="text-align: left;">#D55E00</th>
      <th style="text-align: left;">#CC79A7</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="background-color: #000000;"></td>
      <td style="background-color: #E69F00;"></td>
      <td style="background-color: #56B4E9;"></td>
      <td style="background-color: #009E73;"></td>
      <td style="background-color: #F0E442;"></td>
      <td style="background-color: #0072B2;"></td>
      <td style="background-color: #D55E00;"></td>
      <td style="background-color: #CC79A7;"></td>
    </tr>
  </tbody>
</table>

#### Tol_bright:

<table>
  <thead>
    <tr class="header">
      <th style="text-align: left;">#EE6677</th>
      <th style="text-align: left;">#228833</th>
      <th style="text-align: left;">#4477AA</th>
      <th style="text-align: left;">#CCBB44</th>
      <th style="text-align: left;">#66CCEE</th>
      <th style="text-align: left;">#AA3377</th>
      <th style="text-align: left;">#BBBBBB</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="background-color: #EE6677;"></td>
      <td style="background-color: #228833;"></td>
      <td style="background-color: #4477AA;"></td>
      <td style="background-color: #CCBB44;"></td>
      <td style="background-color: #66CCEE;"></td>
      <td style="background-color: #AA3377;"></td>
      <td style="background-color: #BBBBBB;"></td>
    </tr>
  </tbody>
</table>


## 余談: 東京メトロ線カラー

東京メトロ線のカラーコード。
2015年頃にカラーユニバーサルデザインに変更された。
わずかな違いでも人によって見えやすさが大きく異なることがわかる好例。

変更前:
<table>
  <thead>
    <tr class="header">
      <th style="text-align: left;">#FF9500</th>
      <th style="text-align: left;">#F62E36</th>
      <th style="text-align: left;">#B5B5AC</th>
      <th style="text-align: left;">#009BBF</th>
      <th style="text-align: left;">#00BB85</th>
      <th style="text-align: left;">#C1A470</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="background-color: #FF9500;"></td>
      <td style="background-color: #F62E36;"></td>
      <td style="background-color: #B5B5AC;"></td>
      <td style="background-color: #009BBF;"></td>
      <td style="background-color: #00BB85;"></td>
      <td style="background-color: #C1A470;"></td>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td style="background-color: ;">銀座線</td>
      <td style="background-color: ;">丸の内線</td>
      <td style="background-color: ;">日比谷線</td>
      <td style="background-color: ;">東西線</td>
      <td style="background-color: ;">千代田線</td>
      <td style="background-color: ;">有楽町線</td>
    </tr>
  </tbody>
</table>
<br>
<table>
  <thead>
    <tr class="header">
      <th style="text-align: left;">#8F76D6</th>
      <th style="text-align: left;">#00AC9B</th>
      <th style="text-align: left;">#9C5E31</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="background-color: #8F76D6;"></td>
      <td style="background-color: #00AC9B;"></td>
      <td style="background-color: #9C5E31;"></td>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td style="background-color: ;">半蔵門線</td>
      <td style="background-color: ;">南北線</td>
      <td style="background-color: ;">副都心線</td>
    </tr>
  </tbody>
</table>

変更後:
<table>
  <thead>
    <tr class="header">
      <th style="text-align: left;">#F39700</th>
      <th style="text-align: left;">#E60012</th>
      <th style="text-align: left;">#9CAEB7</th>
      <th style="text-align: left;">#00A7DB</th>
      <th style="text-align: left;">#009944</th>
      <th style="text-align: left;">#D7C447</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="background-color: #F39700;"></td>
      <td style="background-color: #E60012;"></td>
      <td style="background-color: #9CAEB7;"></td>
      <td style="background-color: #00A7DB;"></td>
      <td style="background-color: #009944;"></td>
      <td style="background-color: #D7C447;"></td>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td style="background-color: ;">銀座線</td>
      <td style="background-color: ;">丸の内線</td>
      <td style="background-color: ;">日比谷線</td>
      <td style="background-color: ;">東西線</td>
      <td style="background-color: ;">千代田線</td>
      <td style="background-color: ;">有楽町線</td>
    </tr>
  </tbody>
</table>
<br>
<table>
  <thead>
    <tr class="header">
      <th style="text-align: left;">#9B7CB6</th>
      <th style="text-align: left;">#00ADA9</th>
      <th style="text-align: left;">#BB641D</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="background-color: #9B7CB6;"></td>
      <td style="background-color: #00ADA9;"></td>
      <td style="background-color: #BB641D;"></td>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td style="background-color: ;">半蔵門線</td>
      <td style="background-color: ;">南北線</td>
      <td style="background-color: ;">副都心線</td>
    </tr>
  </tbody>
</table>


<!--
<table>
  <thead>
    <tr class="header">
      <th style="text-align: left;"></th>
      <th style="text-align: left;"></th>
      <th style="text-align: left;"></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="background-color: ;"></td>
      <td style="background-color: ;"></td>
      <td style="background-color: ;"></td>
    </tr>
  </tbody>
</table>
-->
