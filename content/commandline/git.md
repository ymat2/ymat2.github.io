---
title: "Git"
date: 2022-11-02T11:03:16+09:00
---

<img height="20" width="20" src="https://cdn.simpleicons.org/git" style="vertical-align: text-bottom;"> https://git-scm.com/

<img height="20" width="20" src="https://cdn.simpleicons.org/github" style="vertical-align: text-bottom;"> https://github.co.jp/


## 基本操作

- [Git 基本操作① — GitとGitHubを使い始める](https://ymat2.github.io/slides/git-circle/git-vol1.html)
- [Git 基本操作② — `fetch`, `merge`, `pull`](https://ymat2.github.io/slides/git-circle/git-vol2.html)

### 新しいリポジトリの作成

1. Githubのサイト右上の"+"ボタンから"New repository"を選択し、Create repositoryする。

1. 手元のPCにローカルリポジトリをつくる。

	```sh
	mkdir new_repository
	cd new_repository
	git init
	```

1. ファイルを `add` して `commit` してもいいし、空の `commit` をしてもいい。

	```sh
	### ファイルをつくってadd&commit
	echo "Hello, Github" > README.md
	git add README.md
	git commit -m "Initial commit"

	### 空のコミット
	git commit --allow-empty -m ":coffee: Create repository"
	```

2. リモートリポジトリを紐づけて `push`

	```sh
	git remote -v		# 何も表示されない
	git remote add origin https://github.com/*username*/*new_repository*.git	# HTTPの場合
	# git remote add origin git@github.com:*username*/*new_repository*.git		# SSHの場合
	git remote -v		# リモートリポジトリが表示されることを確認
	git branch -M main
	git push -u origin main
	```

	Privateリポジトリの場合、SSHで紐付けしないと下り( `fetch`, `pull` )のときもパスワードを要求される。


### 手元の変更をリモートリポジトリに反映

<div class="note">

**基本**: "`git add` → `git commit` → `git push`"

</div>

1. 手元でファイルをいじって変更を確認。

	```sh
	echo "Hello, Github" > README.md
	git status	# README.mdが`Changes not staged for commit:`に表示される。
	```

1. 変更したファイルをインデックスに登録。

	```sh
	git add README.md
	git status	# README.mdが`Changes to be committed:`に表示される。
	```

1. 変更をコミット。

	```sh
	git commit -m "modified hoge.txt"
	git status	# `nothing to commit, working tree clean`となる。
	git log			# コミットが表示される。
	```

1. リモートリポジトリへ `push` 。

	```sh
	git push
	```

### リモートリポジトリの変更を手元に反映

<div class="note">

**基本**: "`git fetch` → `git merge`" もしくは "`git pull`"

</div>

- リモートブランチの状態を手元のファイルまで一気に反映。

	```sh
	git pull
	```

- リモートブランチの変更を一度ローカルのアップストリームブランチに反映させてから手元のファイルに反映。

	```sh
	git fetch
	git log --all
	git merge
	```


## `.gitignore`

https://docs.github.com/ja/get-started/getting-started-with-git/ignoring-files

- リポジトリのルートディレクトリに `.gitignore` を配置して、git管理から除外するファイルを制御する。

	```sh
	### 場所を問わず特定のファイル・ディレクトリを除外
	hoge

	### .gitignoreが置かれたリポジトリの特定のファイル・ディレクトリを除外
	/hoge

	### 場所を問わず特定のディレクトリの除外
	dir/

	### .gitignoreが置かれたリポジトリの特定のディレクトリを除外
	/dir/

	### 特定のファイル・ディレクトリのみ追跡
	*
	!hoge

	### ワイルドカードの使用
	/*.py
	/*.Rproj
	```

- `~/.config/git/ignore` でグローバルに除外対象を設定。

	```sh
	.DS_Store
	```

- すでに追跡しているファイルを除外するにはトラッキングを外す。

	```sh
	git rm --cached <FILE_NAME>
	```


## SSH接続

https://docs.github.com/ja/authentication/connecting-to-github-with-ssh/about-ssh

手順:
- [SSHキーを生成する。]({{< ref "ssh.md" >}})
- [githubに公開キーを登録する。](https://docs.github.com/ja/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)
- `ssh -T git@github.com` で接続確認。

### `ssh -T` の際に `permission denied` となる場合

https://docs.github.com/ja/authentication/troubleshooting-ssh/using-ssh-over-the-https-port

`ssh-keygen` の際にファイル名を変更していると認証がうまくいかない。`~/.ssh/config` に以下を追記して解決。

```ini
Host github github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_rsa_git	# github用の秘密鍵
```

## `git submodule`

外部のリポジトリを自分のリポジトリのサブディレクトリとして取り込む仕組み。

```sh
git submodule add https://github.com/<username>/<repository>.git <directory>
```

### submoduleを最新版に更新する

```sh
git submodule foreach git pull
git add <submodule>
git commit -m "updated submodule"
# git push
```

### サブモジュールを含むリポジトリをcloneするとき

普通に `clone` してくるとサブモジュールの中身は空になっている。
`clone` する際に、

```sh
git clone --recurse-sebmodules <repository>
```

としてサブモジュールの中身ごと落としてくるか、親リポジトリをクローンしたあと、

```sh
git submodule update --init
```

してサブモジュールの中身を取得する。


## そのほかのコマンド

- 直前の操作を修正:

	```sh
	### 直前のミスコミットを修正
	git commit --amend -m "hogehoge"

	### commitの取り消し
	git reset --soft HEAD^

	### addの取り消し
	git restore --staged file_name
	```

- すでにリポジトリに登録されたファイルを削除:

	```sh
	git rm --cached *file*
	```

- ファイル名を変更:

	```sh
	git mv file file_renamed
	```

- `git stash`

  `git merge` や `git pull` の際、コミットするほどでもない手元の変更を一時的に退避するために使う。

	working directoryとstaging areaの変更を退避する:

	```sh
	git stash -u		# -u: Untrackedなファイルも含める
	```

	退避した変更を確認:

	```sh
	git stash list
	# stash@{0}: WIP on main: d426bc4 Fix a bug
	```

	`git merge` や `git pull` でリモートの変更を手元に反映した後、
	退避していた変更を戻す:

	```sh
	git stash apply stash@{0} --index
	```

	`--index` オプションなしだと、もともとステージングされていた変更も `add` 前の扱いで戻ってくる。

	退避していた変更を消す:

	```sh
	git stash drop stash@{0}	# 退避内容を指定して削除
	git stash pop stash@{0}		# 退避内容を指定してブランチに戻すとともに削除
	git stash clear						# 退避内容を全て削除
	```

- リポジトリ名を変更:

	-	リモート側の操作： リポジトリのページ > "Setting" > "Rename" から変更

	- 手元の操作：ローカルリポジトリの名前と `.git/config` を書き換える

		```sh
		mv repository_name_before repository_name_after
		sed -i -e 's/repository_name_before/repository_name_after/g' .git/config
		```
