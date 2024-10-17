import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI('AIzaSyAKH79F1pmUix6mPhfxdVXZXZfa1ptuqWc')

async function formatResult(
  cvText: string,
  jobDetail: string
): Promise<string> {
  return `
  - Dựa vào thông tin CV mà tôi cung cấp và những yêu cầu của job detail để đưa ra đánh giá với 4 mức độ:
  - Đây là kết quả mà tôi muốn bạn trả về:
    + priority (CV xuất sắc, đáp ứng hoặc vượt quá hầu hết các yêu cầu)
    + potential (CV tốt, đáp ứng một số yêu cầu quan trọng)
    + suitable (CV có các kĩ năng ổn và có thể học trong quá trình làm việc)
    + not_suitable (CV chưa đáp ứng đủ các yêu cầu cần thiết)
  ->  Trả lời ngắn gọn, chỉ cần trả về một trong bốn mức đánh giá trên.

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

export async function evaluateCV(
  cvText: string,
  description: string
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
  const prompt = await formatResult(cvText, description)
  const result = await model.generateContent(prompt)
  const response = await result.response
  return response.text()
}
