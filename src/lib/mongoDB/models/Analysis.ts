import mongoose, { Schema } from 'mongoose'

export interface AnalysisDataType {
  userId: string
  jobProposals: string[]
  commonPoints: string[]
  skillScores: skillScoresType[]
}

interface skillScoresType {
  skillName: string
  score: number
}

const SKillScoreSchema = new Schema<skillScoresType>({
  skillName: { type: String },
  score: { type: Number },
})

const AnalysisSchma = new Schema<AnalysisDataType>({
  userId: { type: String, require: true },
  jobProposals: { type: [String] },
  commonPoints: { type: [String] },
  skillScores: { type: [SKillScoreSchema] },
})

export const AnalysisModel = mongoose.models.Analysis || mongoose.model('Analysis', AnalysisSchma)
