---
title: "homebrewでRを入れ直したときにパッケージの再インストールが必要な問題"
date: 2022-11-02T11:03:16+09:00
---

`brew upgrade`や`brew doctor`からのトラブルシューティングでRをいじったときにパッケージのインストールをやり直さなきゃいけない問題に何度か直面していたけど、今日ついにインストールすらできなくなったのでやったことの備忘録を残しておく。

## 状況
1. `brew doctor`でrがunlinkだとWarningが出たので、`/usr/bin/R`と`/usr/bin/Rstudio`を`rm`して`brew link r`した。
1. Rstudioをしてパッケージを読み込もうとしたら無いと怒られたので、`install.packages()`したらエラーが出た。
	```r
	# 流れてしまったけどたしかコンパイルできない系の怒られだった記憶がある
	```

## 試したこと
1. Caskじゃない`brew install r`で入れたRを使っているのが原因と踏んで、
	```bash
	$ brew reinstall --cask r rstudio
	==> Caveats
	Cask r installs files under /usr/local. The presence of such
	files can cause warnings when running `brew doctor`, which is considered
	to be a bug in Homebrew Cask.
	
	==> Downloading https://cloud.r-project.org/bin/macosx/base/R-4.2.1.pkg
	Already downloaded: /Users/yukimatsuda/Library/Caches/Homebrew/downloads/8d1f21aad50ce25534d706c2c7885528048ce7207abf6357ec4440955cb9f83b--R-4.2.1.pkg
	==> Uninstalling Cask r
	==> Uninstalling packages; your password may be necessary:
	org.r-project.x86_64.texinfo
	Password:
	org.r-project.x86_64.tcltk
	org.R-project.R.GUI.pkg
	org.R-project.R.fw.pkg
	==> Removing files:
	/Library/Frameworks/R.Framework
	/usr/bin/R
	/usr/bin/Rscript
	==> Purging files for version 4.2.1 of Cask r
	==> Installing Cask r
	==> Running installer for r; your password may be necessary.
	Package installers may write to any location; options such as `--appdir` are ignored.
	installer: Package name is R 4.2.1 for macOS
	installer: Installing at base path /
	installer: The install was successful.
	🍺  r was successfully installed!
	==> Caveats
	rstudio depends on R. The R Project provides official binaries:
	
	  brew install --cask r
	
	Alternatively, the Homebrew-compiled version of R omits the GUI app:
	
	  brew install r
	
	==> Downloading https://download1.rstudio.org/desktop/macos/RStudio-2022.07.2-576.dmg
	Already downloaded: /Users/yukimatsuda/Library/Caches/Homebrew/downloads/fceceabc195e09ba1c8dbbfe275255c32b077f60b0267e1ad6c12798164ead19--RStudio-2022.07.2-576.dmg
	==> Uninstalling Cask rstudio
	==> Backing App 'RStudio.app' up to '/usr/local/Caskroom/rstudio/2022.07.2,576/RStudio.app'
	==> Removing App '/Applications/RStudio.app'
	==> Purging files for version 2022.07.2,576 of Cask rstudio
	==> Installing Cask rstudio
	==> Moving App 'RStudio.app' to '/Applications/RStudio.app'
	🍺  rstudio was successfully installed!
	==> Caveats
	==> r
	Cask r installs files under /usr/local. The presence of such
	files can cause warnings when running `brew doctor`, which is considered
	to be a bug in Homebrew Cask.
	==> rstudio
	rstudio depends on R. The R Project provides official binaries:
	
	  brew install --cask r
	
	Alternatively, the Homebrew-compiled version of R omits the GUI app:
	
	  brew install r
	
	```

1. Rstudioを再起動→`install.packages()`
1. するとうまくインストールできた。たまにバイナリ版かソースからコンパイルか聞かれるので迷わずバイナリ版。


1. 読んでみると↓なる怪しい記述がある。
	```bash
	Cask r installs files under /usr/local. The presence of such
    files can cause warnings when running `brew doctor`, which is considered
    to be a bug in Homebrew Cask.
	```

1. 試しに`brew doctor`すると、さっき`brew doctor`したときとほぼ同じものが出てきた。ただし、期待していたRのunlinkは出てこなかった（？）
1. そこでもう一度、消せと言われたファイルを消してRパッケージをインストールしてみる。が、何もおこらない。
1. `.libPath()`してみると、トラブった時とパッケージのインストール先が違う。
	```bash
	### トラブった時
	/usr/local/Cellar/r/4.2.1_4/lib/R/library

	### いま
	/Library/Frameworks/R.framework/Versions/4.2/Resources/library　# どこ？->ルートディレクトリ。cdで行く二つ上。
	```
1. 結局`brew upgrade`したときにCask版Rのバージョンが変わったり、ふつうの方のRになったりすることが原因？よくわからないまま。
1. rのunlinkは切れたままにするのがいいのでは。

まとめ
:	homebrewでR入れる時はCaskから。
