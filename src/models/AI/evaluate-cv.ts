import { GoogleGenerativeAI } from '@google/generative-ai'
import pdf from 'pdf-parse'
import fs from 'fs/promises'
import path from 'path'

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

async function formatResult(fileCV: string, jd: string): Promise<string> {
  const cvText = await pdfToText(fileCV)
  const jobDetail = jd
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

export async function run() {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
  const cvFiles = [path.join(__dirname, 'cv1.pdf')]

  const prompt = await formatResult(
    cvFiles[0],
    `Mô tả công việc Chịu trách nhiệm phát triển các sản phẩm Web sử dụng ngôn ngữ/công nghệ: React/JavaScript, WebSocket, WebRTC,... Xây dựng bộ JavaScript SDK voice/video call dựa trên WebRTC. Chuyển đổi thiết kế thành các các giao diện UI/UX thân thiện với người dùng. Đảm bảo trải nghiệm người dùng tốt và tương tác mượt mà trên nhiều thiết bị và trình duyệt khác nhau. Yêu cầu ứng viên Ít nhất 1 năm kinh nghiệm làm việc với ReactJS trong môi trường phát triển web. Thành thạo JavaScript, jQuery, Bootstrap, Typescript, ES6, CSS3, HTML5, ESLint. Nắm vững lập trình hướng đối tượng với JavaScript. Có kinh nghiệm phát triển và tích hợp RESTful API,. Có kinh nghiệm triển khai giao diện web responsive, đảm bảo trải nghiệm người dùng mượt mà trên nhiều loại thiết bị và kích thước màn hình`
  )

  const result = await model.generateContent(prompt)
  const response = await result.response
  const text = await response.text()
  console.log(text)
}
