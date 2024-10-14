// app/api/generateJobAxis/route.ts
import { AnalysisModel } from '@/lib/mongoDB/models/Analysis'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

function parseResponse(text: string) {
  // 1. 5つの職業提案を抽出
  const jobProposalMatch = text.match(/1\.\s\*\*5つの職業提案\*\*\n([\s\S]*?)\n2\./)
  const jobProposals = jobProposalMatch
    ? jobProposalMatch[1].split('\n').map((job) => job.trim().replace(/^-\s*/, ''))
    : []

  // 2. 職業の共通項を抽出
  const commonPointsMatch = text.match(/2\.\s\*\*職業の共通項\*\*\n([\s\S]*?)\n3\./)
  const commonPoints = commonPointsMatch
    ? commonPointsMatch[1].split('\n').map((point) => point.trim().replace(/^-\s*/, ''))
    : []

  // 3. 能力スコアの数値化を抽出
  const skillScoresMatch = text.match(/3\.\s\*\*能力スコア\*\*\n([\s\S]*)/)
  const skillScoresText = skillScoresMatch
    ? skillScoresMatch[1].split('\n').map((score) => score.trim())
    : []

  const skillScores = skillScoresText.map((score) => {
    const [skill, value] = score.split(':').map((s) => s.trim())
    return {
      skillName: skill,
      score: Number(value),
    }
  })

  // オブジェクトとしてまとめて返す
  return {
    jobProposals,
    commonPoints,
    skillScores,
  }
}
// OpenAI APIの設定
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// POSTリクエストハンドラ
export async function POST(req: NextRequest) {
  try {
    // リクエストボディを取得
    const {
      userId,
      mbti,
      skills,
      certifications,
      experience,
      values,
      interests,
      workStyle,
      teamRole,
    } = await req.json()

    if (
      !mbti ||
      !skills ||
      !certifications ||
      !experience ||
      !values ||
      !interests ||
      !workStyle ||
      !teamRole
    ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const prompt = `
    ユーザーのMBTIタイプは${mbti}です。ユーザーのMBTIの性格特性と以下の情報に基づいて、ユーザーに適した職業を提案してください。
  - スキル: ${skills.join(', ')}
  - 保有資格: ${certifications.join(', ')}
  - 他人に自慢できる成功体験: ${experience.join(', ')}
  - 興味のある分野: ${interests.join(', ')}
  - 大事にしている価値観: ${values.join(', ')}
  - 理想の働き方: ${workStyle.join(', ')}
  - グループ活動での役割：${teamRole}

【出力フォーマット】以下のようにフォーマットしてください：

1. **5つの職業提案**（箇条書きで、シンプルな職業名のみ）
   - 例: 
     1. ソフトウェアエンジニア
     2. データサイエンティスト
     3. プロジェクトマネージャー
     4. UXデザイナー
     5. ファイナンシャルアナリスト

2. **職業の共通項**（3〜5個の箇条書き）
   - 例: 
     - チームでの協力が必要
     - 論理的思考と分析能力が求められる
     - クライアントとのコミュニケーションが重要

3. **能力スコア**（専門スキル・リーダーシップ・コミュニケーション能力・問題解決能力・学習能力・チームワークの5つのスキル、各スキルに対する0〜100のスコア、箇条書き
   - 例:
     - 専門スキル: 85
     - リーダーシップ: 75
     - コミュニケーション能力: 90
     - 問題解決能力: 80
     - 学習能力: 85
     - チームワーク: 80

    
  `
    //  OpenAI APIへのリクエスト
    // const response = await openai.chat.completions.create({
    //   model: 'gpt-3.5-turbo',
    //   messages: [
    //     { role: 'system', content: 'あなたはキャリアアドバイザーです。' },
    //     {
    //       role: 'user',
    //       content: prompt,
    //     },
    //   ],
    //   // messages: `あなたの価値観は次の通りです: ${values}\nあなたの目標は次の通りです: ${goals}\nこれに基づいて、就活の軸を具体的に言語化してください。`,
    //   // max_tokens: 150,
    //   max_tokens: 500, // 必要に応じてトークン数を調整
    //   temperature: 0.7,
    // })

    const jobAxis = `jobAxis":"1. **5つの職業提案**\n - 動物看護師\n - 獣医師\n - ペットシッター\n - イベントプランナー（動物関連イベント）\n - 自営業（ペット関連ビジネス）\n\n2. **職業の共通項**\n - 動物との関わりが必要\n - 社会貢献が見込める\n - ワークライフバランスが取れやすい\n - 個人もしくは少人数で働ける場面がある\n\n3. **能力スコア**\n - 専門スキル: 90\n - リーダーシップ: 70\n - コミュニケーション能力: 85\n - 問題解決能力: 80\n - 学習能力: 85\n - チームワークスコア: 75`
    // const jobAxis = response?.choices[0]?.message?.content?.trim()!

    // レスポンスを解析
    const parsedData = parseResponse(jobAxis)

    if (!parsedData) {
      return NextResponse.json({ message: 'データが生成されていません' }, { status: 500 })
    }

    const newAnalysis = new AnalysisModel({
      userId,
      jobProposals: parsedData.jobProposals,
      commonPoints: parsedData.commonPoints,
      skillScores: parsedData.skillScores,
    })

    await newAnalysis.save()

    // 応答のテキストを取得

    // レスポンスを返す
    return NextResponse.json({ parsedData, mbti }, { status: 200 })
  } catch (error) {
    console.error('Error generating job axis:', error)
    return NextResponse.json({ error: 'Error generating job axis' }, { status: 500 })
  }
}
