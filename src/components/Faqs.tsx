import Image from 'next/image'

import { Container } from '@/components/Container'
import backgroundImage from '@/images/background-faqs.jpg'

const faqs = [
  [
    {
      question:
        'How BlogPal Helps your Marketing teams waste time creating drafts ?',
      answer:
        'We deliver a production-ready content hub: Sanity as the CMS + GPT-powered content generation and automation. Your team generates a blog/landing draft inside Sanity, auto-creates SEO and social assets, reviews in Studio, and publishes with one click.',
    },
    {
      question: 'Can I pay for my subscription via purchase order?',
      answer: 'Absolutely, we are happy to take your money in all forms.',
    },
    {
      question: 'Is my data secure?',
      answer:
        "Yes — we use Sanity's secure dataset and best practices for API tokens. You control publish rights and tokens are never embedded in public code.",
    },
  ],
  [
    {
      question: 'How good is the AI writing?',
      answer:
        'GPT produces strong first drafts. We craft custom prompt templates for tone, keywords, and structure to match your brand.',
    },
    {
      question: 'Can we preview drafts before publishing?',
      answer:
        'Absolutely,  Studio preview shows drafts; we offer a preview mode for protected review flows.',
    },
    {
      question: 'Do you support scheduling?',
      answer:
        'Sanity scheduling is included and triggers site rebuilds when content goes live.',
    },
  ],
  [
    {
      question: 'How long does a build take?',
      answer:
        'Typical launch: 2 to 4 weeks depending on scope (pages, integrations, and custom workflows).',
    },
    {
      question: 'Who pays for OpenAI usage?',
      answer:
        'AI credits are billed monthly — typical small teams are covered by the included monthly plan; overages are billed as add-ons.',
    },
    {
      question: 'I lost my password, how do I get into my account?',
      answer:
        'Send us an email and we will send you a copy of our latest password spreadsheet so you can find your information.',
    },
  ],
]

export function Faqs() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-32"
    >
      <Image
        className="absolute top-0 left-1/2 max-w-none translate-x-[-30%] -translate-y-1/4"
        src={backgroundImage}
        alt=""
        width={1558}
        height={946}
        unoptimized
      />
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faq-title"
            className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl"
          >
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            If you can’t find what you’re looking for, email our support team
            and if you’re lucky someone will get back to you.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-8">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="font-display text-lg/7 text-slate-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
