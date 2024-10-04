import { GoogleGenerativeAI } from '@google/generative-ai'
import pdf from 'pdf-parse'
import fs from 'fs/promises'

const genAI = new GoogleGenerativeAI(process.env.API_KEY || '')

async function pdfToText(fileCV: string): Promise<string> {
  try {
    const dataBuffer = await fs.readFile(fileCV)
    const data = await pdf(dataBuffer)
    return data.text
  } catch (error) {
    console.error(`Lỗi khi đọc PDF ${fileCV}: ${(error as Error).message}`)
    throw error
  }
}

const formatResult = (fileCV: string, jd: string) => {
  const cvText = pdfToText(jd)
  const jobDetail = 'jobDetail'
  return `
  
  - Dựa vào thông tin CV mà tôi cung cấp và những yêu cầu của job detail để đưa ra đánh giá với 3 mức độ:
  - Đây là kết quả mà tôi muốn bạn trả về:
    + Ưu tiên (CV xuất sắc, đáp ứng hoặc vượt quá hầu hết các yêu cầu)
    + Tiềm năng (CV tốt, đáp ứng một số yêu cầu quan trọng)
    + Ít tiềm năng (CV chưa đáp ứng đủ các yêu cầu cần thiết)
  ->  Trả lời ngắn gọn, chỉ cần trả về một trong ba mức đánh giá trên.

  - Thông tin CV:
  {
    ${cvText}
  }

  - Thông tin Job Detail:
  {
    ${jobDetail}
  }

  `
}

async function run() {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

  const result = await model.generateContent(prompt)
  const response = await result.response
  const text = response.text()
  console.log(text)
}
