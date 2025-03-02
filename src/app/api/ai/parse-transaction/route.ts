import { OpenAI } from 'openai'
import { NextResponse } from 'next/server'
import { categoriesService } from '@/services/categories'
import { format } from 'date-fns'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request) {
  try {
    const { text } = await req.json()
    const currentDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ssXXX")

    const categories = await categoriesService.getCategories()
    const validCategories = categories.map(c => `${c.name} (${c.type})`).join(', ')

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Eres un asistente financiero experto. Analiza el texto del usuario y extrae la información para una transacción.
          
          IMPORTANTE: 
          - Determina si es un ingreso o gasto basado en el contexto
          - Para la categoría, SOLO puedes usar una de las siguientes: ${validCategories}
          - Si no encuentras una categoría que coincida exactamente, usa la más cercana de la lista proporcionada
          - Si no puedes determinar si es ingreso o gasto, asume que es gasto
          - Intenta extraer la mayor cantidad de información posible del texto
          - Para la fecha:
            * Si se menciona una fecha específica, devuélvela en formato ISO (yyyy-MM-ddTHH:mm:ssZ)
            * Si se menciona "ayer", calcula la fecha correspondiente
            * Si se menciona "hoy", usa "${currentDate}"
            * Si no se menciona ninguna fecha, usa "${currentDate}"
          - Si un campo no se puede determinar (excepto la fecha), déjalo como null
          
          Debes devolver un JSON con esta estructura:
          {
            "amount": number (requerido),
            "type": "income" | "expense" (requerido, basado en el contexto),
            "category": string (requerido, DEBE ser una de las categorías listadas),
            "description": string (requerido, descripción clara y concisa),
            "date": string (requerido, en formato ISO con la lógica mencionada),
            "location": string | null (lugar donde ocurrió la transacción),
            "notes": string | null (detalles adicionales o contexto),
            "tags": string[] (al menos 3 palabras clave relacionadas)
          }`
        },
        {
          role: "user",
          content: text
        }
      ],
      response_format: { type: "json_object" }
    })

    const content = completion.choices[0].message.content
    if (!content) throw new Error('No se recibió respuesta del modelo')

    return NextResponse.json(JSON.parse(content))
  } catch (error) {
    console.error('Error al procesar el texto:', error)
    return NextResponse.json(
      { error: 'Error al procesar el texto' },
      { status: 500 }
    )
  }
} 