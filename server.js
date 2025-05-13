// server.js

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import OpenAI from 'openai'

dotenv.config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const app = express()
app.use(cors())
app.use(express.json())

app.post('/api/prompt', async (req, res) => {
  const { character, location, prompt } = req.body

  const fullPrompt = prompt || `Lag en fantasigåte for karakteren ${character} ved stedet ${location}. Ikke avslør svaret.`

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-4o', // eller gpt-3.5-turbo hvis du vil spare tokenkostnader
      messages: [
        { role: 'system', content: 'Du er en fantasirik eventyrmester i et klassisk rollespill.' },
        { role: 'user', content: fullPrompt }
      ]
    })

    const responseText = chatCompletion.choices[0].message.content.trim()
    res.json({ text: responseText })

  } catch (err) {
    console.error('Feil fra OpenAI:', err)
    res.status(500).json({ error: err.message })
  }
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`✅ Backend-server kjører på http://localhost:${PORT}`)
})
