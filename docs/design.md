# 設計思想 / 開発ルール

## 1. 設計思想
- **APIファースト開発**: フロントエンド（Svelte）とバックエンド（Go）の開発を並行して進めるため、OpenAPI仕様などでAPIコントラクトを先に定義し、モックサーバーを活用する。
- **疎結合かつ型安全な構成**: フロントエンドはTypeScript、バックエンドはGoの静的型付けを活かし、API連携部分（`types/`）やDBアクセス（`sqlc`）でも型安全を徹底する。
- **段階的スケーラビリティ**: オンプレミスのリソース制約を考慮し、まずは単一障害点（SPOF）を排除する冗長化（フェーズ1）を最優先とし、将来的なSNS連携やマルチサイト構成（フェーズ2/3）を見据えた拡張性を設計に組み込む。
- **設定より規約（Convention over Configuration）**: ディレクトリ構成やAPIエンドポイントの命名規則を統一し、チーム開発や将来のメンテナンスを容易にする。

## 2. 基本情報
- **サービス名**: Comina Link
- **サービス概要**: リンク共有サービス
- **機能**: Litlinkのようなリンク共有に加えて簡易的な投稿が可能。また、ページのデザインのカスタムが可能。将来的には開発予定のSNS Cominaとの連携機能を作りたい。
- **言語**:
    - フロントエンド: Svelte (SvelteKit)
    - バックエンド: **Go (1.21+)**
    - データベース: **PostgreSQL (15+)**
- **サーバ**: オンプレミス (Proxmox VE ベース)

## 3. ディレクトリ構成 (フロントエンド/SvelteKit)
```
src/
├── lib/                      # アプリケーションの中核 (エイリアス $lib で参照)
│   ├── components/           # 再利用可能なコンポーネント
│   │   ├── ui/               # ボタン、カードなどの純粋なUI部品 (ドメイン知識を持たない)
│   │   └── domain/           # リンクカード、投稿フォームなど、特定のドメインに依存するコンポーネント
│   ├── stores/               # グローバルな状態管理 (Svelte stores)
│   ├── utils/                # 日付フォーマット、バリデーションなどの汎用関数
│   ├── types/                # TypeScriptの型定義 (APIレスポンスの型など)
│   └── server/               # サーバーサイドでのみ動作するコード (DBアクセスなど)
├── routes/                   # ページとAPIルート (ディレクトリ構造 = URL)
│   ├── +layout.svelte        # 全体レイアウト
│   ├── +page.svelte          # トップページ (/)
|   ├── app/                  # ユーザ公開内容管理ルート
|   |   ├── design/           # ユーザ公開スタイル設定
|   |   ├── home/             # ユーザ公開内容管理トップ(各設定ページのリンク等を配置)
|   |   ├── links/            # ユーザ公開のリンク設定
|   |   ├── media/            # ユーザがアップロードしたコンテンツ(画像/動画)の管理
|   |   ├── posts/            # 投稿管理
|   |   ├── settings/         # ユーザアカウント情報の編集やログアウトなど
|   |   ├── +layout.svelte    # 管理ページ用共通部品
|   |   └── +page.server.ts   # ユーザ公開内容管理ルートから内容管理ホームへのリダイレクト用
│   ├── [username]/           # ユーザーの公開ページ (動的ルーティング)
│   │   └── +page.svelte      # /{username}
│   ├── auth/                 # 認証関連ページ
|   │   ├── login/
|   │   │   └── +page.svelte  # ログインページ (/auth/login)
|   │   └── register/
│   |       └── +page.svelte  # 登録ページ (/auth/register)
│   ├── site/                 # サイト情報等のまとめページ
|   │   └─── systeminfo/
|   │       └── +page.svelte  # システム情報
│   └── api/                  # APIエンドポイント (バックエンドとして機能)
│       └── v1/               # APIバージョニング
│           ├── auth/
│           │   ├── login/
│           │   │   └── +server.ts  # POST /api/v1/auth/login
│           │   └── register/
│           │       └── +server.ts  # POST /api/v1/auth/register
│           ├── users/
│           │   └── [userId]/
│           │       ├── links/
│           │       │   └── +server.ts  # GET, POST /api/v1/users/{userId}/links
│           │       └── posts/
│           │           └── +server.ts  # GET, POST /api/v1/users/{userId}/posts
│           └── pages/
│               └── [userId]/
│                   └── +server.ts      # GET, PUT /api/v1/pages/{userId}
└── app.html                  # HTMLテンプレート
```

## 4. API設計ルール
#### ・基本原則
*   **RESTfulを基本に**、リソース指向の設計を採用。
*   **APIのバージョニング**。(例: `/api/v1/links/`)
*   エラーレスポンスは**統一フォーマット**で返し、フロントエンドでのハンドリングを容易に。

#### ・主要エンドポイント案
`/api/v1/` をベースパスとする。

| リソース | メソッド | エンドポイント | 説明 | 将来の拡張イメージ |
| :--- | :--- | :--- | :--- | :--- |
| **認証** | POST | `/auth/register` | ユーザー登録 | |
| | POST | `/auth/login` | ログイン（JWTなど） | |
| | POST | `/auth/logout` | ログアウト | |
| **リンク** | GET | `/users/{userId}/links` | ユーザーのリンク一覧取得 | |
| | POST | `/users/{userId}/links` | 新規リンク作成 | |
| | PUT | `/links/{linkId}` | リンク更新 | |
| | DELETE | `/links/{linkId}` | リンク削除 | |
| **投稿** | GET | `/users/{userId}/posts` | ユーザーの投稿一覧取得 | |
| | POST | `/users/{userId}/posts` | 新規投稿作成 | |
| | PUT | `/posts/{postId}` | 投稿更新 | |
| | DELETE | `/posts/{postId}` | 投稿削除 | |
| **ページ** | GET | `/pages/{userId}` | ユーザーの公開ページ情報取得 | 将来的にSNS連携で表示内容が動的に変わる可能性を考慮 |
| | PUT | `/pages/{userId}` | ページデザイン設定の更新 | |

#### ・レスポンスフォーマット例
成功時もエラー時も、以下のような構造で統一する。

**成功時 (200 OK)**
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "title": "Misskey",
    "url": "https://example.com"
  }
}
```

**エラー時 (400 Bad Request)**
```json
{
  "status": "error",
  "message": "URLの形式が正しくありません",
  "code": "INVALID_URL"
}
```

## 5. サーバ構成 / インフラ戦略
- **ベースインフラ**: atserverをメイン拠点とし、3つのProxmoxノード上に仮想マシン（VM）またはLXCコンテナで各サービスをデプロイする。
- **バックエンド (Go) の技術スタック詳細**:
    - **DBドライバ**: [`pgx`](https://github.com/jackc/pgx)（高パフォーマンスかつPostgreSQLの機能を最大限活用）
    - **クエリビルダ/コード生成**: [`sqlc`](https://sqlc.dev/)（SQLから型安全なGoコードを生成し、ORM依存を排除）
    - **マイグレーションツール**: [`golang-migrate/migrate`](https://github.com/golang-migrate/migrate)（スキーマバージョン管理）
- **冗長化・高可用性 (HA) ロードマップ**:

    **フェーズ1 (即時〜短期): 単一障害点(SPOF)の排除**
    - **Goアプリケーション**: 2台以上のVMで同一アプリを起動し、前段に **HAProxy** + **keepalived (VIP)** を配置し、アクティブ/スタンバイまたはラウンドロビンのロードバランスを実現。
    - **PostgreSQL**: ストリーミングレプリケーションを設定し、プライマリ(書込)とスタンバイ(読込)を構成。接続管理に **PgBouncer** を導入し、アプリ側のDB接続先を抽象化する。

    **フェーズ2 (中期): 自動フェイルオーバーの導入**
    - **PostgreSQL HAクラスタ化**: **Patroni** + **etcd** (またはZooKeeper) を導入し、プライマリ障害時にスタンバイを自動昇格させる自己修復型クラスタを構築する。
    - **ロードバランサーのヘルスチェック**: HAProxyでバックエンドGoアプリの死活監視を導入し、障害VMを自動的に切り離す。

    **フェーズ3 (将来ビジョン): マルチサイト構成 (atserverダウン時)**
    - **VPN構築**: atserverと友人宅サーバ間を **WireGuard** で常時接続のセキュアなトンネルで結ぶ。
    - **データ非同期レプリケーション**: 友人宅サーバにもPostgreSQLスタンバイを設置し、atserverのプライマリから非同期レプリケーションを設定（レイテンシ許容のため）。
    - **DNSフェイルオーバー**: atserver完全ダウン時は、手動またはDDNSスクリプトでDNSレコードを友人宅サーバのIPに切り替え、サービス継続を図る（復旧後の逆同期フローも別途設計）。

- **運用ポリシー**: 開発初期はフェーズ1を目標にインフラを構築し、Goの学習と並行して段階的にフェーズ2/3へ移行する。すべての構成はIaC（Infrastructure as Code, 例: Ansible）で管理し、再現性を担保する。

---

# Conventional Commits用定義

## 基本ルール

コミットメッセージは以下のフォーマットに従う。

```bash
<type>(<scope>): <subject>
```

- **`type`** : 変更の種類（`feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore` 等）
- **`scope`** : **本定義書の「コミット識別用記号」** を指定（必須）
- **`subject`** : 変更内容の要約（日本語 / 英語 可）

#### 例

```bash
feat(sihome): ヘッダーデザインを変更
fix(applinks): URLバリデーションがエンコード済みURLで失敗する不具合を修正
docs(authin): パスワードリセットフローのREADMEを更新
chore(appd): 不要なCSSファイルを削除
```

---

## スコープ識別子一覧

### サイト全体 / 一般公開エリア (`site/`)

| 正式名称 | 対象パス | コミット識別用記号 (Scope) | 補足 |
| :--- | :--- | :--- | :--- |
| サービス紹介（トップ） | `site/` | `sihome` | ランディングページ全体 |
| ユーザ探索 | `site/explore` | `siexp` | 検索・一覧画面 |
| サービスヘルプ | `site/help` | `sihelp` | FAQ・ガイドページ |
| お問い合わせ | `site/contact` | `sicontact` | フォーム・問い合わせ完了画面 |

---

### 管理ページ / ダッシュボード (`app/`)

| 正式名称 | 対象パス | コミット識別用記号 (Scope) | 補足 |
| :--- | :--- | :--- | :--- |
| ダッシュボードトップ | `app/` | `apphome` | ログイン後のトップ画面 |
| リンク設定 | `app/links` | `applinks` | プロフィールリンクのCRUD |
| 投稿管理 | `app/posts` | `appposts` | 記事・コンテンツの管理 |
| デザイン設定 | `app/design` | `appd` | テーマ・カスタマイズ（`design` の略） |
| メディアライブラリ | `app/media` | `appmed` | 画像・動画のアップロード/管理 |

---

### ユーザー公開ページ (`/[username]`)

| 正式名称 | 対象パス | コミット識別用記号 (Scope) | 補足 |
| :--- | :--- | :--- | :--- |
| ユーザー公開プロフィール | `/[username]` | `usrpub` | 動的ルーティング配下の全ページ |

---

### 認証系 (`auth/`)

| 正式名称 | 対象パス | コミット識別用記号 (Scope) | 補足 |
| :--- | :--- | :--- | :--- |
| ようこそ（認証前トップ） | `auth/` | `authwel` | サインアップ/イン誘導画面 |
| ログイン | `auth/login` | `authin` | サインインページ・処理 |
| 新規登録 | `auth/register` | `authreg` | アカウント作成ページ・処理 |
| ログアウト | `auth/logout` | `authout` | ログアウト処理・リダイレクト |

---

### Type

| Type | 意味 | 使用シーン |
| :--- | :--- | :--- |
| `feat` | 新機能 | 新しいページ・コンポーネント・API追加 |
| `fix` | バグ修正 | 動作不良の修正 |
| `docs` | ドキュメントのみ | READMEやコメントの修正（機能変更なし） |
| `style` | スタイル調整 | CSS/デザインの微調整（ロジック変更なし） |
| `refactor` | リファクタリング | 動作維持したままコード構造を改善 |
| `perf` | パフォーマンス改善 | 読み込み速度・レンダリング最適化 |
| `test` | テスト追加・修正 | 単体テスト / E2Eテストの変更 |
| `chore` | 雑務・ビルド | 依存関係更新・設定ファイル変更・不要ファイル削除 |

---

### その他

- **Scopeは必ず小文字で指定**（例：`apphome` / `authin` / `usrpub`）。
- 複数モジュールにまたがる変更（例：`site/` と `auth/` 両方に影響）の場合は、Scopeを **`*`（ワイルドカード）** または **`global`** とし、Subjectで詳細を説明。
   ```bash
   fix(*): 共通ヘッダーのレイアウト崩れを修正
   ```