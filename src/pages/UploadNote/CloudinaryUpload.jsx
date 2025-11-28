import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import {
  Upload,
  Image as ImageIcon,
  FileText,
  AlertCircle,
  CheckCircle2,
  Trash2,
  RotateCcw,
  Info,
} from 'lucide-react'
import { Button } from '@/components/common/Button'

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dfoqasqnw/auto/upload'
const UPLOAD_PRESET = 'my_unsigned_preset'
const CLOUD_NAME = 'dfoqasqnw'
const DEFAULT_FOLDER = 'acadex-notes'
const MAX_FILE_COUNT = 40
const MAX_FILE_SIZE_MB = 50
const TOTAL_SIZE_LIMIT_MB = 800

const createUploadEntry = (file) => ({
  id: `${file.name}-${file.size}-${file.lastModified}-${crypto.randomUUID?.() ?? Date.now()}`,
  file,
  relativePath: file.webkitRelativePath || '',
  status: 'pending', // pending | uploading | success | error
  progress: 0,
  error: '',
  result: null,
})

const formatBytes = (bytesValue) => {
  if (!bytesValue) return 'Unknown size'
  const mb = bytesValue / (1024 * 1024)
  if (mb >= 1) return `${mb.toFixed(2)} MB`
  return `${(bytesValue / 1024).toFixed(1)} KB`
}

const bytesToMB = (bytesValue) => bytesValue / (1024 * 1024)

const getFileSignature = (file) => `${file.name}-${file.size}-${file.lastModified}`

export default function CloudinaryUpload({ onUploadComplete, onQueueChange }) {
  const [uploads, setUploads] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [globalError, setGlobalError] = useState('')
  const [selectionNotice, setSelectionNotice] = useState(null)

  const queueBytes = useMemo(
    () => uploads.reduce((sum, item) => sum + (item.file?.size || 0), 0),
    [uploads]
  )

  const uploadStats = useMemo(
    () => ({
      total: uploads.length,
      pending: uploads.filter((item) => item.status === 'pending').length,
      uploading: uploads.filter((item) => item.status === 'uploading').length,
      success: uploads.filter((item) => item.status === 'success').length,
      error: uploads.filter((item) => item.status === 'error').length,
      bytes: queueBytes,
    }),
    [uploads, queueBytes]
  )

  useEffect(() => {
    onQueueChange?.(uploads)
    const successes = uploads
      .filter((item) => item.status === 'success' && item.result)
      .map((item) => item.result)
    onUploadComplete?.(successes)
  }, [uploads, onQueueChange, onUploadComplete])

  const addFilesToQueue = (files, label) => {
    if (!files.length) return

    const currentSignatures = new Set(uploads.map((item) => getFileSignature(item.file)))
    let currentCount = uploads.length
    let currentBytes = uploads.reduce((sum, item) => sum + (item.file?.size || 0), 0)

    const accepted = []
    const warnings = []

    for (const file of files) {
      const signature = getFileSignature(file)
      if (currentSignatures.has(signature)) {
        warnings.push(`"${file.name}" skipped (already in queue).`)
        continue
      }
      if (currentCount >= MAX_FILE_COUNT) {
        warnings.push(`Maximum of ${MAX_FILE_COUNT} files per batch reached.`)
        break
      }
      if (bytesToMB(file.size) > MAX_FILE_SIZE_MB) {
        warnings.push(`"${file.name}" exceeds the ${MAX_FILE_SIZE_MB}MB limit.`)
        continue
      }
      if (bytesToMB(currentBytes + file.size) > TOTAL_SIZE_LIMIT_MB) {
        warnings.push(`Total upload size limit (${TOTAL_SIZE_LIMIT_MB}MB) reached.`)
        break
      }
      accepted.push(createUploadEntry(file))
      currentSignatures.add(signature)
      currentCount += 1
      currentBytes += file.size
    }

    if (accepted.length) {
      setUploads((prev) => [...prev, ...accepted])
      setSelectionNotice({
        type: warnings.length ? 'warning' : 'success',
        text: `${accepted.length} item${accepted.length === 1 ? '' : 's'} added from ${label}. ${
          warnings.length ? warnings.join(' ') : ''
        }`.trim(),
      })
      setGlobalError('')
    } else if (warnings.length) {
      setSelectionNotice({ type: 'error', text: warnings.join(' ') })
    }
  }

  const handleFileChange = (event, sourceLabel = 'files') => {
    const selected = Array.from(event.target.files || [])
    addFilesToQueue(selected, sourceLabel)
    event.target.value = ''
  }

  const handleFolderChange = (event) => {
    const selected = Array.from(event.target.files || [])
    addFilesToQueue(selected, 'folder')
    event.target.value = ''
  }

  const updateUploadEntry = (id, payload) => {
    setUploads((prev) => prev.map((item) => (item.id === id ? { ...item, ...payload } : item)))
  }

  const removeUpload = (id) => {
    setUploads((prev) => prev.filter((item) => item.id !== id))
    setGlobalError('')
  }

  const clearUploads = () => {
    setUploads([])
    setGlobalError('')
    setSelectionNotice(null)
    onUploadComplete?.([])
  }

  const uploadSingleEntry = async (entry) => {
    const folderValue = DEFAULT_FOLDER
    updateUploadEntry(entry.id, { status: 'uploading', progress: 0, error: '' })

    const formData = new FormData()
    formData.append('file', entry.file)
    formData.append('upload_preset', UPLOAD_PRESET)
    formData.append('cloud_name', CLOUD_NAME)
    formData.append('folder', folderValue)

    try {
      const response = await axios.post(CLOUDINARY_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (event) => {
          if (!event.total) return
          const percent = Math.round((event.loaded * 100) / event.total)
          updateUploadEntry(entry.id, { progress: percent })
        },
      })

      const info = {
        secureUrl: response.data.secure_url,
        originalFilename: response.data.original_filename,
        publicId: response.data.public_id,
        resourceType: response.data.resource_type,
        format: response.data.format,
        bytes: response.data.bytes,
        folder: response.data.folder || folderValue || null,
        relativePath: entry.relativePath || null,
      }

      updateUploadEntry(entry.id, { status: 'success', progress: 100, result: info })
      return true
    } catch (err) {
      const message =
        err.response?.data?.error?.message ||
        err.response?.data?.error ||
        err.message ||
        'Upload failed. Please try again.'
      console.error('Cloudinary upload failed:', err.response?.data || err)
      updateUploadEntry(entry.id, { status: 'error', error: message, progress: 0 })
      return false
    }
  }

  const handleUpload = async () => {
    if (!uploads.length) {
      setGlobalError('Please add at least one file or folder.')
      return
    }

    setIsUploading(true)
    setGlobalError('')

    let encounteredError = false
    for (const entry of uploads) {
      if (entry.status === 'success') continue
      const result = await uploadSingleEntry(entry)
      if (!result) encounteredError = true
    }

    setIsUploading(false)
    if (encounteredError) {
      setGlobalError('Some files failed to upload. Use the Retry action next to each failed item.')
    } else {
      setSelectionNotice({ type: 'success', text: 'All files uploaded successfully.' })
    }
  }

  const retryUpload = async (id) => {
    if (isUploading) return
    const entry = uploads.find((item) => item.id === id)
    if (!entry) return

    setGlobalError('')
    setIsUploading(true)
    await uploadSingleEntry(entry)
    setIsUploading(false)
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-dashed border-border p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
              <Upload className="h-7 w-7 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-lg text-foreground">Upload to Cloudinary</p>
              <p className="text-sm text-muted-foreground">
                Select multiple files or entire folders. Images, PDF, DOC, PPT, XLS & more are supported.
              </p>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Choose files or folders</label>
            <div className="flex flex-wrap gap-2">
              <input
                id="upload-files-input"
                type="file"
                accept="image/*,.pdf,.doc,.docx,.ppt,.pptx,.txt,.xls,.xlsx"
                multiple
                onChange={(event) => handleFileChange(event, 'files')}
                className="hidden"
              />
              <input
                id="upload-folder-input"
                type="file"
                multiple
                webkitdirectory="true"
                mozdirectory="true"
                directory=""
                onChange={handleFolderChange}
                className="hidden"
              />
              <label htmlFor="upload-files-input">
                <Button as="span" type="button" variant="outline">
                  Select files
                </Button>
              </label>
              <label htmlFor="upload-folder-input">
                <Button as="span" type="button" variant="ghost">
                  Select folder
                </Button>
              </label>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Folder selection works best in Chromium-based browsers. Other browsers will fallback to multi-file picks.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={handleUpload} disabled={!uploads.length || isUploading} className="min-w-[140px]">
              {isUploading ? 'Uploading...' : 'Upload Files'}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={!uploads.length || isUploading}
              onClick={clearUploads}
            >
              Clear list
            </Button>
            {uploads.length > 0 && (
              <p className="text-sm text-muted-foreground">
                {uploads.length} file{uploads.length === 1 ? '' : 's'} ready to upload
              </p>
            )}
          </div>

          {uploadStats.total > 0 && (
            <div className="rounded-lg border border-primary/10 bg-primary/5 p-3 text-xs text-primary flex flex-wrap items-center gap-3">
              <span className="font-medium">Queue summary:</span>
              <span>{uploadStats.total} total</span>
              <span>{uploadStats.success} done</span>
              <span>{uploadStats.uploading} uploading</span>
              <span>{uploadStats.pending} waiting</span>
              <span>{uploadStats.error} failed</span>
              <span>{formatBytes(uploadStats.bytes)} total</span>
            </div>
          )}

          {selectionNotice && (
            <div
              className={`flex items-center gap-2 rounded-lg border p-3 text-sm ${
                selectionNotice.type === 'success'
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                  : selectionNotice.type === 'warning'
                  ? 'border-amber-200 bg-amber-50 text-amber-700'
                  : 'border-primary/20 bg-primary/5 text-primary'
              }`}
            >
              <Info className="h-4 w-4" />
              <span>{selectionNotice.text}</span>
            </div>
          )}

          {globalError && (
            <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              <span>{globalError}</span>
            </div>
          )}
        </div>
      </div>

      {uploads.length > 0 && (
        <div className="space-y-3 rounded-xl border border-border bg-card/30 p-4">
          <p className="text-sm font-semibold text-foreground">Upload queue</p>
          <div className="space-y-3">
            {uploads.map((item) => {
              const isImage =
                (item.result?.resourceType || item.file.type)?.toString().startsWith('image') ||
                ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(item.result?.format)

              return (
                <div
                  key={item.id}
                  className="rounded-lg border border-border bg-background p-3 space-y-2 text-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="font-medium text-foreground">
                        {item.relativePath || item.file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatBytes(item.file.size)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.status === 'success' && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
                          <CheckCircle2 className="h-3 w-3" />
                          Uploaded
                        </span>
                      )}
                      {item.status === 'uploading' && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                          Uploading…
                        </span>
                      )}
                      {item.status === 'error' && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-1 text-xs font-medium text-destructive">
                          Failed
                        </span>
                      )}
                      {item.status !== 'uploading' && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => removeUpload(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  {item.status === 'uploading' && (
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  )}

                  {item.status === 'error' && (
                    <div className="flex flex-wrap items-center gap-2 text-xs text-destructive">
                      <p className="flex-1">{item.error}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => retryUpload(item.id)}
                        className="h-7 px-3 text-xs"
                      >
                        <RotateCcw className="h-3 w-3 mr-1" />
                        Retry
                      </Button>
                    </div>
                  )}

                  {item.status === 'success' && item.result && (
                    <div className="flex flex-col gap-2 rounded-lg bg-muted/50 p-3 text-xs">
                      <a
                        href={item.result.secureUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-primary underline"
                      >
                        View uploaded {isImage ? 'image' : 'file'}
                      </a>
                      <p className="text-muted-foreground">
                        Public ID: <span className="font-mono">{item.result.publicId}</span>
                      </p>
                      {item.result.folder && (
                        <p className="text-muted-foreground">Folder: {item.result.folder}</p>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

