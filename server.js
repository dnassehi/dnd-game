// server.js
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// Sett opp OpenAI-klient
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

// Endepunkt for å hente en gåte/oppgave
app.post('/api/prompt', async (req, res) => {
  const { character, location } = req.body

  // Bygg prompt-en
  const prompt = 
    `Du er karakteren ${character}. ` +
    `Spill en rolle i et fantasy-eventyr og gi spilleren en gåte eller oppgave som de må løse for å komme videre. ` +
    `Oppgaven må være gåteaktig og knyttet til stedet "${location}". Ikke avslør løsningen.`

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4o-mini',   // eller 'gpt-4' om du har tilgang
      messages: [
        { role: 'system', content: 'Du er en eventyrspill-GM som elsker fantasy.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.8,
      max_tokens: 150
    })
    const text = completion.data.choices[0].message.content.trim()
    res.json({ text })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server kjører på port ${PORT}`))