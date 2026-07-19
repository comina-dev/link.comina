# 設計思想/開発ルール

## 1.設計思想
- 内容

## 2.基本情報
- サービス名: Comina Link
- サービス概要: リンク共有サービス
- 機能: Litlinkのようなリンク共有に加えて簡易的な投稿が可能。また、ページのデザインのカスタムが- 可能。将来的には開発予定のSNS Cominaとの連携機能を作りたい。
- 言語:
    - フロントエンド: Svelte
    - バックエンド: Go
    - データベース: 未定
- サーバ: オンプレミス

## 3.ディレクトリ構成
```
src/
├── lib/                      # アプリケーションの中核 (エイリアス $lib で参照)
│   ├── components/           # 再利用可能なコンポーネント
│   │   ├── ui/               # ボタン、カードなどの純粋なUI部品 (ドメイン知識を持たない)[reference:5]
│   │   └── domain/           # リンクカード、投稿フォームなど、特定のドメインに依存するコンポーネント[reference:6]
│   ├── stores/               # グローバルな状態管理 (Svelte stores)
│   ├── utils/                # 日付フォーマット、バリデーションなどの汎用関数[reference:7]
│   ├── types/                # TypeScriptの型定義 (APIレスポンスの型など)[reference:8]
│   └── server/               # サーバーサイドでのみ動作するコード (DBアクセスなど)[reference:9]
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
│   ├── auth/                 # 認証関連ページ
│   │   ├── login/
│   │   │   └── +page.svelte  # ログインページ (/auth/login)
│   │   └── register/
│   │       └── +page.svelte  # 登録ページ (/auth/register)
│   ├── [username]/           # ユーザーの公開ページ (動的ルーティング)[reference:10]
│   │   └── +page.svelte      # /{username}
│   └── api/                  # APIエンドポイント (バックエンドとして機能)[reference:11][reference:12]
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
└── app.html                  # HTMLテンプレート[reference:13]
```

## 4.API設計ルール
#### ・基本原則
*   **RESTfulを基本に**、リソース指向の設計を採用。
*   **APIのバージョニング**。(例: `/api/v1/links/`)
*   エラーレスポンスは**統一フォーマット**で返し、フロントエンドでのハンドリングを容易に。

#### ・主要エンドポイント案
`/api/v1/` をベースパスとします。

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
成功時もエラー時も、以下のような構造で統一します。

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
## 5.サーバ構成
- atserverをメイン拠点とし、3つのPROXMOXノード間でフロント・バックエンドともに冗長構成。
- 将来的にvpnを使用しatserverが落ちた場合に友人宅のサーバを使用しサービスのダウンを防ぐ。