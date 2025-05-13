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

  // Bygg prompt-en
  const prompt = 
    `Du er karakteren ${character}. ` +
    `Spill en rolle i et fantasy-eventyr og gi spilleren en gåte eller oppgave som de må løse for å komme videre. ` +
    `Oppgaven må være gåteaktig og knyttet til stedet "${location}". Ikke avslør løsningen.`

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4o-mini',   // eller 'gpt-4' om du har tilgang
      messages: [
        { role: 'system', content: 'Du er en fantasirik eventyrmester i et klassisk rollespill.' },
        { role: 'user', content: fullPrompt }
      ]
    })

    const responseText = chatCompletion.choices[0].message.content.trim()
    res.json({ text: responseText })

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`✅ Backend-server kjører på http://localhost:${PORT}`)
})
