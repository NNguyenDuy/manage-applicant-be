export const sanitizeFileName = (fileName: string): string => {
  return fileName.replace(/[\\/:*?"<>|[\]]/g, '')
}
