import { NextResponse } from 'next/server'
import * as SibApiV3Sdk from '@sendinblue/client'

const apiInstance = new SibApiV3Sdk.ContactsApi()
apiInstance.setApiKey(SibApiV3Sdk.ContactsApiApiKeys.apiKey, process.env.BREVO_API_KEY as string)

export async function POST(request: Request) {
  try {
    const { email, toolName } = await request.json()

    const createContact = new SibApiV3Sdk.CreateContact()
    createContact.email = email
    createContact.attributes = {
      TOOL_NAME: toolName,
      SUBSCRIPTION_DATE: new Date().toISOString()
    }
    createContact.listIds = [9] // Replace with your actual list ID

    const data = await apiInstance.createContact(createContact)

    return NextResponse.json({ success: true, data })
  } catch (error: unknown) {
    console.error('Error subscribing user:', error)
    if (error instanceof Error && 'body' in error && 'code' in error) {
      return NextResponse.json(
        { error: (error as any).body?.message || 'Failed to subscribe' },
        { status: (error as any).code }
      )
    }
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
