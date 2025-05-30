import { useState, useEffect } from "react"

export function useTypewriter(texts: string[], typingSpeed = 500, deletingSpeed = 50) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const text = texts[currentTextIndex]

    if (isDeleting) {
      if (currentText === "") {
        setIsDeleting(false)
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length)
      } else {
        const timeoutId = setTimeout(() => {
          setCurrentText((prevText) => prevText.slice(0, -1))
        }, deletingSpeed)
        return () => clearTimeout(timeoutId)
      }
    } else {
      if (currentText === text) {
        const timeoutId = setTimeout(() => {
          setIsDeleting(true)
        }, 3000)
        return () => clearTimeout(timeoutId)
      } else {
        const timeoutId = setTimeout(() => {
          setCurrentText((prevText) => text.slice(0, prevText.length + 1))
        }, typingSpeed)
        return () => clearTimeout(timeoutId)
      }
    }
  }, [currentTextIndex, currentText, isDeleting, texts, typingSpeed, deletingSpeed])

  return currentText
}

