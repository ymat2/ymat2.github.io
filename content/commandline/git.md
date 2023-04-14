---
title: "Git"
date: 2022-11-02T11:03:16+09:00
---

## 基本操作
### 新しいリポジトリの作成
1. Githubのサイト右上の`+`ボタンからNew repositoryを選択し、Create repositoryする。
1. 手元のPCに同名のリモートリポジトリをつくる。
	```bash
	mkdir *new_repository*
	cd *new_repository*
	git init
	```
1. ファイルを`add`して`commit`してもいいし、空の`commit`をしてもいい。
	```bash
	### すでにあるファイルをadd&commit
	git add *some_file*
	git commit -m "some files added"

	### 空のコミット
	git commit --allow-empty -m ":coffee: Create repository"
	```
1. リモートリポジトリを紐づけて`push`
	```bash
	git remote -v	# 何も表示されない
	git remote add origin https://github.com/*username*/*new_repository*.git	# HTTPの場合
	# git remote add origin git@github.com:*username*/*new_repository*.git	# SSHの場合
	git remote -v	# なんか出る
	git branch -M main
	git push -u origin main
	```

### ローカルリポジトリの変更をリモートリポジトリに反映
1. 手元でファイルをいじって変更を確認。
	```bash
	echo "Hello, Github" > hoge.txt
	git status	# hoge.txtが`Changes not staged for commit:`に表示される。
	```

1. 変更したファイルをインデックスに登録。
	```bash
	git add hoge.txt
	git status	# hoge.txtが`Changes to be committed:`に表示される。
	```

1. 変更をコミット。
	```bash
	git commit -m "modified hoge.txt"
	git status	# `nothing to commit, working tree clean`となる。
	```

1. リモートリポジトリへ`push`。
	```bash
	git push
	```

### リモートリポジトリの変更をローカルリポジトリに反映
- リモートブランチの状態を直接ローカルブランチに反映。
	```bash
	git pull
	```

- リモートブランチの変更を一度ローカルのアップストリームブランチに反映させてからローカルブランチに反映。
	```bash
	git fetch
	git merge
	```

## `.gitignore`
https://docs.github.com/ja/get-started/getting-started-with-git/ignoring-files

- リポジトリのルートディレクトリに`.gitignore`を配置して、git管理から除外するファイルを制御する。
	```bash
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

- `~/.config/git/ignore`でグローバルに除外対象を設定。
	```bash
	.DS_Store
	```

- すでに追跡しているファイルを除外するにはトラッキングを外す。
	```bash
	git rm --cached <FILE_NAME>
	```

## SSH接続
https://docs.github.com/ja/authentication/connecting-to-github-with-ssh/about-ssh

- [SSHキーを生成する。]({{< ref "ssh.md" >}})
- [githubに公開キーを登録する。](https://docs.github.com/ja/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)
- `ssh -T git@github.com`で接続確認。

### `ssh -T`の際に`permission denied`となる場合
https://docs.github.com/ja/authentication/troubleshooting-ssh/using-ssh-over-the-https-port

`ssh-keygen`の際にファイル名を変更していると認証がうまくいかない。`~/.ssh/config`に以下を追記して解決。
```
Host github github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_****
```

## `git submodule`
外部のリポジトリを自分のリポジトリのサブディレクトリとして取り込む仕組み。
```bash
git submodule add https://github.com/<username>/<repository>.git directory
```

### submoduleを最新版に更新する
```bash
git submodule foreach git pull
git add <submodule> && git commit -m "updated submodule"
git push
```

## そのほかのコマンド
- 直前の操作を修正
	```bash
	### 直前のミスコミットを修正
	git commit --amend -m "hogehoge"

	### commitの取り消し
	git reset --soft HEAD^

	### addの取り消し
	git reset --mixed HEAD
	```

- すでにリポジトリに登録されたファイルを削除
	```bash
	git rm --cached *file*
	```

- ファイル名を変更
	```bash
	git mv file file_renamed
	```

- リポジトリ名を変更
	```bash
	### リモート側の操作：
	リポジトリのメインページ > :setting: Setting > Rename から変更

	### 手元の操作：ローカルリポジトリの名前と/.git/configを書き換える
	mv before_repository_name after_repository_name
	sed -i -e 's/bofore_repository_name/after_repository_name/g' local_repository/.git/config
	```

- 誤った`git init`を取り消す
	```bash
	rm -rf .git
	```

