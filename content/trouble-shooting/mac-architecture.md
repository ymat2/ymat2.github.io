---
title: "M1 macではhomebrewでhisat2が入らない"
date: 2022-11-02T11:03:16+09:00
---

## アーキテクチャの違いが原因でコンパイル周りでつまづく
macのプロセッサがIntelからM1になって以降、CPUアーキテクチャがx86_64からarm64に替わったらしく、おそらくこれが原因でhomebrewの挙動が異なるらしい。
- x86_64ではデフォルトのインストール先が/usr/local/であるのに対し、arm64では/opt/homebrew/
- arm64ではhomebrewインストール後に/opt/homebrew/bin/brewにPATHを通す必要がある。
- x86_64とarm64のどちらかでしかインストールできないツールがあり、hisat2やTrinityはarm64のhomebrewでは入らない。

```bash
g++-12: error: unrecognized command-line option '-msse2'
make: *** [hisat2-build-s] Error 1
make: *** Waiting for unfinished jobs....
g++-12: error: unrecognized command-line option '-msse2'
make: *** [hisat2-build-l] Error 1
g++-12: error: unrecognized command-line option '-msse2'
make: *** [hisat2-align-s] Error 1
make: *** wait: No child processes. Stop.
```

M1macでも`Rosetta`とよばれるアーキテクチャ変換技術を使うことでx86_64のターミナルを使用できる。

参考にした記事を読む限り状況に応じてIntel(x86_64)のターミナルとARM(arm64)のターミナルを切り替えて使うのがスマートらしい。
<br>: https://qiita.com/funatsufumiya/items/cec08f1ba3387edc2eed
<br>: https://zenn.dev/_lambda314/articles/63b851221a7016

```bash
uname -m　　#CPUアーキテクチャを確認

#arm64の場合、ターミナルを右クリック→「情報を見る」→「Rosettaを使用して開く」にチェックを入れる

uname -m　　#ターミナルを再起動してCPUアーキテクチャがx86_64になっているか確認
```

こうするとhisat2やTrinityがちゃんと入る方のhomebrewをインストールできるようになる。
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```


## せっかくbrewで入れてもライブラリの参照周りでコケて動かない
- インストール自体は`brew`で入るが、hisat2のコマンドを叩くとライブラリの参照がうまくいっていないのかエラーが出る。
- 追記：後日iqtreeでも同様のエラーを観測したので、おそらくbiosci系のツールはこの問題にあたる可能性がある。

```bash
dyld[25473]: Symbol not found: (__ZNKSt7__cxx1112basic_stringIcSt11char_traitsIcESaIcEE13find_first_ofERKS4_m)
	Referenced from: '/usr/local/Cellar/hisat2/2.2.1/bin/hisat2-build-s'
	Expected in: '/usr/lib/libstdc++.6.dylib'
zsh: abort   hisat2-build -h
```

Finderでlibstdc++.6.0.9.dylibを消すことで解決することがある([1], [2])らしいが、自分の環境ではうまくいかなかったのと、環境ファイルをいじる怖さがある...

[1]: http://qa.lifesciencedb.jp/questions/885/hisat2%E3%81%8Cerror
[2]: https://researchmap.jp/blogs/blog_entries/view/97940/c906f1defa5760d532f4bf2aedabee28?frame_id=797498


## それなら直接落としてきたほうがいい
Hisat2の[ダウンロードページ](http://daehwankimlab.github.io/hisat2/download/)からバイナリ版をダウンロードして、PATHを通すことで解決。

macOS 12.3 Monterey以降のOSでは、完全にPyhton3に移行してしまい[古いPythonは使えなくなっている](https://applech2.com/archives/20220309-apple-removed-python-from-macos-123-monterey.html)のでhisat2のソースコードをpython3で動くように書き換える必要があった。
<br>: https://www.biostars.org/p/9494176/#9494665

```bash
which python3 #python3のパスを確認 >>>/usr/bin/python3
```

~~適当なエディタで`hisat2-<version>/hisat2-build`と`hisat2-<version>/hisat2-inspect`（他にも必要かもしれない..）のシェバン行を編集~~
- [ ] ~~`#!/usr/bin/env python` # となっているのを~~
- [x] ~~`#!/usr/bin/python3` # と書き換える~~

このやり方はよろしくない。pyenvとかvenvで使えるpythonを用意してあげるのがいい？

これで晴れてHisat2が使えるようになった。
