import { Router, Request, Response } from 'express'
import { unlink } from 'fs/promises'
import { join } from 'path'
import { readdir } from 'fs/promises'
import multer from 'multer'
import path from 'path'
import { sanitizeFileName } from '../shared/constants/constants'

const router = Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), 'src/public/uploads'))
  },
  filename: function (req, file, cb) {
    const userEmail = req.query.userEmail as string
    const sanitizedName = file.originalname.replace(/[^a-zA-Z0-9.]/g, '-')
    cb(null, `[${userEmail}]-${sanitizedName}`)
  },
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true)
    } else {
      cb(null, false)
      return cb(new Error('Chỉ chấp nhận file PDF'))
    }
  },
})

router.post('/', upload.single('file'), async (req: Request, res: Response) => {
  try {
    const userEmail = req.query.userEmail as string

    if (!req.file || !userEmail) {
      return res.status(400).json({ error: 'Thiếu file hoặc email người dùng' })
    }

    const sanitizedFile = sanitizeFileName(req.file.originalname)
    const fileName = `[${userEmail}]-${sanitizedFile}`
    const cvUrl = `/uploads/${fileName}`
    return res.status(200).json({ cvUrl })
  } catch (error) {
    console.error('Lỗi khi xử lý upload file:', error)
    return res.status(500).json({ error: 'Lỗi khi upload file' })
  }
})

router.get('/cv-list', async (req: Request, res: Response) => {
  try {
    const userEmail = req.query.email as string

    if (!userEmail) {
      return res.status(400).json({ error: 'Thiếu email người dùng' })
    }

    const uploadDir = join(process.cwd(), 'src/public/uploads')

    const files = await readdir(uploadDir)
    const userCvFiles = files
      .filter((file) => file.startsWith(`[${userEmail}]`))
      .map((file) => `http://localhost:5000/uploads/${file}`)

    return res.status(200).json({ cvFiles: userCvFiles })
  } catch (error) {
    console.error('Lỗi khi lấy danh sách CV:', error)
    return res.status(500).json({ error: 'Lỗi khi lấy danh sách CV' })
  }
})

// Xóa file
router.delete('/', async (req: Request, res: Response) => {
  try {
    const fileUrl = req.query.file as string

    if (!fileUrl) {
      return res.status(400).json({ error: 'Thiếu đường dẫn file' })
    }

    const fileName = fileUrl.split('/').pop()

    const uploadDir = join(process.cwd(), 'src/public/uploads')
    const filePath = join(uploadDir, fileName as string)
    await unlink(filePath)

    return res.status(200).json({ message: 'Xóa file thành công' })
  } catch (error) {
    console.error('Lỗi khi xóa file:', error)
    return res.status(500).json({ error: 'Lỗi khi xóa file' })
  }
})

export default router
