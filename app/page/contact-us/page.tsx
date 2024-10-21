import type { Metadata } from 'next'
import { Mail } from "lucide-react"

export const metadata: Metadata = {
    title: 'Contact Us | SazeAI',
    description: 'If you have any queries, concerns or suggestions, please contact us',
  }


  export default function ContactUs() {
   return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">Get in Touch</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          If you have any queries, concerns or suggestions, please contact us.
        </p>

        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact Details</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We are live 24/7 and are ready to help you get to your query.
          </p>
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <Mail className="mr-2" />
            <a href="mailto:support@sazeai.com" className="hover:text-blue-600 dark:hover:text-blue-400">
              support@sazeai.com
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}