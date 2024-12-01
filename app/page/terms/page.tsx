import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | SazeAI',
  description: 'Terms of Service for SazeAI',
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">Terms of Service</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Last Modified: 23-04-2024</p>
        <div className="prose dark:prose-invert">
          <h2>Acceptance of Terms</h2>
          <p>By accessing or using our AI project, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please refrain from using the AI project.</p>

          <h2>Use of AI Project</h2>
          <p>You may use the AI project for lawful purposes and in compliance with all applicable laws and regulations. Any unauthorized or illegal use of the AI project is strictly prohibited.</p>

            <h2>AI Face Swap Tool Terms</h2>
          <p>
            The AI Face Swap Tool provided by SazeAI is intended solely for creative and entertainment purposes. By using this tool, you agree to comply with the following terms:
          </p>
          <h3>1. Responsible Use</h3>
          <p>
            Users must not create or share content that is defamatory, harmful, obscene, or otherwise violates any applicable laws. The tool must not be used to:
          </p>
          <ul>
            <li>Impersonate or deceive individuals without their explicit consent.</li>
            <li>Create content that infringes on copyrights, trademarks, or other intellectual property rights.</li>
            <li>Violate privacy rights or harm any person’s reputation.</li>
          </ul>
          <h3>2. User Liability</h3>
          <p>
            Users are solely responsible for all content created and shared using the AI Face Swap Tool. SazeAI disclaims any liability for misuse of the tool, including but not limited to legal, ethical, or privacy violations arising from user-generated content.
          </p>
          <h3>3. Content Moderation</h3>
          <p>
            SazeAI reserves the right to monitor, suspend, or terminate user access to the AI Face Swap Tool for violations of these terms or any unauthorized use.
          </p>
          
          <h2>Agreement</h2>
          <p>Welcome to SazeAI (the "Company," "we," "us," or "our"). These Terms of Service ("Terms," "Terms of Service") govern your use of our web pages and services operated by SazeAI.</p>
          <p>These Terms, along with our Privacy Policy (collectively, "Agreements"), explain your rights and responsibilities when using our Service. By using our Service, you acknowledge that you have read, understood, and agree to be bound by the Agreements.</p>
          <p>If you disagree with (or cannot comply with) the Agreements, you may not use the Service. Please contact us at support@sazeai.com if you have any questions.</p>

          <h2>Communications</h2>
          <p>By creating an account, you agree to receive newsletters, marketing materials, and other information from us. You can unsubscribe at any time by following the unsubscribe link or emailing support@sazeai.com.</p>

          <h2>Purchases</h2>
          <p>If you purchase a product or service (a "Purchase"), you may be asked to provide information such as your credit card number, expiration date, billing address, and shipping information (if applicable). You represent that you have the legal right to use the payment method for any Purchase and that the information you provide is true, correct, and complete.</p>
          <p>We use third-party services to facilitate payment processing. By submitting your information, you grant us the right to provide it to these third parties subject to our Privacy Policy. We reserve the right to refuse or cancel your order for reasons including product availability, errors in pricing, errors in your order, or fraud or unauthorized transactions. We may also modify usage limits to ensure fair service for all users.</p>

          <h2>Subscriptions</h2>
          <p>Some parts of the Service are billed on a subscription basis ("Subscription"). You will be billed in advance on a recurring basis ("Billing Cycle"). Billing cycles are set monthly or annually depending on your plan. Your Subscription will automatically renew at the end of the Billing Cycle unless you or SazeAI cancels it. You can cancel your Subscription through your online account management page or by contacting customer support. A valid payment method is required for your Subscription. You authorize SazeAI to charge all Subscription fees to your payment method. We may issue an electronic invoice if automatic billing fails. You must make the full payment within a certain deadline.</p>

          <h2>Free Trial</h2>
          <p>We may offer a free trial for a limited period. You may be required to enter your billing information to sign up, but you will not be charged until the free trial expires. On the last day, unless you cancel, you will be automatically charged the applicable Subscription fee. We reserve the right to modify or cancel the free trial offer at any time without notice.</p>

          <h2>Fee Changes</h2>
          <p>SazeAI may modify Subscription fees at its sole discretion. Any fee change will take effect at the end of the then-current Billing Cycle. Your continued use of the Service after the fee change comes into effect constitutes your agreement to pay the modified Subscription fee amount.</p>

          <h2>Refunds</h2>
          <p>We offer refunds according to our refund policy. Please refer to the policy (<Link href="https://sazeai.com/page/refund-policy" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">https://sazeai.com/page/refund-policy</Link>) for details.</p>

          <h2>Fair Usage Policy (FUP)</h2>
          <p>We expect all users to avoid misusing or overusing our services. Excessive usage by one user may impact the quality of service for others. Select a plan that aligns with your needs. High-usage users should consider upgrading, requesting a custom plan, or using our business API (if applicable). Our system monitors for automated or robotic behavior to maintain service quality and safety. Sharing login details for unlimited accounts for monetary gain is illegal. Each seat is intended for one user only. Unusually high usage or sharing login details could lead to account suspension or deletion without prior notice and without refunds.</p>

          <h2>Prohibited Uses</h2>
          <p>You may only use the Service for lawful purposes and in accordance with the Terms. You agree not to use the Service:</p>
          <ul>
            <li>To violate any law or regulation.</li>
            <li>To exploit, harm, or attempt to exploit or harm minors.</li>
            <li>To send spam.</li>
          </ul>

          <h2>Content and Intellectual Property</h2>
          <p>You retain ownership of any content you create using the Service ("Your Content"). By using the Service, you grant SazeAI a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, publish, and distribute Your Content in connection with the Service. SazeAI and its licensors own all intellectual property rights in the Service, including its content and features. You agree not to remove, alter, or obscure any copyright notices or other proprietary rights notices contained in the Service.</p>

          <h2>Disclaimers and Limitation of Liability</h2>
          <p>The Service is provided "as is" and "as available" without warranties of any kind, express or implied. SazeAI does not warrant that the Service will be uninterrupted, error-free, or virus-free. SazeAI will not be liable for any damages arising out of your use of the Service, including but not limited to direct, indirect, incidental, consequential, or punitive damages.</p>

          <h2>Termination</h2>
          <p>We may terminate or suspend your account and bar access to the Service for any reason, at any time, without prior notice. You may terminate your account by discontinuing your use of the Service.</p>

          <h2>Governing Law</h2>
          <p>These Terms shall be governed and construed in accordance with the laws of Uttar Pradesh, India, without regard to its conflict of law provisions.</p>

          <h2>Changes to Service and Terms</h2>
          <p>We reserve the right to withdraw or amend our Service, and any service or material we provide via the Service, in our sole discretion without notice. We may also amend the Terms at any time by posting the amended terms on this site. Your continued use of the Service following the posting of revised Terms means that you accept and agree to the changes.</p>

          <h2>Contact Us</h2>
          <p>Please send your feedback, comments, and requests for technical support:</p>
          <p>By email: <a href="mailto:support@sazeai.com" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">support@sazeai.com</a></p>
        </div>
      </div>
    </div>
  )
}
