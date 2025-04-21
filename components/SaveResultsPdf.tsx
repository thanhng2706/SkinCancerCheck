import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Loader2 } from "lucide-react"
import { motion } from "framer-motion"

interface AnalysisResult {
  condition: string
  confidence: number
  timestamp: string
  imageUrl?: string
}

interface SaveResultsPdfProps {
  analysisResult: AnalysisResult
}

export function SaveResultsPdf({ analysisResult }: SaveResultsPdfProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const generatePdf = async () => {
    setIsGenerating(true)
    try {
      const printWindow = window.open("", "_blank")
      if (!printWindow) {
        throw new Error("Failed to open print window")
      }

      const content = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Skin Scan Results</title>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
              
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              
              body { 
                font-family: 'Inter', sans-serif;
                line-height: 1.6;
                color: #1a1a1a;
                padding: 40px;
                max-width: 800px;
                margin: 0 auto;
                background-color: #ffffff;
              }

              .page-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-bottom: 20px;
                border-bottom: 2px solid #e5e7eb;
                margin-bottom: 40px;
              }

              .logo-section {
                text-align: left;
              }

              .logo-section h1 {
                font-size: 24px;
                font-weight: 700;
                color: #0f172a;
                margin: 0;
              }

              .date-section {
                text-align: right;
                color: #64748b;
                font-size: 14px;
              }

              .result-section {
                background: #f8fafc;
                border: 1px solid #e2e8f0;
                border-radius: 12px;
                padding: 30px;
                margin-bottom: 40px;
              }

              .result-section h2 {
                color: #0f172a;
                font-size: 20px;
                font-weight: 600;
                margin-bottom: 20px;
              }

              .result-item {
                margin-bottom: 16px;
              }

              .result-label {
                font-weight: 500;
                color: #64748b;
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                margin-bottom: 4px;
              }

              .result-value {
                font-size: 18px;
                color: #0f172a;
                font-weight: 600;
              }

              .result-value.high-risk {
                color: #dc2626;
              }

              .confidence-bar {
                width: 100%;
                height: 8px;
                background: #e2e8f0;
                border-radius: 4px;
                margin-top: 8px;
                overflow: hidden;
              }

              .confidence-fill {
                height: 100%;
                background: linear-gradient(to right, #0ea5e9, #2563eb);
                width: ${(analysisResult.confidence * 100).toFixed(1)}%;
                border-radius: 4px;
              }

              .disclaimer-section {
                background: #fffbeb;
                border: 1px solid #fcd34d;
                border-radius: 12px;
                padding: 24px;
                margin-bottom: 40px;
              }

              .disclaimer-section h3 {
                color: #92400e;
                font-size: 16px;
                font-weight: 600;
                margin-bottom: 12px;
                display: flex;
                align-items: center;
                gap: 8px;
              }

              .disclaimer-section p {
                color: #92400e;
                font-size: 14px;
                margin-bottom: 8px;
              }

              .footer {
                text-align: center;
                color: #64748b;
                font-size: 12px;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
              }

              .footer img {
                height: 24px;
                margin-bottom: 12px;
              }

              @media print {
                body {
                  padding: 20px;
                }

                .page-break {
                  page-break-before: always;
                }
              }
            </style>
          </head>
          <body>
            <div class="page-header">
              <div class="logo-section">
                <h1>LypoCheck</h1>
                <div style="font-size: 14px; color: #64748b;">Skin Cancer Detection Report</div>
              </div>
              <div class="date-section">
                <div>Report ID: ${Date.now().toString(36).toUpperCase()}</div>
                <div>Generated on ${new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</div>
              </div>
            </div>

            <div class="result-section">
              <h2>Analysis Results</h2>
              
              <div class="result-item">
                <div class="result-label">Condition</div>
                <div class="result-value ${analysisResult.condition.toLowerCase().includes('melanoma') ? 'high-risk' : ''}">${analysisResult.condition}</div>
              </div>

              <div class="result-item">
                <div class="result-label">Confidence Score</div>
                <div class="result-value">${(analysisResult.confidence * 100).toFixed(1)}%</div>
                <div class="confidence-bar">
                  <div class="confidence-fill"></div>
                </div>
              </div>
            </div>

            <div class="disclaimer-section">
              <h3>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9v5m0 0h2m-2 0H9m1-9h.01" stroke="#92400e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Important Medical Disclaimer
              </h3>
              <p>This report is generated by an AI-powered analysis system and is for informational purposes only. It should not be considered as a medical diagnosis or replace professional medical advice.</p>
              <p>Please consult with a qualified healthcare provider or dermatologist for proper diagnosis, advice, and treatment options.</p>
            </div>

            <div class="footer">
              <p>Generated by LypoCheck - Advanced Skin Cancer Detection System</p>
              <p>© ${new Date().getFullYear()} LypoCheck. All rights reserved.</p>
            </div>
          </body>
        </html>
      `

      printWindow.document.write(content)
      printWindow.document.close()
      
      // Wait for content to load before printing
      printWindow.onload = () => {
        printWindow.print()
        printWindow.close()
      }
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Failed to generate PDF. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Button
        onClick={generatePdf}
        disabled={isGenerating}
        className="w-full"
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating PDF...
          </>
        ) : (
          <>
            <Download className="mr-2 h-4 w-4" />
            Save Results as PDF
          </>
        )}
      </Button>
    </motion.div>
  )
} 