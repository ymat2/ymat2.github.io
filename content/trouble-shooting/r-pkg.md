---
title: "brew updateとRパッケージの問題に今日こそ対処する"
date: 2022-11-14T13:21:15+09:00
---

## 状況
おそらくCask版Rが使うパッケージはバージョン依存のPATHに入っていて（"/Library/Frameworks/R.framework/Versions/4.2/Resources/library"）、`brew upgrade`をかけるたびにそのバージョンに紐づいたパッケージごと消えてしまうせいで毎回パッケージのインストールが必要になる。

### `brew update`
Cask版のRもそうじゃない方もoutdated。
```sh
==> Outdated Formulae
augustus             cmake                harfbuzz             libidn2              little-cms2          openssl@1.1          readline
bowtie2              fontconfig           hugo                 libomp               mpfr                 python@3.9           tbb
ca-certificates      git                  libffi               libxext              openjdk              r
==> Outdated Casks
r
```

### `brew upgrade`
途中で「パッケージ消すからパスワード教えて」みたいなこと聞かれてパッケージ消してるな...
```sh
Running `brew update --auto-update`...
==> Upgrading 20 outdated packages:

r 4.2.1_4 -> 4.2.2

==> Pouring r--4.2.2.monterey.bottle.tar.gz
==> r cask is installed, skipping link.		：Cask版があるからリンクをスキップするよ
🍺  /usr/local/Cellar/r/4.2.2: 2,282 files, 66.5MB
==> Running `brew cleanup r`...				：Running `brew cleanup r`
Removing: /usr/local/Cellar/r/4.2.1_4... (6,743 files, 195.2MB)		：パッケージのPATH的に関係ない気もする
Removing: /Users/yukimatsuda/Library/Caches/Homebrew/r--4.2.1_4... (50MB)

==> Casks with 'auto_updates true' or 'version :latest' will not be upgraded; pass `--greedy` to upgrade them.
==> Upgrading 1 outdated package:	：今あるCASKのRはOUTDATEDだよ
r 4.2.1 -> 4.2.2
==> Upgrading r		：アップグレードするよ
==> Caveats
Cask r installs files under /usr/local. The presence of such
files can cause warnings when running `brew doctor`, which is considered
to be a bug in Homebrew Cask.
	
==> Downloading https://cloud.r-project.org/bin/macosx/base/R-4.2.2.pkg
######################################################################## 100.0%
==> Uninstalling packages; your password may be necessary:	：パッケージここでアンストされてね？
org.r-project.x86_64.texinfo
Password:
org.r-project.x86_64.tcltk
org.R-project.R.GUI.pkg
org.R-project.R.fw.pkg
==> Removing files:
/Library/Frameworks/R.Framework
/usr/bin/R
/usr/bin/Rscript
==> Running installer for r; your password may be necessary.
Package installers may write to any location; options such as `--appdir` are ignored.
installer: Package name is R 4.2.2 for macOS
installer: Installing at base path /
installer: The install was successful.
==> Purging files for version 4.2.1 of Cask r
🍺  r was successfully upgraded!

==> r
Cask r installs files under /usr/local. The presence of such
files can cause warnings when running `brew doctor`, which is considered
to be a bug in Homebrew Cask.
```

### `brew cleanup`
```
Removing: /Users/yukimatsuda/Library/Caches/Homebrew/Cask/r--4.2.1.pkg... (89.7MB)
```

### `.libPaths()`
```r
>>> [1] "/Library/Frameworks/R.framework/Versions/4.2/Resources/library"
```

## 解決策
悪さしがちな`brew install`の方のRを消した上で、`~/.Renviron`の設定でパッケージのインストール先をHomebrewに消されないところに変える。

ちなみに、
> CRAN公式ビルドの場合でも、3→4のメジャーバージョンアップとか、4.1 → 4.2といったマイナーバージョンアップのときにはライブラリが一新される。4.2.1→4.2.2のパッチバージョンではそのまま引き継がれる。
らしい。

### `brew install`版のRを消す
- `brew uninstall`を実行。
```sh
$ brew uninstall r
Warning: Treating r as a formula. For the cask, use homebrew/cask/r
Uninstalling /usr/local/Cellar/r/4.2.2... (2,282 files, 66.5MB)

Warning: The following may be r configuration files and have not been removed!
If desired, remove them manually with `rm -rf`:
  /usr/local/etc/ca-certificates
  /usr/local/etc/openmpi-mca-params.conf
  /usr/local/etc/pmix-mca-params.conf
  /usr/local/etc/wgetrc
```

- コンフィグファイルの類を消す。
```sh
rm -rf /usr/local/etc/ca-certificates
rm -rf /usr/local/etc/openmpi-mca-params.conf
rm -rf /usr/local/etc/pmix-mca-params.conf
rm -rf /usr/local/etc/wgetrc
```

### `.Renviron`の設定
- ホームに`.Renviron`を作成。
```sh
touch ~/.Renviron
```

- パッケージのインストール先を指定。
```
R_USER=${HOME}
R_LIBS_USER=${R_USER}/.R/library/%v
```

- インストール先を用意。
```sh
mkdir ~/.r/library
mkdir ~/.r/library/4.2
```

- インストール先の確認。
```r
> .libPaths()
[1] "/Users/yukimatsuda/.r/library/4.2"                             
[2] "/Library/Frameworks/R.framework/Versions/4.2/Resources/library"
```
	
### パッケージのインストール
```r
> install.packages("tidyverse")
 パッケージを ‘/Users/yukimatsuda/.r/library/4.2’ 中にインストールします 
 (‘lib’ が指定されていないため) 
 (後略)
```

```sh
# ちゃんと入ってそう
$ ls ~/.r/library/4.2 
DBI		bslib		dbplyr		gargle		httr		mime		rappdirs	scales		tzdb
R6		cachem		digest		generics	ids		modelr		readr		selectr		utf8
RColorBrewer	callr		dplyr		ggplot2		isoband		munsell		readxl		stringi		uuid
askpass		cellranger	dtplyr		glue		jquerylib	openssl		rematch		stringr		vctrs
assertthat	cli		ellipsis	googledrive	jsonlite	pillar		rematch2	sys		viridisLite
backports	clipr		evaluate	googlesheets4	knitr		pkgconfig	reprex		tibble		vroom
base64enc	colorspace	fansi		gtable		labeling	prettyunits	rlang		tidyr		withr
bit		cpp11		farver		haven		lifecycle	processx	rmarkdown	tidyselect	xfun
bit64		crayon		fastmap		highr		lubridate	progress	rstudioapi	tidyverse	xml2
blob		curl		forcats		hms		magrittr	ps		rvest		timechange	yaml
broom		data.table	fs		htmltools	memoise		purrr		sass		tinytex
```
