---
title: "Gollum"
subtitle: "Wikiをたてたときの奮闘記"
date: 2023-05-26T12:22:42+09:00
---

Linuxサーバーにgollumでwikiを立てたときの奮闘記。

- https://github.com/gollum/gollum
- https://heavywatal.github.io/misc/gollum.html


## 開発
### 開発環境
MacOS Ventura 13.3.1
```zsh
brew --version	# Homebrew 4.0.19
which -a ruby	# /usr/bin/ruby
ruby --version	# ruby 2.6.10p210
```

### Gollumのインストール
1. homebrewでrbenvをインストール
    ```zsh
    brew install rbenv
    ```

2. 最新版(安定版？)のrubyを探してインストール
    ```zsh
    rbenv install -l
    rbenv install 3.2.2
    rbenv global 3.2.2
    rbenv init
    eval "$(rbenv init - zsh)"  # ~/.zsh_localにも記載
    ```
3. Wiki用のリポジトリを作って空コミット
    ```zsh
    mkdir mywiki && cd mywiki
    git init
    git commit --allow-empty -m ":coffee: Create Wiki"
    ```

3. `Gemfile` を作成して以下を記載し、コミット
    ```rb
    source 'https://rubygems.org'
    gem 'commonmarker'
    gem 'gollum'
    ```
    ```zsh
    git add Gemfile
    git commit -m ":sparkles: Create Gemfile"
    ```

    ここでFork版のgollumを使うように設定できるらしいが、ひとまずそのまま使ってみる。

4. `bundle` で `Gemfile` を読んでパッケージを依存関係ごとインストール
    ```zsh
    bundle install  # --localしようとしたがcommonmarkerが入らなかった
    ```

5. サーバーを起動して `localhost:4567` で起動確認
    ```zsh
    bundle exec gollum
    ```


## 設定
### 基本
大体の設定を記述するファイルは `config.rb`。まず以下のように記載して、`-c` で読み込んで起動。

```rb
require 'gollum/app'

wiki_options = {
  page_file_dir: 'source',
  css: true,
  mathjax: false,
  emoji: true
}
Precious::App.set(:wiki_options, wiki_options)
```
```zsh
bundle exec gollum -c config.rb
```


- 試しに `localhost:4567` で閲覧して、新しいページを作ってみる。
    ```md
    ## Hello Freesia!
    This is the home of mywiki on `freesia`.
    ```

- 一度終了してもう一度起動すると、ちゃんとさっき作ったページが表示されている。
- このファイルはどこにある？working directoryには見えていないけど `git` が追跡しているっぽい。
- 手元に `main` ブランチと別に `master` ブランチが生成されていてそこにファイルがある。


### BASIC認証によるパスワード設定
`config.rb` に以下の設定を追記。
```rb
module Precious
  class App < Sinatra::Base
    use Rack::Auth::Basic, 'Private Wiki' do |username, password|
      users = File.open(File.expand_path('users.json', __dir__)) do |file|
        JSON.parse(file.read, symbolize_names: true)
      end
      name = username.to_sym
      digested = Digest::SHA256.hexdigest(password)
      if users.key?(name) && digested == users[name][:password]
        Precious::App.set(:author, users[name])
      end
    end

    before do
      session['gollum.author'] = settings.author
    end
  end
end
```

ユーザー情報を `users.json` に分離して `config.rb` と同じところに置いておく。

```json
{
  "user1": {
    "name": "First User",
    "email": "user1@example.com",
    "password": "0b14d501a594442a01c6859541bcb3e8164d183d32937b851835442f69d5c94e"
    }
}
```

`echo -n "your_password" | sha256sum` したものを"password"に渡す。(c.f. `brew install coreutils`)

ログインウィンドウでは、ユーザー名に"user1"、パスワードに"your_password"を指定する。


## 本番環境へのデプロイ (トラブルシューティングしながら)
### 本番環境
Ubuntu 22.04.2 LTS

```bash
sudo apt update
sudo apt install autoconf bison build-essential libssl-dev libyaml-dev libreadline-dev zlib1g-dev libncurses5-dev libffi-dev libgdbm6 libgdbm-dev coreutils
```
```bash
brew install rbenv
rbenv install -l
rbenv install 3.2.2
```

で、rubyインストールをしようと思ったけど、ちゃんと入れた `libssl-dev` で怒られてrubyが入らない。

```bash
rbenv install 3.2.2
# To follow progress, use 'tail -f /tmp/ruby-build.20230528012904.22847.log' or pass --verbose
# Downloading ruby-3.2.2.tar.gz...
# -> https://cache.ruby-lang.org/pub/ruby/3.2/ruby-3.2.2.tar.gz
# Installing ruby-3.2.2...
# ruby-build: using readline from homebrew
# ruby-build: using libyaml from homebrew
#
# BUILD FAILED (Ubuntu 22.04 using ruby-build 20230512)
#
# Inspect or clean up the working tree at /tmp/ruby-build.20230528012904.22847.wqiJdk
# Results logged to /tmp/ruby-build.20230528012904.22847.log
#
# Last 10 log lines:
# ERROR: Ruby install aborted due to missing extensions
# Try running `apt-get install -y libssl-dev` to fetch missing dependencies.
#
# Configure options used:
#   --prefix=/home/ymat2/.rbenv/versions/3.2.2
#   --enable-shared
#   --with-readline-dir=/home/linuxbrew/.linuxbrew/opt/readline
#   --with-libyaml-dir=/home/linuxbrew/.linuxbrew/opt/libyaml
#   LDFLAGS=-L/home/ymat2/.rbenv/versions/3.2.2/lib
#   CPPFLAGS=-I/home/ymat2/.rbenv/versions/3.2.2/include
```

仕方ないのでhomebrewで入れることに。(後述するが非推奨のやりかた。あとで `rbenv` で入れなおした。)

```bash
brew info ruby
brew install ruby
```

### リポジトリのクローンとテスト

```bash
git clone mywiki && cd mywiki
bundle install
```

`rugged` のインストールでこける。この[記事](https://qiita.com/___fff_/items/1eff2bc722ba8b55d3b0)を参考に、

```bash
brew reinstall gcc
brew install cmake
```

再度 `bundle install` で依存関係ごとgollumを入れる。

```bash
bundle exec gollum -c config.rb
```


### systemd で自動的に開始
```bash
sudo nano /etc/systemd/system/gollum.service
```
```
[Unit]
Description=Gollum wiki server
After=network.target

[Service]
Type=simple
User=MYNAME
WorkingDirectory=/path/to/your/labwiki
ExecStart=/home/linuxbrew/.linuxbrew/lib/ruby/gems/3.2.0/bin/bundle exec gollum -c config.rb -b /wiki --allow-uploads dir
Restart=on-abort
StandardOutput=file:/var/log/gollum.log
StandardError=file:/var/log/gollum.log

[Install]
WantedBy=multi-user.target
```
```bash
sudo systemctl start gollum.service
sudo systemctl enable gollum.service
```

homebrewで入れたrubyを使ったせいか、`bundle` はフルパスを指定しないと動かない。

http://freesia.net:4567 でアクセス。


### ポート番号なしでアクセス
`:4567` で動いているのを `:80/wiki` に転送する。

1. Apacheの設定ファイル `/etc/apache2/sites-available/gollum-wiki.conf` をつくる。

    ```
    ProxyRequests Off
    <Proxy *>
      Order deny,allow
      Allow from all
    </Proxy>
    <Location /wiki>
      ProxyPass http://localhost:4567/wiki
      ProxyPassReverse http://localhost:4567/wiki
    </Location>
    ```

2. つくった設定ファイルを有効化してApacheを再起動する。

    ```bash
    sudo a2ensite gollum-wiki.conf
    sudo systemctl restart apache2
    ```

3. apache2が再起動しない。Proxyが機能していない？

    ```bash
    sudo systemctl restart apache2
    # Job for apache2.service failed because the control process exited with error code.
    # See "systemctl status apache2.service" and "journalctl -xeu apache2.service" for details.

    systemctl status apache2.service
    # × apache2.service - The Apache HTTP Server
    #     Loaded: loaded (/lib/systemd/system/apache2.service; enabled; vendor preset: enabled)
    #     Active: failed (Result: exit-code) since Mon 2023-05-29 05:39:49 EDT; 8s ago
    #       Docs: https://httpd.apache.org/docs/2.4/
    #     Process: 1821 ExecStart=/usr/sbin/apachectl start (code=exited, status=1/FAILURE)
    #         CPU: 14ms

    # May 29 05:39:49 Freesia systemd[1]: Starting The Apache HTTP Server...
    # May 29 05:39:49 Freesia systemd[1]: apache2.service: Control process exited, code=exited, status=1/FAILURE
    # May 29 05:39:49 Freesia systemd[1]: apache2.service: Failed with result 'exit-code'.
    # May 29 05:39:49 Freesia systemd[1]: Failed to start The Apache HTTP Server.
    # May 29 05:39:49 Freesia apachectl[1824]: AH00526: Syntax error on line 1 of /etc/apache2/sites-enabled/gollum-wiki.conf:
    # May 29 05:39:49 Freesia apachectl[1824]: Invalid command 'ProxyRequests', perhaps misspelled or defined by a module not included in the server configuration
    # May 29 05:39:49 Freesia apachectl[1821]: Action 'start' failed.
    # May 29 05:39:49 Freesia apachectl[1821]: The Apache error log may have more information.
    ```

4. `sudo a2enmod proxy` して再度 `sudo systemctl restart apache2`

5. Internal Server Error

    http://freesia.net/wiki にアクセスするとサーバー内部のエラーとのことで、エラーログを見てみる。

    ```bash
    less /var/log/apache2/error.log
    ```
    ```
    [Mon May 29 05:43:03.180681 2023] [proxy:warn] [pid 1886:tid 140102133675584] [client 10.33.25.141:62101] AH01144: No protocol handler was valid for the URL /wiki (scheme 'http'). If you are using a DSO version of mod_proxy, make sure the proxy submodules are included in the configuration using LoadModule.
    ```

6. `sudo a2enmod proxy_http` して再度 `sudo systemctl restart apache2`

7. http://freesia.net/wiki でアクセスできることを確認


### `rbenv` を何とか使う
homebrewでrubyを入れると、bundleをフルパス指定しなければいけないうえに、アップデートの度にバージョンが変わって使いづらい。

最新版のrubyが入らないのはおそらく `openssl` の問題のよう。homebrewで入れたopensslには `1.1.1` と `3.1.0` があって、rbenvが参照しているのは前者っぽい。

`rbenv` でインストールするrubyのバージョンを落としてみる:

```bash
rbenv install 3.0.6
```

入った。念のためhomebrewのrubyは消してバージョンを反映:

```bash
brew uninstall ruby
rbenv global 3.0.6
eval "$(rbenv init - zsh)"  # .bash_localへ
```

`rbenv` 版のrubyを使ってwiki再設定

```bash
cd /path/to/wiki
bundle install
```

いったんgollum-wikiを停止:

```bash
sudo systemctl stop gollum.service
```

設定ファイル `/etc/systemd/system/gollum.service` を書き換える。
  - `bundle` だけでは同じく認識してくれなかった。
  - rbenvで入れたbundleへのフルパスを書いて解決。バージョン番号が入っていない点で及第点とするか。

```
[Unit]
Description=Gollum wiki server
After=network.target

[Service]
Type=simple
User=ymat2
WorkingDirectory=/home/ymat2/Desktop/project/mywiki
ExecStart=/home/ymat2/.rbenv/shims/bundle exec gollum -c config.rb -b /wiki --allow-uploads dir
Restart=on-abort
StandardOutput=file:/var/log/gollum.log
StandardError=file:/var/log/gollum.log

[Install]
WantedBy=multi-user.target
```

gollum-wikiを再起動:

```bash
sudo systemctl daemon-reload
sudo systemctl start gollum.service
```


### branchを `main` で動くように調整しようとした
- https://zenn.dev/noid11/articles/9112566f0737a2c9f7b7
- https://github.com/gollum/gollum/issues/1813

gollumはデフォルトではmasterブランチで動くようになっている。
なのでmainブランチで動かしつつファイルをアップロードしたりするとわざわざmasterブランチが作られる。
これをmainで動くように設定を変更する。

```rb
require 'gollum/app'

wiki_options = {
  page_file_dir: 'source',
  ref: main,
  css: true,
  mathjax: false,
  emoji: true
}
Precious::App.set(:wiki_options, wiki_options)
```

動かん:
```bash
sudo systemctl status gollum.service
# × gollum.service - Gollum wiki server
#      Loaded: loaded (/etc/systemd/system/gollum.service; enabled; vendor preset: enabled)
#      Active: failed (Result: exit-code) since Wed 2023-05-31 02:34:19 EDT; 313ms ago
#     Process: 28556 ExecStart=/home/ymat2/.rbenv/shims/bundle exec gollum -c config.rb -b /wiki --allow-uploads dir (code=exited, status=1/FAILURE)
#    Main PID: 28556 (code=exited, status=1/FAILURE)
#         CPU: 1.628s
#
# May 31 02:34:18 Freesia systemd[1]: Started Gollum wiki server.
# May 31 02:34:19 Freesia systemd[1]: gollum.service: Main process exited, code=exited, status=1/FAILURE
# May 31 02:34:19 Freesia systemd[1]: gollum.service: Failed with result 'exit-code'.
# May 31 02:34:19 Freesia systemd[1]: gollum.service: Consumed 1.628s CPU time.
```

コマンドラインオプションで渡してみる:
```
[Unit]
Description=Gollum wiki server
After=network.target

[Service]
Type=simple
User=MYNAME
WorkingDirectory=/path/to/your/labwiki
ExecStart=/home/linuxbrew/.linuxbrew/lib/ruby/gems/3.2.0/bin/bundle exec gollum -c config.rb -b /wiki --allow-uploads dir --ref main ./
Restart=on-abort
StandardOutput=file:/var/log/gollum.log
StandardError=file:/var/log/gollum.log

[Install]
WantedBy=multi-user.target
```

効かん:
```bash
sudo systemctl status gollum.service
# ● gollum.service - Gollum wiki server
#      Loaded: loaded (/etc/systemd/system/gollum.service; enabled; vendor preset: enabled)
#      Active: active (running) since Wed 2023-05-31 02:35:01 EDT; 19s ago
#    Main PID: 28590 (ruby)
#       Tasks: 1 (limit: 4284)
#      Memory: 79.5M
#         CPU: 1.640s
#      CGroup: /system.slice/gollum.service
#              └─28590 ruby -x /home/ymat2/.rbenv/versions/3.0.6/bin/gollum -c config.rb -b /wiki --allow-uploads dir
#
# May 31 02:35:01 Freesia systemd[1]: Started Gollum wiki server.
# May 31 02:35:14 Freesia systemd[1]: gollum.service: Current command vanished from the unit file, execution of the command list won't be resumed.
```

あきらめてブランチの名前をmasterに変更した。


## Misc.
`rbenv` はrubyのバージョン管理、`bundle` はrubyのパッケージ管理をしてくれる。

`Gemfile` はRubyプロジェクトにおける依存関係を管理するファイル。`bundle` が読む。
